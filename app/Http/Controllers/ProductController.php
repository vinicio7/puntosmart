<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Exception;

class ProductController extends Controller
{
    protected $result = false;
    protected $message = 'Ocurrió un problema al procesar su solicitud';
    protected $records = array();
    protected $status_code = 400;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Registros consultados correctamente';
            $this->records = Product::where('company_id', $request->input('company_id'))->get();
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $product = Product::create([
                'company_id' => $request->input('company_id'),
                'description' => $request->input('description'),
                'internal_code' => $request->input('internal_code'),
                'bar_code' => $request->input('bar_code'),
                'stock' => 0,
                'price_sale' => 0.0
            ]);

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Producto creado correctamente';
            $this->records = $product;
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function searchProduct (Request $request)
    {
        try {
            $product = Product::where('internal_code', $request->input('param'))->orWhere('bar_code', $request->input('param'))->orWhere('description', 'like', '%'.$request->input('param').'%')->where('company_id', $request->input('company_id'))->first();

            if ($product) {
                $this->status_code = 200;
                $this->result = true;
                $this->message = 'Producto consultados correctamente';
                $this->records = $product;
            } else {
                throw new Exception('El producto solicitado no existe');
            }
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

    public function checkProductStock (Request $request)
    {
        try {
            $product = Product::find($request->input('id'));

            if ($product) {
                if ($product->stock >= $request->input('quantity')) {
                    $this->status_code = 200;
                    $this->result = true;
                    $this->message = 'Producto consultados correctamente';
                    $this->records = $product;
                } else {
                    throw new Exception('No cuenta con suficiente existencia en el producto seleccionado, su existencia es de: '.$product->stock);
                }
            } else {
                throw new Exception('El producto solicitado no existe');
            }
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
}
