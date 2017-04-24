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
    Route::get('product/search',    'ProductController@searchProduct');
    Route::get('product/check/stock','ProductController@checkProductStock');
    Route::get('customers/search',  'CustomerController@searchCustomer');
    Route::resource('companies',	'CompanyController');
    Route::resource('customers',	'CustomerController');
    Route::resource('products',		'ProductController');
    Route::resource('users',		'UserController');
    Route::resource('entries',		'EntryController');
});