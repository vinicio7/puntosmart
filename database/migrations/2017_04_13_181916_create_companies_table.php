<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->text('trade_name');
            $table->text('business_name');
            $table->string('nit', '15')->unique();
            $table->text('direction');
            $table->text('phone');
            $table->text('contact');
            $table->integer('correlative');
            $table->boolean('stock');
            $table->boolean('type_service');
            $table->boolean('format');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
