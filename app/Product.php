<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $table = 'products';
    protected $fillable = [
        'company_id', 'description', 'internal_code', 'bar_code', 'stock', 'price_sale', 'commission'
    ];
}
