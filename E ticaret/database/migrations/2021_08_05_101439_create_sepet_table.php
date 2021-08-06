<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSepetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sepet', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('kullanici_id')->unsigned();
            $table->timestamp('silinme_tarihi')->nullable();
            $table->timestamps();
            $table->foreign('kullanici_id')->references('id')->on('kullanici');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sepet');
    }
}
