<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    protected $table = 'entries';
    protected $fillable = [
        'company_id', 'user_id', 'product_id', 'quantity', 'price_sale'
    ];

    public function product ()
    {
        return $this->belongsTo('App\Product');
    }
}
