<template>
    <div>
        <b-card>
            <scale-loader v-if="isRetrying" />
            <div v-else>
                <div>
                    {{displayText}}
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
            errorMsg: {
                type: String
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
                isRetrying: false,
                displayText: ""
            }
        },
        created() {
            this.parseErrorMsg()
        },
        methods: {
            retry() {
                this.isRetrying = true
                this.$emit('retry')
            },
            parseErrorMsg() {
                const notFoundErrorExp = /404/
                const serverErrorExp = /500/
                const badRequestErrorExp = /400/
                if (this.errorMsg.match(notFoundErrorExp)) {
                    this.displayText = "找不到資料，請確認正在找的資源存在"
                }
                if (this.errorMsg.match(serverErrorExp)) {
                    this.displayText = "伺服器出現問題，請稍後再試"
                }
                if (this.errorMsg.match(badRequestErrorExp)) {
                    this.displayText = "網路請求格式錯誤，請聯絡開發人員"
                }
            }
        }
    }
</script>