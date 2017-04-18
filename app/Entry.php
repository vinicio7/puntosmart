<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $table = 'entries';
    protected $fillable = [
        'user_id', 'product_id', 'quantity'
    ];
}
