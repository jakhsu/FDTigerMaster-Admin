<template>
    <b-form>
        <b-form-group label="通知標題">
            <b-form-input v-model="title" type="text" placeholder="輸入通知標題"/>
        </b-form-group>
        <b-form-group label="通知文字">
            <b-form-textarea
                v-model="content"
                placeholder="輸入通知文字"
                rows="4"
                max-rows="4"
            ></b-form-textarea>
        </b-form-group>
        <b-form-group label="通知圖片(選用)">
            <b-input-group inline>
                <b-form-input v-model="imageUrl" type="text" placeholder="圖片連結"/>
                <b-input-group-append>
                    <b-button variant="outline-info">
                        <font-awesome-icon icon="upload"/>
                    </b-button>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>
        <b-button variant="primary" :disabled="invaliedateForm" @click="onNextClick">下一步</b-button>
    </b-form>
</template>

<script>
export default {
    name: "BroadcastContent",
    data(){
        return{
            title: '',
            content: '',
            imageUrl: ''
        };
    },
    methods:{
        onNextClick(){
            this.$emit('next', {title: this.title, content: this.content, imageUrl: this.imageUrl});
        }
    },
    computed:{
        invaliedateForm(){
            return this.title === '' || this.content  === '';
        }
    }
}
</script>