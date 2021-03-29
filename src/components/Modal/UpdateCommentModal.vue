<template>
    <SimpleModal :id="id" :isLoading="isLoading" title='修改評論' @onSaveClick="updateComment" @resetModal="clearModalData">
        <template #modal-body>
            <b-form-textarea v-model="commentContent" placeholder="輸入內文..." rows="5" max-rows="20">
            </b-form-textarea>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    export default {
        name: 'UpdateCommentModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Comment-Modify-Modal'
            },
            commentId: Number,
            initCommentContent: String
        },
        data() {
            return {
                isLoading: false,
                commentContent: this.initCommentContent
            }
        },
        methods: {
            async updateComment() {
                this.isLoading = true;
                const order = tigermaster.order;
                await order.updateComment(this.commentId, {
                    content: this.commentContent
                });
                this.$bvModal.hide(this.id);
                this.$emit('finish');
            },
            clearModalData() {
                this.isLoading = false;
            }
        },
        watch: {
            initCommentContent() {
                this.commentContent = this.initCommentContent
            }
        }
    }
</script>