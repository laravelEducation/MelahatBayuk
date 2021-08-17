<template>
    <div class="container">

            <appointment-item :data="items.data"></appointment-item>

            <div class="row" style="margin-top:10px; ">
                <div class="col-md-12">
                    <pagination :data="items" @pagination-change-page="getData"></pagination>
                </div>
            </div>
        </div>


</template>

<script>
export default {
    data(){
        return{
            items:{
                data:[]
            }
        }

    },
    created() {
        //oluşturulur oluşturulmaz  çalışan method
        this.getData();

    },
    mounted() {
        console.log('beni çağırdın...')
        /*Sayfa açılır açılmaz ajax ile alınan bir veriyi
          componentlere aktarma gibi işlemler yapacaksak
          bu ajax çağrımları “Mounted” hook metodu içerisinde yaparız.*/
    },
    methods:{
        getData(page){
            if (typeof  page=='undefined'){
                page=1;
            }
            axios.get('http://127.0.0.1:8000/api/admin/today-list/?page=${page}').then((res)=>{
                this.items=res.data; //verileri çekiyoruz
            });
            // Axios, client side uygulamalarda HTTP çağrılarının kolayca yapılmasını sağlayan bir javascript kütüphanesidir.

        }

    }
}
</script>


