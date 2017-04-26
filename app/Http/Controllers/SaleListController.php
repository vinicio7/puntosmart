<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Sale;
use Exception;

class SaleListController extends Controller
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
            $this->records = Sale::where('company_id', $request->input('company_id'))->with('user', 'detail')->get();
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
