<template>
    <div>
        <b-modal :size="size" :isLoading="isLoading" @hidden="modalHidden" :id="id" @show="resetModal" :title="title">
            <scale-loader v-if="isLoading" />
            <slot v-else name="modal-body"></slot>
            <template #modal-footer="{cancel}">
                <b-button variant="outline-danger" @click="cancel">
                    取消
                </b-button>
                <b-button variant="primary" @click="onSaveClick">
                    確認
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'SimpleModal',
        components: {},
        props: {
            id: {
                type: String,
                default: 'Simple-Modal'
            },
            title: {
                type: String,
                default: 'Simple Modal'
            },
            isLoading: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'lg'
            }
        },
        data() {
            return {}
        },
        methods: {
            resetModal() {},
            onSaveClick() {
                this.$emit("onSaveClick")
            },
            modalHidden() {
                this.$emit("modalHidden", true)
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