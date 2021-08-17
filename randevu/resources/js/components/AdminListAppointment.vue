<template>
             <div class="row">
            <div v-for="item in data"  class="col-md-4">
                <div class="card appointment-card">
                    <span class="appointment-number">Randevu #{{item.id}}</span>
                    <div class="appointment-detail">
                        <span>{{item.fullName}}</span>
                        <span>{{item.date}}</span>
                        <span>{{item.working}}</span>
                    </div>
                </div>
            </div>
             </div>
</template>

<script>
export default {
    props:['data'],
created(){
    console.log('liste çağırıldı');
}
}
</script>


