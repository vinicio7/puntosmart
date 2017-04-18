<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalePayment extends Model
{
    protected $table = 'sales_payments';
    protected $fillable = [
        'sale_id', 'amount', 'autorization'
    ];
}
