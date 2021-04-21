<template>
    <SimpleModal :isLoading="isLoading" @onSaveClick="onActivate" :id="id" title="恢復" @resetModal="clearModalData">
        <template #modal-body>
            <b-form-group label="輸入恢復理由">
                <b-form-textarea required v-model="comment"></b-form-textarea>
            </b-form-group>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/Util/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ActivateModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Activate-Modal'
            },
            user: Object
        },
        data() {
            return {
                comment: '',
                isLoading: false
            }
        },
        methods: {
            async onActivate() {
                if (this.comment !== '') {
                    this.isLoading = true;
                    await this.user.update({
                        status: 1
                    });
                    const note = tigermaster.note;
                    await note.createUserNote(this.user.id, this.comment, note.UseFor.Deactive)
                    this.$bvModal.hide(this.id);
                    this.$emit('finish');
                }
            },
            clearModalData() {
                this.isLoading = false;
                this.comment = '';
            }
        }
    }
</script>