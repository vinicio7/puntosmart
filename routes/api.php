<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',            'UserController@login');
Route::post('mobile/login',            'UserController@login');

Route::group(['prefix' => 'mobile'], function(){
    Route::post('sale/save',            'SaleController@saveSale');
    Route::post('sale/cancel',          'SaleController@cancelSale');
    Route::get('sale/cash/close',       'SaleController@cashClose');
    Route::get('sale/export/cash/close','SaleController@exportCashClose');
    Route::get('sales/for/date',        'SaleController@salesForDate');
    Route::get('sales/export/for/date', 'SaleController@exportSalesForDate');
    Route::get('product/search',        'ProductController@searchProduct');
    Route::get('product/check/stock',   'ProductController@checkProductStock');
    Route::post('product/back/stock',   'ProductController@backProductStock');
    Route::post('product/remain/stock', 'ProductController@remainProductStock');
    Route::get('customers/search',      'CustomerController@searchCustomer');
    Route::get('dashboard/data',        'DashboardController@dashboardData');
    Route::get('products/export/excel', 'ProductController@exportProducts');
    Route::resource('companies',	    'CompanyController');
    Route::post('companies/update',     'CompanyController@update');
    Route::resource('customers',	    'CustomerController');
    Route::resource('products',		    'ProductController');
    Route::resource('users',		    'UserController');
    Route::resource('entries',		    'EntryController');
    Route::resource('sales/list',	    'SaleListController');
    Route::resource('salesman',	        'SalesmanController');
});