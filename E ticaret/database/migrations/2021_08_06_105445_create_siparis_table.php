<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiparisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('siparis', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sepet_id')->unsigned();
            $table->decimal('siparis_tutari',10,4);
            $table->string('durum',30)->nullable();
            $table->string('adsoyad',50)->nullable();
            $table->string('adres',200)->nullable();
            $table->string('telefon',15)->nullable();
            $table->string('ceptelefonu',15)->nullable();

            $table->string('banka',20)->nullable();
            $table->integer('taksit_sayisi')->nullable();
            $table->timestamp('silinme_tarihi')->nullable();
            $table->timestamps();

            $table->unique('sepet_id');
            $table->foreign('sepet_id')->references('id')->on('sepet');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('siparis');
    }
}
