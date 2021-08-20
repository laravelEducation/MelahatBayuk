<template>
    <div class="container">

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li role="presentation">
                <a href="#waiting" id="waiting-tab" aria-controls="home" data-bs-target="#waiting" role="tab" aria-selected="true" data-toggle="tab">Onay Bekleyen Randevular</a>
            </li>
            <li role="presentation">
                <a href="#home" id="home-tab" aria-controls="home" data-bs-target="#home" role="tab" data-toggle="tab">Günü Gelen Randevular</a>
            </li>
            <li role="presentation">
                <a href="#profile" id="profile-tab" aria-controls="home" data-bs-target="#profile" role="tab" data-toggle="tab">Gelecek Randevular</a>
            </li>
            <li role="presentation">
                <a href="#contact" id="contact-tab" aria-controls="home" data-bs-target="#contact" role="tab" data-toggle="tab">Geçmiş Randevular</a>
            </li>
            <li role="presentation">
                <a href="#cancel" id="cancel-tab" aria-controls="home" data-bs-target="#cancel" role="tab" data-toggle="tab">İptal Edilen Randevularr</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="waiting" role="tabpanel" aria-labelledby="waiting-tab">
                <appointment-item @updateOkey="updateOkey" @updateCancel="updateCancel" :data="waiting.data"></appointment-item>

                <div class="row" style="margin-top:10px; ">
                    <div class="col-md-12">
                        <pagination :data="waiting" @pagination-change-page="getData"></pagination>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                <appointment-item @updateOkey="updateOkey" @updateCancel="updateCancel" :data="today.data"></appointment-item>

                <div class="row" style="margin-top:10px; ">
                    <div class="col-md-12">
                        <pagination :data="today" @pagination-change-page="getData"></pagination>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <appointment-item @updateOkey="updateOkey" @updateCancel="updateCancel" :data="list.data"></appointment-item>

                <div class="row" style="margin-top:10px; ">
                    <div class="col-md-12">
                        <pagination :data="list" @pagination-change-page="getData"></pagination>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <appointment-item @updateOkey="updateOkey" @updateCancel="updateCancel" :data="last.data"></appointment-item>

                <div class="row" style="margin-top:10px; ">
                    <div class="col-md-12">
                        <pagination :data="last" @pagination-change-page="getData"></pagination>
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="cancel" role="tabpanel" aria-labelledby="cancel-tab">
                <appointment-item @updateOkey="updateOkey" @updateCancel="updateCancel" :data="cancel.data"></appointment-item>

                <div class="row" style="margin-top:10px; ">
                    <div class="col-md-12">
                        <pagination :data="cancel" @pagination-change-page="getData"></pagination>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
import  io from 'socket.io-client';
var socket=io('http://localhost:3000');
export default {
    data(){
        return{
            waiting:{
                data:[]
            },
            list:{
                data:[]
            },
            today:{
                data:[]
            },
            last:{
                data:[]
            },
            cancel:{
                data:[]
            },
        }


     },

    created(){
           this.getData();
    },
     methods:{
         updateCancel(id){
             axios.post('http://127.0.0.1:8000/api/admin/process',{
                 type:2,
                 id:id,
             })
                 .then((res)=>{
                     this.getData(); //datayı çağırma işlemi
                 })
         },
         updateOkey(id){//onay veya iptalden sorna sayfayı yenilemeye gerek kalmadan sayfalar arasında geçişi sağlaıyourz
             axios.post('http://127.0.0.1:8000/api/admin/process',{
                 type:1,
                 id:id,
             })
                 .then((res)=>{
                  this.getData(); //datayı çağırma işlemi
                 })
         },
         getData(page){
             if (typeof  page=='undefined'){
                 page=1;
             }
             axios.get('http://127.0.0.1:8000/api/admin/all/?page=${page}').then((res)=>{
                 console.log(res);
                 this.waiting=res.data.waiting; //verileri çekiyoruz
                 this.list=res.data.list;
                 this.today=res.data.today_list;
                 this.last=res.data.last_list;
                 this.cancel=res.data.cancel;
             });
             // Axios, client side uygulamalarda HTTP çağrılarının kolayca yapılmasını sağlayan bir javascript kütüphanesidir.

         }
     }

}
</script>

