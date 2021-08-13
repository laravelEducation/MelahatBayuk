<?php

namespace App\Http\Controllers\Yonetim;

use App\Http\Controllers\Controller;
use App\Models\Urun;
use App\Models\UrunDetay;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UrunController extends Controller
{
    public function index(){
        if (request()->filled('aranan'))   //aranan değer doldurulmuşsa filled()
        {
            request()->flash(); //arama butonuna yazının sabit kalması içim flash kullanıyoruz
            $aranan=request('aranan');
            $list=Urun::where('urun_adi','like',"%$aranan%")
                ->orWhere('aciklama','like',"%$aranan%")
                ->orderByDesc('id')
                ->paginate(8)
                ->appends('aranan',$aranan);

        }
        else{

            $list=Urun::OrderByDesc('id')->paginate(8);
        }
        return view('yonetim.urun.index',compact('list'));
    }
    public  function form($id=0){
        $entry=new Urun();

        if($id > 0){
            $entry=Urun::find($id);
        }
        return view('yonetim.urun.form',compact('entry'));
    }
    public function kaydet($id=0) // id =0 dememizin nedeni eğer id değer yoksa 0 olarak al demek
    {
        $data = request()->only('urun_adi','slug','aciklama','fiyati');
        if (!request()->filled('slug')){
            $data['slug']=str::slug(request('urun_adi'));
            request()->merge(['slug'=>$data['slug']]); //merge fonksiyonu databasden gelen slug ile birleştir yani iki dizi deki değerlerin eşlemesini yapar
        }
        $this->validate(request(),[ // formddan gelen elemanları doğrrlamak için validate kullanırz
            'urun_adi'=> 'required',
            'fiyati'=>'required',
            'slug'=>(request('original_slug')!=request('slug') ? 'unique:kategori,slug' : '')
        ]);

          $data_detay=request()->only('goster_slider','goster_gunun_firsati','goster_one_cikan','goster_indirimli');
        //dizinin değerlerini request only ile aldık güncelleme ve ekleme işlemii için
          if($id > 0) {
            $entry = Urun::where('id', $id)->firstOrFail();
            $entry->update($data);
            $entry->detay()->update($data_detay);


        }
        else
        {
            $entry = Urun::create($data);
            $entry->detay()->create($data_detay);
        }

        return redirect()
            ->route('yonetim.urun.duzenle', $entry->id)
            ->with('mesaj',($id>0 ? 'Güncellendi': 'Kaydedildi'))
            ->with('mesaj_tur', 'success');

    }

    public function sil($id){
        $urun=Urun::find($id);
        $urun->kategoriler()->detach();//many to many ilişkilerinde detach ile kaldırma işlemi yapıyoruz ürünün kategorilerini temizle
        $urun->detay()->delete();
        $urun->delete();
        return redirect()->route('yonetim.urun')
            ->with('mesaj','kayıt silindi')
            ->with('mesaj_tur','success');
    }
}
