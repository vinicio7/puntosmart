<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SaleDetail extends Model
{
    protected $table = 'sales_detail';
    protected $fillable = [
        'sale_id', 'product_id', 'quantity', 'sale_price', 'subtotal'
    ];

    public function product ()
    {
        return $this->belongsTo('App\Product');
    }
}
