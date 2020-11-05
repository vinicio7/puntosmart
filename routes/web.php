<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return redirect('/dist'); CAAMBIAR TAAMBIEN EL FAVICON Y LAAS CONSTANTES
    return redirect('/src');
});

Route::group(['prefix' => 'ws'], function(){
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
    Route::resource('customers',	    'CustomerController');
    Route::resource('products',		    'ProductController');
    Route::resource('users',		    'UserController');
    Route::resource('entries',		    'EntryController');
    Route::resource('sales/list',	    'SaleListController');
    Route::resource('salesman',	        'SalesmanController');
});