<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $table = 'companies';
    protected $fillable = [
        'trade_name', 'business_name', 'nit', 'direction', 'phone', 'contact', 'correlative', 'stock', 'type_service', 'format'
    ];
}
