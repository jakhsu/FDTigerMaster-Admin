<template>
    <SimpleModal id="Score-Modal" title="修改平均分數" @onSaveClick="onSaveClick" @resetModal="resetModal">
        <template #modal-body>
            <b-form-group>
                <h5>目前平均分數: <b-badge variant="secondary">{{ user.avgScore }}</b-badge>
                </h5>
                <h5>新平均分數: <b-badge variant="success">{{ newScore }}</b-badge>
                </h5>
                <b-form-input id="scoreChange" v-model.number="newScore" type="range" min="0" max="5" placeholder="1.0"
                    step="0.5">
                </b-form-input>
            </b-form-group>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: 'ScoreModal',
        components: {
            SimpleModal
        },
        props: {
            user: {},
            currentUser: {}
        },
        data() {
            return {
                newScore: 0
            }
        },
        methods: {
            async onSaveClick() {
                let user = this.user;
                user.avgScore = this.newScore;
                delete user["pass"];
                try {
                    await this.currentUser.update(this.user);
                } catch (e) {
                    console.log(e)
                } finally {
                    this.newScore = 0;
                    this.$bvModal.hide("Score-Modal")
                }
            },
            resetModal() {}
        }
    }
</script>