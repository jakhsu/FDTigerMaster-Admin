<template>
    <div id="BasicDetail">
        <b-container fluid>
            <b-row>
                <b-col lg="6" md="12">
                    <TitledCard title="Account:">
                        <b-form>
                            <div class="w-100 mb-3 d-flex align-items-right-center">
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
                        title="Deactive User:"
                        titleBackgroundColor="#dd2a0e">
                        <div class="BasicDetail-Deactive">
                            <p>Deactive user has the following effects:</p>
                            <ul>
                                <li>User will not be able to login</li>
                                <li>Personal information will be left</li>
                                <li>Order history will be left</li>
                            </ul>
                            <b-button variant="danger">Deactive</b-button>
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
#BasicDetail .BasicDetail-Deactive{
    text-align: left;
}

#BasicDetail .BasicDetail-Deactive ul{
    margin-bottom: 2rem;
}
</style>