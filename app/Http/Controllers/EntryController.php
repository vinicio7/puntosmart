<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Entry;
use App\Product;
use Exception;

class EntryController extends Controller
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
            $entries = Entry::where('company_id', $request->input('company_id'))->with('product')->get();

            foreach ($entries as $item) {
                $item->date_entry = \Carbon\Carbon::parse($item->created_at)->format('d/m/Y');
            }

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Registros consultados correctamente';
            $this->records = $entries;
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
            $entry = Entry::create([
                'company_id' => $request->input('company_id'),
                'user_id' => $request->input('user_id'),
                'product_id' => $request->input('product_id'),
                'quantity' => $request->input('quantity'),
                'price_sale' => $request->input('price_sale')
            ]);

            $product = Product::find( $request->input('product_id'));
            $product->stock = $product->stock + intval($request->input('quantity'));
            $product->price_sale = floatval($request->input('price_sale'));
            $product->save();

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Entrada realizada correctamente';
            $this->records = $entry;
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
}
