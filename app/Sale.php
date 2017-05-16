<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $table = 'sales';
    protected $fillable = [
        'customer_id', 'user_id', 'salesman_id', 'company_id', 'total', 'type_payment', 'invoice', 'correlative', 'salesman_name'
    ];

    public function user ()
    {
        return $this->belongsTo('App\User');
    }

    public function detail ()
    {
        return $this->hasMany('App\SaleDetail', 'sale_id')->with('product');
    }
}
