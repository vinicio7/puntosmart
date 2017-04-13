<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 'companies';
    protected $fillable = [
        'trade_name', 'business_name', 'nit', 'direction', 'phone', 'contact', 'type_service', 'format'
    ];
}
