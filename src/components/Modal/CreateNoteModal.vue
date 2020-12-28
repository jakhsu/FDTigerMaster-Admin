<template>
    <SimpleModal :id="id" :isLoading="isLoading" title="新增註記" @onSaveClick="createNote" @resetModal="clearModalData">
        <template #modal-body>
            <b-form-textarea v-model="noteContent" placeholder="輸入內文..." rows="5" max-rows="20">
            </b-form-textarea>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'CreateNoteModal',
        components:{
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: "Note-Create-Modal"
            },
            userId: String
        },
        data(){
            return {
                noteContent: '',
                isLoading: false
            }
        },
        methods:{
            async createNote() {
                this.isLoading = true;
                const note = tigermaster.note;
                await note.createUserNote(this.userId, this.noteContent, note.UseFor.Normal);
                this.$bvModal.hide("Note-Create-Modal");
                this.$emit("finish");
            },
            clearModalData(){
                this.isLoading = false;
                this.noteContent = '';
            }
        }
    }
</script>