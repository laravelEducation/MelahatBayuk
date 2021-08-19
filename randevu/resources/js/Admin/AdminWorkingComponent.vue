<template>
      <div class="container">
          <div class="row">
              <div class="col-md-12">

                  <admin-working-item day="monday" @add="add" title="Pazartesi" :data="monday"></admin-working-item>
                  <admin-working-item day="tuesday" @add="add" title="Salı" :data="tuesday"></admin-working-item>
                  <admin-working-item day="wednesday" @add="add" title="Çarşamba" :data="wednesday"></admin-working-item>
                  <admin-working-item day="thursday" @add="add" title="Perşembe" :data="thursday"></admin-working-item>
                  <admin-working-item day="friday" @add="add" title="Cuma" :data="friday"></admin-working-item>
                  <admin-working-item day="saturday" @add="add" title="Cumartesi" :data="saturday"></admin-working-item>
                  <admin-working-item day="sunday" @add="add" title="Pazar" :data="sunday"></admin-working-item>

                 <button class="btn btn-success" @click="store">Kaydet</button>
              </div>
          </div>
      </div>


</template>

<script>
import AdminWorkingItemComponent from "./AdminWorkingItemComponent";
export default {
    components: {AdminWorkingItemComponent},
    data(){
             return{
                 monday:[],
                 tuesday:[],
                 wednesday:[],
                 thursday:[],
                 friday:[],
                 saturday:[],
                 sunday:[],


             }

         },
    methods:{
        add:function (data){
           this[data.day].push(data.text); //butondaki ekleme işlemi kodları

        },
        store:function (){
         axios.post('http://127.0.0.1:8000/api/working-store',{
             monday:this.monday,
             tuesday:this.tuesday,
             wednesday:this.wednesday,
             thursday:this.thursday,
             friday:this.friday,
             saturday:this.saturday,
             sunday:this.sunday,
         })
            // Axios, client side uygulaalarda HTTP çağrılarının kolayca yapılmasını sağlayan bir javascript kütüphanesidir.
         .then((res)=>{ //dataları gönderme işlemi


         })
        }

    }


}
</script>
