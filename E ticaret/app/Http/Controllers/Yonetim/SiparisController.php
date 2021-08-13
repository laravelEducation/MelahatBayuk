<?php

namespace App\Http\Controllers\Yonetim;

use App\Http\Controllers\Controller;
use App\Models\Siparis;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SiparisController extends Controller
{
    public function index(){
        if (request()->filled('aranan'))   //aranan değer doldurulmuşsa filled()
        {
            request()->flash(); //arama butonuna yazının sabit kalması içim flash kullanıyoruz
            $aranan=request('aranan');
            $list=Siparis::with('sepet.kullanici')
                ->where('adsoyad','like',"%$aranan%")
                //tek seferde kullanıcıyı çekmek için with kullandık
                ->orWhere('id','like',$aranan)
                ->orderByDesc('id')
                ->paginate(8)
                ->appends('aranan',$aranan);

        }
        else{

            $list=Siparis::with('sepet.kullanici')
                ->OrderByDesc('id')
                ->paginate(8);
        }
        return view('yonetim.siparis.index',compact('list'));
    }
    public  function form($id=0){

        if($id > 0){
            $entry=Siparis::with('sepet.sepet_urunler.urun')->find($id);
            //bir tablodan id ile  sadece belirli bir kaydı çekmek için pluck kullandık
        }

        return view('yonetim.siparis.form',compact('entry'));
    }
    public function kaydet($id=0) // id =0 dememizin nedeni eğer id değer yoksa 0 olarak al demek
    {

        $this->validate(request(),[ // formddan gelen elemanları doğrrlamak için validate kullanırz
            'adsoyad'=> 'required',
            'adres'=>'required',
            'telefon'=>'required',
            'durum'=>'required',
        ]);
        $data = request()->only('adsoyad','adres','telefon','ceptelefonu','durum');

        if($id > 0) {
            $entry = Siparis::where('id', $id)->firstOrFail();
            $entry->update($data);

        }

        return redirect()
            ->route('yonetim.siparis.duzenle', $entry->id)
            ->with('mesaj', 'Güncellendi')
            ->with('mesaj_tur', 'success');

    }

    public function sil($id){
        Siparis::destroy($id);
        return redirect()->route('yonetim.siparis')
            ->with('mesaj','kayıt silindi')
            ->with('mesaj_tur','success');
    }}
