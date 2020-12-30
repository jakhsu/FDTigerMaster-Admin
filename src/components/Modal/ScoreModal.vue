<template>
    <SimpleModal id="Score-Modal" title="修改平均分數">
        <template #modal-body>
            <b-form-group>
                <h5 for="scoreChange">新平均分數: <b-badge variant="success">{{score}}</b-badge>
                </h5>
                <b-form-input id="scoreChange" v-model="score" type="range" min="0" max="5"
                    placeholder="1.0" step="0.5">
                </b-form-input>
            </b-form-group>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: 'ScoreModal',
        components:{
            SimpleModal
        },
        data(){
            return {
                score: 0
            }
        }
    }
</script>