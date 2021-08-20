<template>
    <transition name="modal">
        <div class="modal-mask">

            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            <h3 slot="header">{{ data.fullName }}
                                <button class="btn btn-danger modal-default-button" @click="$emit('close')">
                                    X
                                </button>
                            </h3>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <div>
                                <span>Telefon</span>: <span>{{ data.phone }}</span>
                            </div>
                            <div>
                                <span>Email</span>: <span>{{ data.email }}</span>
                            </div>
                            <div>
                                <span>Tarih</span>: <span>{{ data.date }}</span>
                            </div>
                            <div>
                                <span>Saat</span>: <span>{{ data.working }}</span>
                            </div>
                            <div>
                                <span>Bildirim Tipi</span>: <span>{{ data.notification }}</span>
                            </div>
                            <div>
                                <span>Not</span>: <span>{{ data.text }}</span>
                            </div>


                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">

                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {   //id veritabanından çekme işlemi
    props: ['modalId'],
    data() {
        return {
            data: []
        }
    },
    created() {
        axios.get('http://127.0.0.1:8000/api/admin/detail/${this.modalId}')
            .then((res) => {
                this.data = res.data.data;
            });
    }
}
</script>
