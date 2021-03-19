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
                                    {{msg.title}}
                                </li>
                                <li>
                                    {{msg.content}}
                                </li>
                            </ul>
                        </b-col>
                        <b-col>
                            <ProtectedImage :src="msg.imageUrl" />
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
    import ProtectedImage from '@/components/Image/ProtectedImage.vue'

    export default {
        name: 'BroadcastConfirm',
        components: {
            Loading,
            TitledCard,
            PhonePreview,
            ProtectedImage
        },
        props: {
            selectedUser: {
                type: Array
            },
            msg: {
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
                    const res = await pushNotify.send({
                        userIds: this.selectedUserIds,
                        title: this.msg.title,
                        content: this.msg.content,
                        imagePath: this.msg.imageUrl
                    });
                    this.response = res
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