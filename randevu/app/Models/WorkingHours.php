<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkingHours extends Model
{
    //saatleri kontrol etme ve veri çekme
  static function getString($workingHourId){ //saati id olarak çekme işlemi
      $c=WorkingHours::where('id',$workingHourId)->count(); //kontrol yapıyoruz workinghour bvar mı diye kontrol eidoyurz
      if ($c!=0){
    $w=WorkingHours::where('id',$workingHourId)->get(); //eşit değilse datasına erişsin
    return $w[0]['hours'];
      }
      else{
          return ""; //eşitse değeri null döndür
      }
  }
}
