<template>
    <b-modal :id="id" @show="resetModal" :title="title">
        <slot name="modalBody"></slot>
        <template #modal-footer="{ cancel }">
            <b-button variant="outline-danger" @click="cancel">
                取消
            </b-button>
            <b-button variant="primary" @click="onSaveClick">
                確認
            </b-button>
        </template>
    </b-modal>
</template>

<script>
    export default {
        name: 'SimpleModal',
        props: {
            id: {
                type: String,
                default: 'Simple-Modal'
            },
            title: {
                type: String,
                default: 'Simple Modal'
            }
        },
        data() {
            return {}
        },
        methods: {
            resetModal() {},
            onSaveClick() {
                this.$bvModal.hide(this.id);
            }
        }
    }
</script>

<style>
    .User-Create-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>