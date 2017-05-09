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
            $new_sale->correlative = 'Venta-'.$company->correlative;
            $new_sale->save();

            foreach ($data_sale['products'] as $product) {
                $detail = new SaleDetail;
                $detail->sale_id = $new_sale->id;
                $detail->product_id = $product['id'];
                $detail->quantity = $product['quantity'];
                $detail->sale_price = $product['unit_price'];
                $detail->subtotal = $product['subtotal'];
                $detail->save();
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

    public function cancelSale(Request $request)
    {
        try {
            DB::beginTransaction();
            $sale = Sale::find($request->input('id'));
            $sale->status = 1;
            $sale->save();

            $detail = json_decode($request->input('detail'), true);

            foreach ($detail as $item) {
                $product = Product::find($item['product_id']);
                $product->stock = $product->stock + $item['quantity'];
                $product->save();
            }

            DB::commit();
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Venta anulada correctamente';
            $this->records = $sale;
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

    public function cashClose(Request $request)
    {
        try {
            $start_date = date('Y-m-d', strtotime($request->input('start_date')));
            $final_date = date('Y-m-d', strtotime($request->input('final_date')));

            $sales = Sale::where('company_id', $request->input('company_id'))->where('status', 0)->whereBetween('created_at', [$start_date.' 00:00:00', $final_date.' 23:59:59'])->get();

            $cash_1 = 0;
            $credit_card_1 = 0;
            $check_1 = 0;
            $down_payment_1 = 0;
            $total_1 = 0;
            $cash_2 = 0;
            $credit_card_2 = 0;
            $check_2 = 0;
            $down_payment_2 = 0;
            $total_2 = 0;
            $total = 0;

            foreach ($sales as $sale) {
                if ($sale->invoice == 1) {
                    if ($sale->type_payment == 'cash') {
                        $cash_1 = $cash_1 + $sale->total;
                    } else if ($sale->type_payment == 'credit_card') {
                        $credit_card_1 = $credit_card_1 + $sale->total;
                    } else if ($sale->type_payment == 'check') {
                        $check_1 = $check_1 + $sale->total;
                    } else if ($sale->type_payment == 'down_payment') {
                        $down_payment_1 = $down_payment_1 + $sale->total;
                    }

                    $total_1 = $cash_1 + $credit_card_1 + $check_1 + $down_payment_1;
                } else {
                    if ($sale->type_payment == 'cash') {
                        $cash_2 = $cash_2 + $sale->total;
                    } else if ($sale->type_payment == 'credit_card') {
                        $credit_card_2 = $credit_card_2 + $sale->total;
                    } else if ($sale->type_payment == 'check') {
                        $check_2 = $check_2 + $sale->total;
                    } else if ($sale->type_payment == 'down_payment') {
                        $down_payment_2 = $down_payment_2 + $sale->total;
                    }

                    $total_2 = $cash_2 + $credit_card_2 + $check_2 + $down_payment_2;
                }

                $total = $total_1 + $total_2;
            }

            $response = [
                'sales_with_printing' => [
                    'cash' => $cash_1,
                    'credit_card' => $credit_card_1,
                    'check' => $check_1,
                    'down_payment' => $down_payment_1,
                    'total' => $total_1
                ],
                'sales_without_printing' => [
                    'cash' => $cash_2,
                    'credit_card' => $credit_card_2,
                    'check' => $check_2,
                    'down_payment' => $down_payment_2,
                    'total' => $total_2
                ],
                'total' => $total
            ];

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Corte de caja generado correctamente';
            $this->records = $response;
        } catch (Exception $e) {
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

    public function exportCashClose(Request $request)
    {
        try {
            $start_date = date('Y-m-d', strtotime($request->input('start_date')));
            $final_date = date('Y-m-d', strtotime($request->input('final_date')));

            $sales = Sale::where('company_id', $request->input('company_id'))->where('status', 0)->whereBetween('created_at', [$start_date.' 00:00:00', $final_date.' 23:59:59'])->get();

            $cash_1 = 0;
            $credit_card_1 = 0;
            $check_1 = 0;
            $down_payment_1 = 0;
            $total_1 = 0;
            $cash_2 = 0;
            $credit_card_2 = 0;
            $check_2 = 0;
            $down_payment_2 = 0;
            $total_2 = 0;
            $total = 0;

            foreach ($sales as $sale) {
                if ($sale->invoice == 1) {
                    if ($sale->type_payment == 'cash') {
                        $cash_1 = $cash_1 + $sale->total;
                    } else if ($sale->type_payment == 'credit_card') {
                        $credit_card_1 = $credit_card_1 + $sale->total;
                    } else if ($sale->type_payment == 'check') {
                        $check_1 = $check_1 + $sale->total;
                    } else if ($sale->type_payment == 'down_payment') {
                        $down_payment_1 = $down_payment_1 + $sale->total;
                    }

                    $total_1 = $cash_1 + $credit_card_1 + $check_1 + $down_payment_1;
                } else {
                    if ($sale->type_payment == 'cash') {
                        $cash_2 = $cash_2 + $sale->total;
                    } else if ($sale->type_payment == 'credit_card') {
                        $credit_card_2 = $credit_card_2 + $sale->total;
                    } else if ($sale->type_payment == 'check') {
                        $check_2 = $check_2 + $sale->total;
                    } else if ($sale->type_payment == 'down_payment') {
                        $down_payment_2 = $down_payment_2 + $sale->total;
                    }

                    $total_2 = $cash_2 + $credit_card_2 + $check_2 + $down_payment_2;
                }

                $total = $total_1 + $total_2;
            }

            $response = [
                'sales_with_printing' => [
                    'cash' => $cash_1,
                    'credit_card' => $credit_card_1,
                    'check' => $check_1,
                    'down_payment' => $down_payment_1,
                    'total' => $total_1
                ],
                'sales_without_printing' => [
                    'cash' => $cash_2,
                    'credit_card' => $credit_card_2,
                    'check' => $check_2,
                    'down_payment' => $down_payment_2,
                    'total' => $total_2
                ],
                'total' => $total,
                'sales' => $sales
            ];

            \Excel::create('Corte de caja del: '.$start_date.' al '.$final_date, function($excel) use ($response) {

                $excel->sheet('corte', function($sheet) use ($response) {
                    $sheet->loadView('cash-closing', ['data' => $response]);
                });

            })->download('xls');

        } catch (Exception $e) {

        }
    }
}