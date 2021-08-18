<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\WorkingHours;
use Illuminate\Http\Request;

class indexController extends Controller
{

    public function process(Request $request){
        $all=$request->except('_token');
        Appointment::where('id',$all['id'])->update(['isActive'=>$all['type']]);
        return response()->json(['status'=>true]);
    }

    public function all(){
        $returnArray=[];
        //Waiting
        $returnArray['waiting']=Appointment::where('isActive',0)->orderBy('workingHour','asc')->paginate(6);
        $returnArray['waiting']->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        //Cancel
        $returnArray['cancel']=Appointment::where('isActive',2)->orderBy('workingHour','asc')->paginate(6);
        $returnArray['cancel']->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        //List
        $returnArray['list']=Appointment::where('isActive',1)->where('date','>',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $returnArray['list']->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        //LastLİst
        $returnArray['last_list']=Appointment::where('isActive',1)->where('date','<',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $returnArray['last_list']->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        //TodayList
        $returnArray['today_list']=Appointment::where('date',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $returnArray['today_list']->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });

        return response()->json($returnArray);
    }

//isActive değrlerine göre randevu durumunu alacak
    public function getWaitingList(){
        $data=Appointment::where('isActive',0)->orderBy('workingHour','asc')->paginate(6);
        $data->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        return response()->json($data);
    }
    public function getCancelList(){
        $data=Appointment::where('isActive',2)->orderBy('workingHour','asc')->paginate(6);
        $data->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        return response()->json($data);
    }

    public function getList(){
        $data=Appointment::where('isActive',1)->where('date','>',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $data->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        return response()->json($data);
    }
    //randevusu onaylanan yani isactive 1 olanları gödter
    public function getLastList(){
        $data=Appointment::where('isActive',1)->where('date','<',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $data->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        return response()->json($data);
    }
    public function getTodayList(){
        $data=Appointment::where('date',date("Y-m-d"))->orderBy('workingHour','asc')->paginate(6);
        $data->getCollection()->transform(function ($value){
            $value['working']=WorkingHours::getString($value['workingHour']);
            return $value;
        });
        return response()->json($data);
    }
}
