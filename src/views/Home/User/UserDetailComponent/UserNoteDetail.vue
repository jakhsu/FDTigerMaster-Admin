<template>
    <div id="UserNoteDetail">
        <b-container fluid>
            <TitledCard title="評分和評論歷史">
                <b-row>
                    <b-col>
                        <b-button class="m-2" size="md" variant="danger" v-b-modal="'Simple-Modal'">修改平均分數
                        </b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col lg='3' md="6" sm="12" class="Card">
                        <b-card header="訂單編號: TH-TH01013" class="m-2" border-variant="primary"
                            header-bg-variant="primary" header-text-variant="light">
                            <b-card-text>
                                用戶評分: 4
                            </b-card-text>
                            <b-card-text>
                                用戶評論: 訂單另一方給用戶的評語會出現在這裡
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
            </TitledCard>
        </b-container>
    </div>
</template>
<script>
    import TitledCard from '@/components/Card/TitledCard.vue'


    export default {
        name: "UserNoteDetail",
        components: {
            TitledCard,
        },
        data() {
            return {
                items: [{
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                    {
                        訂單編號: "TH-T001",
                        師傅評分: "3",
                        客戶評分: "4",
                        師傅評論: "客戶給師傅的評論...",
                        客戶評論: "師傅給客戶的評論..."
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .Card {}
</style>