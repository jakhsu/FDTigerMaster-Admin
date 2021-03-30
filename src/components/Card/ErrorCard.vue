<template>
    <div>
        <b-card>
            {{errorMsg}}
        </b-card>
        <b-button v-if="hasRetry" @click="retry" variant="success" class="mt-2">{{retryBtnText}}</b-button>
    </div>
</template>

<script>
    export default {
        name: "ErrorCard",
        props: {
            errorType: {
                type: String,
                default: 'network'
            },
            errorMsg: {
                type: String,
                default: '抱歉，似乎有錯誤發生'
            },
            retryBtnText: {
                type: String,
                default: '重新嘗試'
            },
            hasRetry: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            retry() {
                this.$emit('retry')
            }
        }
    }
</script>