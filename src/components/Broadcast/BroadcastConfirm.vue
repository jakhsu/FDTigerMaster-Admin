<template>
    <Loading v-if="isLoading" />
    <div v-else>
        <TitledCard title="預覽">
            <PhonePreview class="m-2">
                <template #content>
                    <b-row>
                        <b-col>
                            <ul>
                                <li>
                                    {{msgContent.title}}
                                </li>
                                <li>
                                    {{msgContent.content}}
                                </li>
                            </ul>
                        </b-col>
                        <b-col>
                            <img class="review-image" :src='msgContent.imageUrl' alt="">
                        </b-col>
                    </b-row>
                </template>
            </PhonePreview>
            <b-button variant="success" @click="submitBroadcast">確認送出</b-button>
        </TitledCard>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import PhonePreview from '@/components/Preview/PhonePreview.vue'
    import Loading from '@/components/Loading.vue'
    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'BroadcastConfirm',
        components: {
            Loading,
            TitledCard,
            PhonePreview
        },
        props: {
            selectedUser: {
                type: Array
            },
            msgContent: {
                type: Object
            }
        },
        data() {
            return {
                isLoading: false,
                response: '',
                field: [{
                        "key": "name",
                        "label": "姓名"
                    },
                    {
                        "key": "email",
                        "label": "郵件"
                    },
                    {
                        "key": "addressCity",
                        "label": "城市"
                    },
                    {
                        "key": "status",
                        "label": "狀態"
                    },
                    {
                        "key": "roleId",
                        "label": "角色"
                    }
                ]
            }
        },
        methods: {
            async submitBroadcast() {
                this.isLoading = true;
                const pushNotify = tigermaster.pushNotify;
                try {
                    if (this.msgContent.imageUrl === '') {
                        const res = await pushNotify.send({
                            userIds: this.selectedUserIds,
                            title: this.msgContent.title,
                            content: this.msgContent.content
                        })
                        this.response = await res
                    } else {
                        const res = await pushNotify.send({
                            userIds: this.selectedUserIds,
                            title: this.msgContent.title,
                            content: this.msgContent.content,
                            imagePath: this.msgContent.imageUrl
                        });
                        this.response = await res
                    }
                    this.$emit('next', this.response)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isLoading = false;
                }
            }
        },
        computed: {
            selectedUserIds() {
                return this.selectedUser.map(e => e.id)
            }
        }
    }
</script>

<style scoped>
    ul {
        list-style-type: none;
    }

    .review-image {
        height: 100px;
    }
</style>