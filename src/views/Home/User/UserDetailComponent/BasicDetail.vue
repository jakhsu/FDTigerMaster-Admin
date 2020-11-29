<template>
    <div id="BasicDetail">
        <b-container fluid>
            <b-row>
                <b-col lg="6" md="12">
                    <TitledCard title="帳戶詳情:">
                        <b-form>
                            <div class="w-100 mb-3 d-flex">
                                <b-button class="ml-auto" variant="primary">
                                    <font-awesome-icon icon="edit" fixed-width/>
                                    Edit
                                </b-button>
                            </div>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="id: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="手機: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="密碼: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="名稱: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="角色: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="性別: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="城市: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="區域: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="街道: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group> 
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="門牌樓層: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group> 
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="區域: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group> 
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="身分證號: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="創建日期: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="創建者: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="更新日期: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group>
                            <b-form-group
                                label-cols="3"
                                label-cols-xl="2"
                                label="更新者: ">
                                <b-form-input
                                    disabled
                                />
                            </b-form-group> 
                        </b-form>
                    </TitledCard>
                </b-col>
                <b-col lg="6" md="12">
                    <TitledCard
                        title="用戶停權:"
                        titleBackgroundColor="#dd2a0e">
                        <div class="BasicDetail-Deactivate">
                            <p>將用戶停權有以下效果:</p>
                            <ul>
                                <li>用戶將會無法登入</li>
                                <li>用戶資料仍被保留住</li>
                                <li>相關訂單資訊也會被保留著</li>
                            </ul>
                            <b-button variant="danger">停權</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import TitledCard from '@/components/Card/TitledCard.vue'

export default {
    name: "BasicDetail",
    components: {
        TitledCard
    },
    props: {
        user: Object
    }
}
</script>

<style scoped>
#BasicDetail{
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#BasicDetail .BasicDetail-Deactivate{
    text-align: left;
}

#BasicDetail .BasicDetail-Deactivate ul{
    margin-bottom: 2rem;
}
</style>