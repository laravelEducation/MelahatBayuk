<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Urun extends Model
{
    use softDeletes;

    protected $table = 'urun';

    protected $guarded = [];
    const DELETED_AT = 'silinme_tarihi';

    public function kategoriler(){
        return $this->belongsToMany('App\Models\Kategori','kategori_urun');
    }

    public function detay(){
        return $this->hasOne('App\Models\UrunDetay');

    }

}
