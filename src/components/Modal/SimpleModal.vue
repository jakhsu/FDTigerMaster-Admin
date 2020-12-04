<template>
    <b-modal :id="id" @show="resetModal" :title="title">
        <!-- <b-form-group>
            <h5 for="scoreChange">新平均分數: <b-badge variant="success">{{input}}</b-badge>
            </h5>
            <b-form-input id="scoreChange" v-model="input" type="range" min="0" max="5" placeholder="1.0" step="0.5">
            </b-form-input>
        </b-form-group> -->
        <slot name="modalBody"></slot>

        <template #modal-footer="{ cancel }">
            <b-button variant="danger" @click="cancel">
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