<template>
    <SimpleModal id="Score-Modal" title="修改平均分數" @onSaveClick="onSaveClick" @resetModal="resetModal"
        :isLoading="isLoading">
        <template #modal-body>
            <b-form-group>
                <h5>
                    目前: <b-badge variant="secondary">{{ userData.avgScore }}</b-badge>
                    修改後: <b-badge variant="success">{{ newScore }}</b-badge>
                </h5>
                <b-form-input id="scoreChange" v-model.number="newScore" type="range" min="0" max="5" placeholder="1.0"
                    step="0.5">
                </b-form-input>
            </b-form-group>
            <b-form-group label="修改評分原因">
                <b-textarea v-model="scoreChangeReason" />
            </b-form-group>
            <span class="FormError" v-if="errorMsg !== ''">{{errorMsg}}</span>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/Util/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'ScoreModal',
        components: {
            SimpleModal
        },
        props: {
            userData: {},
            user: {}
        },
        data() {
            return {
                isLoading: false,
                newScore: 0,
                scoreChangeReason: '',
                errorMsg: '',
                inputState: [null]
            }
        },
        methods: {
            async onSaveClick() {
                if (this.scoreChangeReason === '') {
                    this.errorMsg = '請輸入原因';
                    return
                }
                this.isLoading = true;
                const note = tigermaster.note;
                try {
                    await this.user.update({
                        avgScore: this.newScore
                    });
                    await note.createUserNote(this.userData.id, this.scoreChangeReason, note.UseFor.ScoreModify);
                    this.$emit("refresh");
                } catch (e) {
                    console.log(e)
                } finally {
                    this.newScore = 0;
                    this.$bvModal.hide("Score-Modal")
                    this.isLoading = false;
                }
            },
            resetModal() {
                this.errorMsg = '';
                this.newScore = 0;
                this.scoreChangeReason = '';
            }
        }
    }
</script>

<style scoped>
    .FormError {
        color: #dd2a0e;
        font-size: 15px;
    }
</style>