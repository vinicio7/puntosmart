<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('company_id')->unsigned();
            $table->integer('salesman_id')->unsigned();
            $table->text('correlative');
            $table->float('total');
            $table->text('customer_name');
            $table->text('customer_nit');
            $table->text('customer_direction');
            $table->text('salesman_name')->default(null);
            $table->enum('type_payment', ['credit_card', 'cash', 'check', 'down_payment']);
            $table->boolean('invoice');
            $table->text('no_invoice');
            $table->boolean('status')->default("0");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}
