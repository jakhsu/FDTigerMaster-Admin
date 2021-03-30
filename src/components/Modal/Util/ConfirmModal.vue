<template>
    <div>
        <SimpleModal @onSaveClick="onConfirm" :title="title" :id="id">
            <template #modal-body>
                <slot name="modal-body"></slot>
            </template>
        </SimpleModal>
    </div>
</template>

<script>
    import SimpleModal from '@/components/Modal/Util/SimpleModal.vue'
    export default {
        name: 'Confirm-Modal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Confirm-Modal'
            },
            title: {
                type: String,
                default: '須知'
            },
            data: {
                type: Object
            }
        },
        data() {
            return {

            }
        },
        methods: {
            onConfirm() {
                this.$emit("onConfirm")
                this.$bvModal.hide(this.id)
            }
        }
    }
</script>

<style>
    .Skill-Create-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>