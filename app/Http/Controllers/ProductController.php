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
            $validate_internalcode = Product::where('internal_code', $request->input('internal_code'))->where('company_id', $request->input('company_id'))->first();
            if(!$validate_internalcode) {
                $validate_barcode = Product::where('bar_code', $request->input('bar_code'))->where('company_id', $request->input('company_id'))->first();
                if (!$validate_barcode) {
                    $product = Product::create([
                        'company_id' => $request->input('company_id'),
                        'description' => $request->input('description'),
                        'internal_code' => $request->input('internal_code'),
                        'bar_code' => $request->input('bar_code') != null ? $request->input('bar_code') : '',
                        'stock' => $request->input('stock') == 1 ? 0 : 999999,
                        'price_sale' => $request->input('stock') == 0 ? $request->input('price_sale') : 0
                    ]);

                    $this->status_code = 200;
                    $this->result = true;
                    $this->message = 'Producto creado correctamente';
                    $this->records = $product;
                } else {
                    throw new Exception('Existe un producto con el mismo código de barras, por favor verifique');
                }
            } else {
                throw new Exception('Existe un producto con el mismo código interno, por favor verifique');
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
        try {
            $validate_internalcode = Product::where('internal_code', $request->input('internal_code'))->where('company_id', $request->input('company_id'))->where('id', '!=', $id)->first();
            if(!$validate_internalcode) {
                $validate_barcode = Product::where('bar_code', $request->input('bar_code'))->where('company_id', $request->input('company_id'))->where('id', '!=', $id)->first();
                if (!$validate_barcode) {
                    $product = Product::find($id);
                    $product->description = $request->input('description', $product->description);
                    $product->internal_code = $request->input('internal_code', $product->internal_code);
                    $product->bar_code = $request->input('bar_code') != null ? $request->input('bar_code') : '';
                    $product->price_sale = $request->input('price_sale', $product->price_sale);
                    $product->save();

                    $this->status_code = 200;
                    $this->result = true;
                    $this->message = 'Producto actualizado correctamente';
                    $this->records = $product;
                } else {
                    throw new Exception('Existe un producto con el mismo código de barras, por favor verifique');
                }
            } else {
                throw new Exception('Existe un producto con el mismo código interno, por favor verifique');
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            $product->delete();

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Producto eliminado correctamente';
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

    public function searchProduct (Request $request)
    {
        try {
            $product = Product::where('company_id', $request->input('company_id'))->where('internal_code', $request->input('param'))->orWhere('bar_code', $request->input('param'))->orWhere('description', 'like', '%'.$request->input('param').'%')->first();

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

    public function remainProductStock (Request $request)
    {
        try {
            $product = Product::find($request->input('id'));

            if ($product) {
                $product->stock = $product->stock - $request->input('quantity');
                $product->save();

                $this->status_code = 200;
                $this->result = true;
                $this->message = 'Producto consultados correctamente';
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

    public function backProductStock (Request $request)
    {
        try {
            $products = json_decode($request->input('products'), true);
            foreach ($products as $product) {
                $search = Product::find($product['id']);
                $search->stock = $search->stock + $product['quantity'];
                $search->save();
            }

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Existencias devueltas correctamente';
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

    public function exportProducts(Request $request)
    {
        try {
            $products = Product::where('company_id', $request->input('company_id'))->get();

            \Excel::create('Inventario de productos', function($excel) use ($products) {
                $excel->sheet('productos', function($sheet) use ($products) {
                    $sheet->loadView('product-list', ['data' => $products]);
                });
            })->download('xls');

        } catch (Exception $e) {

        }
    }
}
