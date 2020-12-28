<template>
    <SimpleModal :isLoading="isLoading" @onSaveClick="onActivate" :id="id" title="恢復"
        @resetModal="clearModalData">
        <template #modal-body>
            <b-form-group label="輸入恢復理由">
                <b-form-textarea required v-model="comment"></b-form-textarea>
            </b-form-group>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'ActivateModal',
        components:{
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: "Activate-Modal"
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
            async onActivate() {
                if (this.comment !== '') {
                    this.isLoading = true;
                    await this.currentUser.update({status: 1});
                    console.log(this.currentUser.data);
                    const note = tigermaster.note;
                    await note.createUserNote(this.currentUser.id, this.comment, note.UseFor.Deactive)
                    this.$bvModal.hide("Activate-Modal");
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