<template>
      <div class="container">
          <div class="row">
              <div class="col-md-12">

                  <admin-working-item title="Pazartesi" :data="monday"></admin-working-item>
                  <admin-working-item title="Salı" :data="tuesday"></admin-working-item>
                  <admin-working-item title="Çarşamba" :data="wednesday"></admin-working-item>
                  <admin-working-item title="Perşembe" :data="thursday"></admin-working-item>
                  <admin-working-item title="Cuma" :data="friday"></admin-working-item>
                  <admin-working-item title="Cumartesi" :data="saturday"></admin-working-item>
                  <admin-working-item title="Pazar" :data="sunday"></admin-working-item>


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

         }


}
</script>
