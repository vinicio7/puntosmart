<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Exception;

class CustomerController extends Controller
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
            $this->records = Customer::where('company_id', $request->input('company_id'))->get();
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
            $customer = Customer::create([
                'company_id' => $request->input('company_id'),
                'name' => $request->input('name'),
                'nit' => strtoupper(str_replace('-', '', $request->input('nit'))),
                'direction' => $request->input('direction'),
                'phone' => $request->input('phone') != null ? $request->input('phone') : '',
                'email' => $request->input('email') != null ? $request->input('email') : '',
                'contact' => $request->input('contact') != null ? $request->input('contact') : '',
                'contact_email' => $request->input('contact_email') != null ? $request->input('contact_email') : ''
            ]);

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Cliente registrado correctamente';
            $this->records = $customer;
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
            $customer = Customer::find($id);
            $customer->name = $request->input('name', $customer->name);
            $customer->nit = strtoupper(str_replace('-', '', $request->input('nit', $customer->nit)));
            $customer->direction = $request->input('direction', $customer->direction);
            $customer->phone =  $request->input('phone') != null ? $request->input('phone') : '';
            $customer->email = $request->input('email') != null ? $request->input('email') : '';
            $customer->contact = $request->input('contact') != null ? $request->input('contact') : '';
            $customer->contact_email = $request->input('contact_email') != null ? $request->input('contact_email') : '';
            $customer->save();

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Cliente editado correctamente';
            $this->records = $customer;
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
        //
    }

    public function searchCustomer (Request $request)
    {
        try {
            if (strtoupper($request->input('nit')) == 'CF') {
                $customer = [
                    'id' => 0,
                    'company_id' => 0,
                    'name' => 'Consumidor Final',
                    'nit' => 'CF',
                    'direction' => 'Ciudad',
                    'phone' => '',
                    'email'=> '',
                ];

                $this->status_code = 200;
                $this->result = true;
                $this->message = 'Cliente consultado correctamente';
                $this->records = $customer;
            } else {
                $nit = strtoupper(str_replace('-', '', $request->input('nit')));
                $customer = Customer::where('nit', $nit)->first();

                if ($customer) {
                    $this->status_code = 200;
                    $this->result = true;
                    $this->message = 'Cliente consultado correctamente';
                    $this->records = $customer;
                } else {
                    throw new Exception('El cliente consultado no existe');
                }
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
