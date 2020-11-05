<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Company;
use Exception;


class CompanyController extends Controller
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
    public function index()
    {
        try {
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Registros consultados correctamente';
            $this->records = Company::all();
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
            if ($request->file('file') == null) {
                $path = 'S/N';
            } else {
                $url = $request->file('file')->store('logos');
                $path = '/storage/app/'.$url; 
            }
            $company = Company::create([
                'trade_name' => $request->input('trade_name'),
                'business_name' => $request->input('business_name'),
                'nit' => $request->input('nit'),
                'direction' => $request->input('direction'),
                'phone' => $request->input('phone'),
                'contact' => $request->input('contact'),
                'stock' => $request->input('stock'),
                'correlative' => 1,
                'type_service' => $request->input('type_service'),
                'format' => $request->input('format'),
                'fel' => $request->input('fel'),
                'logo' => $path
            ]);
            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Empresa registrada correctamente';
            $this->records = $company;
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

    public function update(Request $request)
    {
        try {
            $customer = Company::find($request->input('id'));
            if ($request->file('file') == null) {
               $path = 'S/N';
            } else {
                $url = $request->file('file')->store('logos');
                $path = '/storage/app/'.$url;
                $customer->logo = $path;
            }
            $customer->trade_name = $request->input('trade_name', $customer->trade_name);
            $customer->business_name = $request->input('business_name', $customer->business_name);
            $customer->nit = $request->input('nit', $customer->nit);
            $customer->direction = $request->input('direction', $customer->direction);
            $customer->phone = $request->input('phone', $customer->phone);
            $customer->contact = $request->input('contact', $customer->contact);
            $customer->stock = $request->input('stock', $customer->stock);
            $customer->type_service = $request->input('type_service', $customer->type_service);
            $customer->format = $request->input('format', $customer->format);
            $customer->fel = $request->input('fel', $customer->fel);
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
        try {
            $company = Company::find($id);
            $company->delete();

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Empresa eliminada correctamente';
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
