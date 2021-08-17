<template>

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <ul>
       <li class="errors" v-for="i in errors">
           {{ i }}
       </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
         <div class="form-group">
       <input type="text" class="form-control" v-model="name" placeholder="Ad Soyad">
             <!----dosyayı vue bağlamak için v-model kullandık--->
         </div>
        </div>
        <div class="col-md-12">
            <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
            </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" v-mask="'##-###-###-##-##'" v-model="phone" placeholder="Telefon">
                    </div>
                </div>
            </div>
        </div>
        </div>
    <div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <input  class="form-control" @change="selectDate" v-model="date" type="date">
        </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">

            <ul class="select-time-ul">
            <li v-for="item in workingHours " class="select-time">
                <input type="radio" v-model="workingHour" v-bind:value="item.id">
                <!--v-bind bir öğenin sınıf listesini ve onun satır içi stillerini değiştirmektir.---->
         <span>{{item.hours}}</span>
            </li>
            </ul>
        </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
            <textarea v-model="text" id="" class="form-control" cols="30" rows="10"></textarea>
            <!---v-model Form girişi, metin alanı ve seçme öğeleri üzerinde iki yönlü
             veri bağlamaları oluşturmak için yönergeyi kullanıyoruz .-->
        </div>
      </div>
  </div>
    <div class="row">

        <div class="col-md-12">
            <div class="row">

                <div class="col-md-6">
                    <div class="form-group">
                <label for="">Sms</label>
                <input type="radio" v-model="notification_type" value="0">
            </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="">Email</label>
                    <input type="radio" v-model="notification_type" value="1">
                </div>
                </div>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
        <button v-on:click="store" class="btn btn-success"> Randevu Oluştur</button>
    </div>
    </div>
</div>
</template>
<script>
  export default {
      data(){
          return {
              errors:[],
              notification_type:null,
              workingHour:0,
              name:null,
              email:null,
              phone:null,
              text:null,
              date:new Date().toISOString().slice(0,10),
              workingHours:[]

          }

      },
      mounted(){
          axios.get('http://127.0.0.1:8000/api/working-hours')
          .then((res)=>{
              this.workingHours=res.data;
          })
      },
      /*Sayfa açılır açılmaz ajax ile alınan bir veriyi
       componentlere aktarma gibi işlemler yapacaksak
       bu ajax çağrımları “Mounted” hook metodu içerisinde yaparız.*/
      methods:{
          store:function (){
          if(this.notification_type && this.name && this.email && this.validEmail(this.email) && this.phone && this.workingHour!=0){
              //controller tamma ise kaydı oluştur
               axios.post('http://127.0.0.1:8000/api/appointment-store',{
                   fullName:this.name,
                   phone:this.phone,
                   email:this.email,
                   date:this.date,
                   workingHour:this.workingHour,
                   notification_type:this.notification_type,
               }).then((res)=>{
                   console.log(res);
               })
              // Axios, client side uygulamalarda HTTP çağrılarının kolayca yapılmasını sağlayan bir javascript kütüphanesidir.
          }
          this.errors=[];
          if(!this.notification_type){
              this.errors.push('Bildirim Tipi Seçilmelidir');
          }
          if(!this.name){
              this.errors.push('İsim Soyisim Girilmelidir');
          }
          if(!this.email || !this.validEmail(this.email)){
                  this.errors.push('Email Girilmelidir ve formatı doğru olmalıdır');
              }
          if(!this.phone){
                  this.errors.push('Telefon numarası Girilmelidir');
              }
          if(!this.workingHour){
                  this.errors.push('Çalışma Saati Seçilmelidir ');
              }
          },
          selectDate:function (){
              axios.get('http://127.0.0.1:8000/api/working-hours/${this.date}')
                  .then((res)=>{
                      this.workingHours=res.data;
                  })

          },
          validEmail: function (email) {
              var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return re.test(email);
          }
      }
  }

</script>
