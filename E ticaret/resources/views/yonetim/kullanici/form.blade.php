@extends('yonetim.layouts.master')
@section('title', 'Kullanıcı Yönetimi')
@section('content')

    <h1 class="page-header">Kullanıcı Yönetimi</h1>


    <form method="post" action="{{route('yonetim.kullanici.kaydet',(is_null($entry->id) ? "0" : $entry->id))}}">
        {{csrf_field()}}



        <div class="pull-right">
            <button type="submit" class="btn btn-primary"> {{@$entry->id > 0 ? "Güncelle" : "Kaydet"}}</button>
        </div>
        <h2 class="sub-header">Kullanıcı {{@$entry->id > 0 ? "Düzenle" : "Ekle"}}</h2>

        @include('layouts.partials.errors')
        @include('layouts.partials.alert')

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="adsoyad">Ad Soyad</label>
                    <input type="text" class="form-control" id="adsoyad" placeholder="Ad Soyad" name="adsoyad" value="{{old('adsoyad',$entry->adsoyad)}}">
                    {{old('adsoyad',$entry->adsoyad)}}
                    {{--                    demek eğer hata alınırsa eski bilgileri göster hata lamadıysan da yeni bilgileri göster--}}
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Email" name="email" value="{{old('email',$entry->email)}}">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="exampleInputPassword1">Şifre</label>
                    <input type="password" class="form-control" id="sifre" placeholder="Şifre"  name="sifre">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="adres">Adress</label>
                    <input type="text" class="form-control" id="adres" placeholder="Adres" name="adres" value="{{old('adres',$entry->adres)}}">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="telefon">Telefon</label>
                    <input type="text" class="form-control" id="telefon" placeholder="Telefon" name="telefon" value="{{old('telefon',$entry->telefon)}}">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="ceptelefonu">Cep Telefonu</label>
                    <input type="text" class="form-control" id="ceptelefonu" placeholder="Cep Telefonu" name="ceptelefonu" value="{{old('ceptelefonu',$entry->ceptelefonu)}}">
                </div>
            </div>
        </div>
        <div class="checkbox">
            <label>
                <input type="hidden" name="aktif_mi" value="0">{{--  eğer aktif mi ksımını doldurmadıysa burda 0 olarak döndrğ demek--}}
                <input type="checkbox" name="aktif_mi" value="1" {{old('aktif_mi',$entry->aktif_mi )? 'checked': ''}}> Aktif mi?
            </label>
        </div>
        <div class="checkbox">
            <label>
                <input type="hidden" name="yonetici_mi" value="0">{{--  eğer yönetici mi ksımını doldurmadıysa burda 0 olarak döndrğ demek--}}
                <input type="checkbox" name="yonetici_mi" value="1" {{old('yonetici_mi',$entry->yonetici_mi ) ? 'checked': ''}}> Yönetici mi?
            </label>
        </div>

    </form>


@endsection
