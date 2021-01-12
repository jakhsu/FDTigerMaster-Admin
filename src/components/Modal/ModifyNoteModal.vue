<template>
    <SimpleModal :id="id" :isLoading="isLoading" title='新增註記' @onSaveClick="updateNote" @resetModal="clearModalData">
        <template #modal-body>
            <b-form-textarea v-model="noteContent" placeholder="輸入內文..." rows="5" max-rows="20">
            </b-form-textarea>
        </template>
        <template #modal-button>
            <b-button variant="outline-danger" @click="deleteNote">刪除</b-button>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ModifyNoteModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Note-Modify-Modal'
            },
            noteId: Number,
            initNoteContent: String
        },
        data() {
            return {
                isLoading: false,
                noteContent: this.initNoteContent
            }
        },
        methods: {
            async deleteNote() {
                this.isLoading = true;
                const note = tigermaster.note;
                await note.delete(this.noteId);
                this.$bvModal.hide(this.id);
                this.$emit('finish');
            },
            async updateNote() {
                this.isLoading = true;
                const note = tigermaster.note;
                await note.update(this.noteId, this.noteContent);
                this.$bvModal.hide(this.id);
                this.$emit('finish');
            },
            clearModalData() {
                this.isLoading = false;
            }
        },
        watch: {
            initNoteContent() {
                this.noteContent = this.initNoteContent;
            }
        }
    }
</script>