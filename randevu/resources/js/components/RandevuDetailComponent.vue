<template>
    <div>
        <div>
            <div class="container">
                <div class="main">
                    <h2>Randevu Takip Sistemi</h2>
                    <h3>Randevu Görmek İçin Bilgileri Doğru Giriniz</h3>

                </div>
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
                            <input type="text" class="form-control" style="margin:5px;" v-model="code" placeholder="Randevu Kodu">
                            <!----dosyayı vue bağlamak için v-model kullandık--->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 text-center" >
                        <button v-on:click="store" class="btn btn-success"> Randevu Ara</button>
                    </div>
                </div>
            </div>
        </div>
        <div  v-if="completeForm">
            <div class="container">
                <div class="main" style="margin-top: 15px">

                <div class="row">
                <div class="col-md-12">
                    Tarih:{{info.date}}
                </div>
                <div class="col-md-12">
                    Saat:{{info.hour}}
                </div>
                <div class="row">
                    <div class="col-md-12" v-for="item in note">
                        <span>{{item.text}}</span>

                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    data(){
        return{
            errors:[],
            code:null,
            completeForm:false,
           info:[],
            note:[]
        }
    },
    methods:{
        store:function (){
            if (this.code!=null){
                axios.post(`http://127.0.0.1:8000/api/appointment-detail`,{
                    errors:[],
                    code:this.code
                })
                    .then((res)=>{
                       if (res.data.status){
                           this.code='',
                           this.info=res.data.info;
                          this.note=res.data.note;
                          this.completeForm=true;
                       }
                       else{
                           this.errors=[];
                           this.errors.push(res.data.message);
                       }
                    })
                    .catch((e)=>{
                        console.log(e);
                    })
            }
            this.errors=[];
            if(this.code==null){
            this.errors.push('randevu kodu boş bırakılamaz');
            }
            }


    }

}
</script>


