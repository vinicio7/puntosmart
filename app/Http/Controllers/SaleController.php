<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use App\Product;
use App\Sale;
use App\SaleDetail;
use Exception;
use DB;

class SaleController extends Controller
{
    protected $result = false;
    protected $message = 'Ocurrió un problema al procesar su solicitud';
    protected $records = array();
    protected $status_code = 400;

    public function saveSale(Request $request)
    {
        try {
            DB::beginTransaction();
            $data_sale = json_decode($request->input('data_sale'), true);
            $company = Company::find($data_sale['company_id']);

            $new_sale = new Sale;
            $new_sale->user_id = $data_sale['user_id'];
            $new_sale->company_id = $data_sale['company_id'];
            $new_sale->total = $data_sale['total'];
            $new_sale->customer_name = $data_sale['customer']['name'];
            $new_sale->customer_nit = $data_sale['customer']['nit'];
            $new_sale->customer_direction = $data_sale['customer']['direction'];
            $new_sale->type_payment = $data_sale['method_payment'];
            $new_sale->invoice = $data_sale['invoice'] == true ? 1 : 0;
            $new_sale->correlative = 'venta-'.$company->correlative;
            $new_sale->save();

            foreach ($data_sale['products'] as $product) {
                $detail = new SaleDetail;
                $detail->sale_id = $new_sale->id;
                $detail->product_id = $product['id'];
                $detail->quantity = $product['quantity'];
                $detail->sale_price = $product['unit_price'];
                $detail->subtotal = $product['subtotal'];
                $detail->save();

                $find_product = Product::find($product['id']);
                $find_product->stock = $find_product->stock - intval($product['quantity']);
                $find_product->save();
            }

            $company->correlative = $company->correlative + 1;
            $company->save();

            DB::commit();
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Venta registrada correctamente';
            $this->records = $new_sale;
        } catch (Exception $e) {
            DB::rollback();
            $this->status_code = 400;
            $this->result = false;
            $this->message = env('APP_DEBUG') ? $e->getMessage() : $this->message;
        } finally {
            $response = [
                'result' => $this->result,
                'message' => $this->message,
                'records' => $this->records,
            ];

            return response()->json($response, $this->status_code);
        }
    }
}
