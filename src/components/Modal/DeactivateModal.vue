<template>
    <SimpleModal :isLoading="isLoading" @onSaveClick="onDeactivate" :id="id" title="凍結"
        @resetModal="clearModalData">
        <template #modal-body>
            <b-form-group label="輸入凍結理由">
                <b-form-textarea required v-model="comment"></b-form-textarea>
            </b-form-group>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'DeactivateModal',
        components:{
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: "Deactivate-Modal"
            },
            currentUser: undefined
        },
        data(){
            return {
                comment: '',
                isLoading: false
            }
        },
        methods:{
            async onDeactivate() {
                if (this.comment !== '') {
                    this.isLoading = true;
                    await this.currentUser.update({status: 0});
                    const note = tigermaster.note;
                    await note.createUserNote(this.currentUser.id, this.comment, note.UseFor.Deactive);
                    this.$bvModal.hide("Deactivate-Modal");
                    this.$emit("finish");
                }
            },
            clearModalData(){
                this.isLoading = false;
                this.comment = '';
            }
        }
    }
</script>