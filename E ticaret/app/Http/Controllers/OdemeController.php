<?php

namespace App\Http\Controllers;

use App\Models\Siparis;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Http\Request;

class OdemeController extends Controller
{
    public function index(){
        if(!auth()->check()){
            return redirect()->route('kullanici.oturumac')
                ->with('mesaj_tur','info')
                ->with('mesaj','Ödeme İşlemi için oturum açmanız veya kullanıcı kaydı yapmanız gerekmektedir');

        }
        else if (count(Cart::content())==0){

            return redirect()->route('anasayfa')
                ->with('mesaj_tur','info')
                ->with('mesaj','Ödeme işlemi için sepetinizde bir ürün bulunmalıdır.');

        }
        $kullanici_detay=auth()->user()->detay()->first();

        return view('odeme',compact('kullanici_detay'));
    }
    public function odemeyap(){
      $siparis=request()->all();
      $siparis['sepet_id']=session('aktif_sepet_id');
      $siparis['banka']='Garanti';
      $siparis['taksit_sayisi']=1;
      $siparis['durum']='Siparişiniz Alındı';
      $siparis['siparis_tutari']=Cart::subtotal();

      Siparis::create($siparis);
      Cart::destroy();
      Session()->forget('aktif_sepet_id');
      return redirect()->route('siparisler')
          ->with('mesaj_tur','success')
          ->with('mesaj','Ödemeniz başarılı bir şekilde gerçekleştirildi');

    }

}
