<?php

namespace App\Http\Controllers\Yonetim;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KategoriController extends Controller
{

    public function index(){
        if (request()->filled('aranan') || request()->filled('ust_id'))   //aranan değer doldurulmuşsa filled()
        {
            request()->flash(); //arama butonuna yazının sabit kalması içim flash kullanıyoruz
            $aranan=request('aranan');
            $ust_id=request('ust_id');

            $list=Kategori::with('ust_kategori')
                ->where('kategori_adi','like',"%$aranan%")
                ->where('ust_id',$ust_id)
                ->orderByDesc('id')
                ->paginate(2)
                ->appends(['aranan',$aranan,'ust_id'=>$ust_id]);
        }
        else{
            request()->flush(); //session içersine gelen input değerlerini sıfırlar
            $list=Kategori::OrderByDesc('id')->with('ust_kategori')->paginate(8);
        }
        $anakategoriler=Kategori::whereRaw('ust_id is null')->get();
        return view('yonetim.kategori.index',compact('list','anakategoriler'));
    }
    public  function form($id=0){

        $entry=new Kategori();

        if($id > 0){

            $entry=Kategori::find($id);
        }
        $kategoriler=Kategori::all();
        return view('yonetim.kategori.form',compact('entry','kategoriler'));
    }

    public function kaydet($id=0) // id =0 dememizin nedeni eğer id değer yoksa 0 olarak al demek
    {
        $data = request()->only('kategori_adi','slug','ust_id');
        if (!request()->filled('slug')){
            $data['slug']=str::slug(request('kategori_adi'));
            request()->merge(['slug'=>$data['slug']]); //merge fonksiyonu databasden gelen slug ile birleştir yani iki dizi deki değerlerin eşlemesini yapar
        }
        $this->validate(request(),[ // formddan gelen elemanları doğrrlamak için validate kullanırz
            'kategori_adi'=> 'required',
            'slug'=>(request('original_slug')!=request('slug') ? 'unique:kategori,slug' : '')
        ]);
        if($id > 0) {
            $entry = Kategori::where('id', $id)->firstOrFail();
            $entry->update($data);
        }
        else
        {
            $entry = Kategori::create($data);
        }

        return redirect()
            ->route('yonetim.kategori.duzenle', $entry->id)
            ->with('mesaj',($id>0 ? 'Güncellendi': 'Kaydedildi'))
            ->with('mesaj_tur', 'success');

    }
    public function sil($id){
        //attach->many to many tablolarına kayıt ekleme /detach->bu tablodan bir kaydın silinmesini sağlıyor
       $kategori=Kategori::find($id);
       $kategori->urunler()->detach();
        $kategori->delete();
        return redirect()->route('yonetim.kategori')
            ->with('mesaj','kayıt silindi')
            ->with('mesaj_tur','success');
    }

}
