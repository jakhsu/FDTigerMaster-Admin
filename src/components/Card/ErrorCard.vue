<template>
    <div>
        <b-card>
            <scale-loader v-if="isRetrying" />
            <div v-else>
                <div>
                    {{errorMsg}}
                </div>
                <b-button v-if="hasRetry" @click="retry" variant="success" class="mt-2">{{retryBtnText}}</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "ErrorCard",
        components: {},
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
        data() {
            return {
                isRetrying: false
            }
        },
        created() {
            console.log(this.isRetrying)
        },
        methods: {
            retry() {
                this.isRetrying = true
                this.$emit('retry')
                console.log(this.isRetrying)
            }
        }
    }
</script>