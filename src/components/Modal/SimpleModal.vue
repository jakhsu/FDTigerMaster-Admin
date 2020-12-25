<template>
    <div>
        <b-modal :size="size" :isLoading="isLoading" @hidden="modalHidden" :id="id" @show="resetModal" :title="title">
            <scale-loader v-if="isLoading" />
            <slot v-else name="modal-body"></slot>
            <template #modal-footer="{cancel}">
                <b-button v-if="canBeDeleted" variant="outline-danger" @click="onDeleteClick">刪除</b-button>
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
            },
            canBeDeleted: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {}
        },
        methods: {
            resetModal() {},
            onSaveClick() {
                this.$emit("onSaveClick");
            },
            modalHidden() {
                this.$emit("modalHidden", true);
            },
            onDeleteClick() {
                this.$emit("onDeleteClick");
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