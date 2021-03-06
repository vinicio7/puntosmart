<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Customer;
use App\Salesman;
use App\Sale;
use App\Product;
use App\Company;
use Exception;

class DashboardController extends Controller
{
    protected $result = false;
    protected $message = 'Ocurrió un problema al procesar su solicitud';
    protected $records = array();
    protected $status_code = 400;

    public function dashboardData (Request $request)
    {
        try {
            $today = date('Y-m-d');
            $month = date('Y-m');
            $response = [];

            if ($request->input('user_type') === 'user') {
                $response = [
                    'data_user' => [
                        'total_sales_month' => Sale::where('company_id', $request->input('company_id'))->where('user_id', $request->input('user_id'))->whereBetween('created_at', [$month.'-01 00:00:00', $month.'-31 23:59:59'])->count(),
                        'total_sales_day' => Sale::where('company_id', $request->input('company_id'))->where('user_id', $request->input('user_id'))->whereBetween('created_at', [$today.' 00:00:00', $today.' 23:59:59'])->count()
                    ],
                    'data_admin' => [
                        'total_sales_month' => 0,
                        'total_sales_day' => 0,
                        'total_products' => 0,
                        'total_salesman' => 0
                    ],
                    'data_root' => [
                        'total_companies' => 0,
                        'total_users' => 0,
                        'total_customers' => 0
                    ]
                ];
            } else if ($request->input('user_type') === 'admin') {
                $response = [
                    'data_user' => [
                        'total_sales_month' => 0,
                        'total_sales_day' => 0
                    ],
                    'data_admin' => [
                        'total_sales_month' => Sale::where('company_id', $request->input('company_id'))->whereBetween('created_at', [$month.'-01 00:00:00', $month.'-31 23:59:59'])->count(),
                        'total_sales_day' => Sale::where('company_id', $request->input('company_id'))->whereBetween('created_at', [$today.' 00:00:00', $today.' 23:59:59'])->count(),
                        'total_products' => Product::where('company_id', $request->input('company_id'))->count(),
                        'total_salesman' => Salesman::where('company_id', $request->input('company_id'))->count(),
                    ],
                    'data_root' => [
                        'total_companies' => 0,
                        'total_users' => 0,
                        'total_customers' => 0
                    ]
                ];
            } else {
                $response = [
                    'data_user' => [
                        'total_sales_month' => 0,
                        'total_sales_day' => 0,
                    ],
                    'data_admin' => [
                        'total_sales_month' => 0,
                        'total_sales_day' => 0,
                        'total_products' => 0,
                        'total_salesman' => 0
                    ],
                    'data_root' => [
                        'total_companies' => Company::count(),
                        'total_users' => User::count(),
                        'total_customers' => Customer::count()
                    ]
                ];
            }

            $this->status_code = 200;
            $this->result = true;
            $this->message = 'Registros consultados correctamente';
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
}
