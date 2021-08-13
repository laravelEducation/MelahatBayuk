<div class="list-group">
    <a href="{{route('yonetim.anasayfa')}}" class="list-group-item">
        <span class="fa fa-fw fa-align-justify"></span> Kontrol Paneli</a>
    <a href="{{route('yonetim.urun')}}" class="list-group-item">
        <span class="fa fa-fw fa-cubes"></span> Ürünler
        <span class="badge badge-dark badge-pill pull-right">14</span>
    </a>
    <a href="{{route('yonetim.kategori')}}" class="list-group-item">
        <span class="fa fa-fw fa-sticky-note"></span> Kategoriler
        <span class="badge badge-dark badge-pill pull-right">14</span>
    </a>
    <a href="#" class="list-group-item">
        <span class="fa fa-fw fa-comment"></span> Ürün yorumları
        <span class="badge badge-dark badge-pill pull-right">14</span>
    </a>
    <a href="#" class="list-group-item collapsed" data-target="#submenu1" data-toggle="collapse" data-parent="#sidebar">
        <span class="fa fa-fw fa-sticky-note"></span>
        Kategori Ürünleri<span class="caret arrow">
        </span>
    </a>

    <div class="list-group collapse" id="submenu1">
        <a href="#" class="list-group-item">Kategori</a>
        <a href="#" class="list-group-item">Kategori</a>
    </div>
    <a href="{{route('yonetim.kullanici')}}" class="list-group-item">
        <span class="fa fa-fw fa-users"></span> Kullanicilar
        <span class="badge badge-dark badge-pill pull-right">14</span>
    </a>
    <a href="{{route('yonetim.siparis')}}" class="list-group-item">
        <span class="fa fa-fw fa-shopping-cart"></span> Siparişler
        <span class="badge badge-dark badge-pill pull-right">14</span>
    </a>
    <a href="#" class="list-group-item collapsed" data-target="#submenu2" data-toggle="collapse" data-parent="#sidebar">
        <span class="fa fa-fw fa-dashboard "></span>
        Raporlar<span class="caret arrow">
        </span>
    </a>
    <div class="list-group collapse" id="submenu2">
        <a href="#" class="list-group-item">Çok Satan Ürünler</a>
        <a href="#" class="list-group-item">Günlere Göre Satışlar</a>
    </div>
    <a href="#" class="list-group-item">
        <span class="fa fa-fw fa-cog"></span>Site Ayarları</a>
</div>
