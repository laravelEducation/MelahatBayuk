<?php

namespace App\Http\Controllers\Yonetim;

use App\Http\Controllers\Controller;
use App\Mail\KullaniciKayitMail;
use App\Models\Kullanici;
use App\Models\KullaniciDetay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Psy\Util\Str;

class KullaniciController extends Controller
{

    public function oturumac(){
        if (request()->isMethod('POST')){
            $this->validate(request(),[
               'email'=>'required|email',
                'sifre'=>'required'
            ]);
            $credentials=[
                'email'=>request()->get('email'),
                'password'=>request()->get('sifre'),
                'yonetici_mi'=>1,
                'aktif_mi'=>1
            ];
           if (Auth::guard('yonetim')->attempt($credentials,request()->has('benihatirla'))){
              return redirect()->route('yonetim.anasayfa');

           }
           else{
               return back()->withInput()->withErrors(['email'=>'Giris HAtalı!']);

           }
        }
        return view('yonetim.oturumac');
    }

    public function oturumukapat(){
        Auth::guard('yonetim')->logout();
        request()->session()->flush();
        request()->session()->regenerate();
        return redirect()->route('yonetim.oturumac');

    }

    public function index(){
        if (request()->filled('aranan'))   //aranan değer doldurulmuşsa filled()
        {
            request()->flash(); //arama butonuna yazının sabit kalması içim flash kullanıyoruz
            $aranan=request('aranan');
            $list=Kullanici::where('adsoyad','like',"%$aranan%")
            ->orWhere('email','like',"%$aranan%")
            ->orderByDesc('created_at')
            ->paginate(8)
            ->appends('aranan',$aranan);

        }
       else{

        $list=Kullanici::OrderByDesc('created_at')->paginate(8);
       }
        return view('yonetim.kullanici.index',compact('list'));
    }
    public  function form($id=0){
        $entry=new Kullanici();

        if($id > 0){
            $entry=Kullanici::find($id);
        }
        return view('yonetim.kullanici.form',compact('entry'));
    }

    public function kaydet($id=0) // id =0 dememizin nedeni eğer id değer yoksa 0 olarak al demek
    {
        $this->validate(request(),[ // formddan gelen elemanları doğrrlamak için validate kullanırz
            'adsoyad'=> 'required',
            'email'=> 'required|email'
        ]);

        $data = request()->only('adsoyad','email');
        if(request()->filled('sifre'))// şifre alanı doldrurlmuşsa güncelllemeye ekleyecek doldurulmmışsa da dahil etmeycek
        {
            $data['sifre'] = Hash::make(request('sifre'));
        }

        $data['aktif_mi']= request()->has('aktif_mi') && request('aktif_mi')==1 ? 1 : 0; // aktifmi kutucuğu bir değere sahip ise komutu
        $data['yonetici_mi']= request()->has('yonetici_mi') && request('yonetici_mi')==1 ? 1 : 0; // aktifmi kutucuğu bir değere sahip ise komutu


        if($id > 0) {
            $entry = Kullanici::where('id', $id)->firstOrFail();
            $entry->update($data);
        }
        else
        {
            $entry = Kullanici::create($data);
        }
        KullaniciDetay::updateOrCreate(
            // cep telefonu adresi vs güncellemke için kullanırız bu kodu
            ['kullanici_id' =>$entry->id],
            [
                'adres' =>request('adres'),
                'telefon'=>request('telefon'),
                'ceptelefonu' => request('ceptelefonu')

            ]);

        return redirect()
            ->route('yonetim.kullanici.duzenle', $entry->id)
            ->with('mesaj',($id>0 ? 'Güncellendi': 'Kaydedildi'))
            ->with('mesaj_tur', 'success');

    }
    public function sil($id){

        Kullanici::destroy($id);
        return redirect()->route('yonetim.kullanici')
            ->with('mesaj','kayıt silindi')
            ->with('mesaj_tur','success');
    }


}
