<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\WorkingHours;
use http\Env\Response;
use Illuminate\Http\Request;

class indexController extends Controller
{
    public function getWorkingHours($date=''){

     $date=($date=='') ? date("Y-m-d") : $date; //burdan gelen date null eşitse y-m-d yi yaz değilse date yaz
     $returnArray=[];
      $hours=WorkingHours::all();
      foreach ($hours as $k => $v){
        $control=Appointment::where('date',$date)
            ->where('workingHour',$v['id'])->where('isActive',1)->count();
        $v['isActive']=($control==0) ? true : false;
        $returnArray[]=$v;
      }
      return response()->json($returnArray);
    }
    public function appointmentStore(Request $request){
        $returnArray=[];//geri dönüş arrayini belirleyecek
        $returnArray['status']=false; //herhangi bir kayıt işlemi olana kadar false olarak kalsın
        $all=$request->except('_token'); //tüm verileri alıyoruz token harici
        $control=Appointment::where('date',$all['date'])->where('workingHour',$all['workingHour'])->count();
        //seçilen tarih ve seçilen çalışma saatinde randevu var mı onun kontrolü yapılıyor

        if ($control !=0){
            $returnArray['message']="bu randevu tarihi doludur";
            return response()->json($returnArray);
        }
      $create=Appointment::create($all);
        if ($create){ //create işlemi başarılı şekilde oluşursa returnarrayi true yap
            $returnArray['status']=true;
            $returnArray['message']="Randevunuz Başarı İle Alındı";
        }
        else{
       $returnArray['message']="Veri Eklenemedi,Bizimle iletişime Geçiniz";

        }
        return response()->json($returnArray);
    }

    public function getWorkingStore(Request $request){
         $all=$request->except('_token');
         WorkingHours::query()->delete(); //veritabanına verileri göndermeden önce silme işlemi yaıyoruz
         foreach ($all as $k=>$v){ //k key v value
             foreach ($v as $key=>$value){
                 WorkingHours::create([
                     'day'=>$k,
                     'hours'=>$value,
                 ]);
             }
         }

         return response()->json($all);
    }
    public function getWorkingList(){
        $returnArray=[];
        $data=WorkingHours::all();
        foreach ($data as $k=>$v){
              $returnArray[$v['day']][]=$v['hours']; //bu döngüye koymamızın amacı aynı gün içinde birden fazla saat seçmek
        }
        return response()->json($returnArray);
    }
}
