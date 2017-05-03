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
    return redirect('/src');
});

Route::group(['prefix' => 'ws'], function(){
    Route::post('sale/save',            'SaleController@saveSale');
    Route::get('product/search',        'ProductController@searchProduct');
    Route::get('product/check/stock',   'ProductController@checkProductStock');
    Route::post('product/back/stock',   'ProductController@backProductStock');
    Route::post('product/remain/stock', 'ProductController@remainProductStock');
    Route::get('customers/search',      'CustomerController@searchCustomer');
    Route::resource('companies',	    'CompanyController');
    Route::resource('customers',	    'CustomerController');
    Route::resource('products',		    'ProductController');
    Route::resource('users',		    'UserController');
    Route::resource('entries',		    'EntryController');
    Route::resource('sales/list',	    'SaleListController');
});