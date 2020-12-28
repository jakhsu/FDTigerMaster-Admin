<template>
    <div>
        <b-modal :size="size" :isLoading="isLoading" :id="id" @show="resetModal" :title="title">
            <scale-loader v-if="isLoading" />
            <slot v-else name="modal-body"></slot>
            <template #modal-footer="{cancel}">
                <slot name="modal-button"></slot>
                <b-button class="ml-auto" variant="outline-secondary" @click="cancel">
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
            onSaveClick() {
                this.$emit("onSaveClick");
            },
            resetModal() {
                this.$emit("resetModal");
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