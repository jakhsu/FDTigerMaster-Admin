<template>
    <Loading v-if="isLoading" />
    <div v-else id="CategoryModify">
        <b-container fluid>
            <div class="CategoryModify-Area">
                <b-row class="mt-3" align-h="end">
                    <b-col>
                        <div class="d-flex">
                            <b-button class="ml-auto" variant="success" @click="onFinishEdit">
                                <font-awesome-icon icon="edit" />
                                完成
                            </b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onCancelEdit">
                                取消
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="col-12">
                        <TitledCard title="單一工項修改">
                            <b-form>
                                <b-card class="m-4" bg-variant="light">
                                    <b-form-group label-class="font-weight-bold pt-0" label="工項資料">
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="工項編號: ">
                                            <b-form-input class="m-2" v-model="category.id" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="工項描述: ">
                                            <b-form-input class="m-2" v-model="category.description" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="企業保固(日): ">
                                            <b-form-input class="m-2" v-model.number="category.commercialWarrantyDay" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="一般消費者保固(日): ">
                                            <b-form-input class="m-2" v-model.number="category.consumerWarrantyDay" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="最高價格: ">
                                            <b-form-input class="m-2" v-model="category.maxPrice" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="最高價格比例(%): ">
                                            <b-form-input class="m-2" v-model="category.maxPricePercentage" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="最低價格: ">
                                            <b-form-input class="m-2" v-model="category.minPrice" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="最低價格比例(%): ">
                                            <b-form-input class="m-2" v-model="category.minPricePercentage" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="價格說明: ">
                                            <b-form-input class="m-2" v-model="category.priceRangeDescription" />
                                        </b-form-group>
                                        <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2"
                                            label="保固說明: ">
                                            <b-form-input class="m-2" v-model="category.warrantyDescription" />
                                        </b-form-group>
                                        <b-form-group label="skill_item_id">
                                            <b-form-input v-model="category.skillItemId" disabled></b-form-input>
                                        </b-form-group>
                                    </b-form-group>
                                </b-card>
                            </b-form>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
    import tigermaster from 'fdtigermaster-sdk';
    import Loading from '@/components/Loading';
    import TitledCard from '@/components/Card/TitledCard.vue';
    export default {
        name: "CategoryModify",
        components: {
            Loading,
            TitledCard,
        },
        data() {
            return {
                category: {},
                isLoading: false,
            }
        },
        async created() {
            this.isLoading = true;
            const workingCategory = tigermaster.services.WorkingCategory;
            const category = await await workingCategory.get(this.$route.query.categoryId);
            this.category = category;
            this.isLoading = false;
        },
        methods: {
            onCancelEdit() {
                this.$router.push({
                    path: '/home/category',
                });
            },
            async onFinishEdit() {
                this.isLoading = true;
                const workingCategory = tigermaster.services.WorkingCategory;
                await workingCategory.update(this.category)
                this.$router.push({
                    path: '/home/category',
                });
            },
        }

    }
</script>

<style scoped>
    #CategoryModify {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #CategoryModify .CategoryModify-Area .CategoryModify-Header {
        margin: 25px 0px;
        padding: 0px 25px;
        text-align: left;
        color: #000;
    }

    #CategoryModify .CategoryModify-Area .nav-tabs {
        border-bottom: 2px solid #c3cfdd;
    }

    #CategoryModify .CategoryModify-Area .nav-link {
        color: #476282;
    }

    #CategoryModify .CategoryModify-Area .nav-link {
        color: #c3cfdd;
    }

    #CategoryModify .CategoryModify-Area .nav-link.active {
        background-color: transparent;
        border-color: transparent;
        border-bottom: solid 3px #457CD6;
        color: #457CD6;
    }

    #CategoryModify .CategoryModify-Area ul.nav {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #CategoryModify .CategoryModify-Area ul.nav li {
        display: inline-block;
        float: none;
    }

    @media (max-width: 576px) {
        .container-fluid {
            padding: 0px;
        }
    }
</style>