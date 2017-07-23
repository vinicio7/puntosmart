<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $fillable = [
        'company_id', 'name', 'nit', 'direction', 'phone', 'email', 'contact', 'contact_email'
    ];
}
