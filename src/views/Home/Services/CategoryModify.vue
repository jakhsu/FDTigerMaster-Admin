<template>
    <Loading v-if="isLoading" />
    <div v-else>
        <b-container fluid>
            <b-row>
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
                <b-col>
                    <TitledCard title="單一工項修改">
                        <b-form>
                            <b-card>
                                <b-form-group label-class="font-weight-bold pt-0" label="工項資料">
                                    <b-form-input class="m-2" v-model="category.id" />
                                    <b-form-input class="m-2" v-model="category.description" />
                                    <b-form-input class="m-2" v-model="category.commercialWarrantyDay" />
                                    <b-form-input class="m-2" v-model="category.consumerWarrentyDay" />
                                    <b-form-input class="m-2" v-model="category.maxPrice" />
                                    <b-form-input class="m-2" v-model="category.maxPricePercentage" />
                                    <b-form-input class="m-2" v-model="category.minPrice" />
                                    <b-form-input class="m-2" v-model="category.minPricePercentage" />
                                    <b-form-input class="m-2" v-model="category.priceRangeDescription" />
                                    <b-form-input class="m-2" v-model="category.warrantyDescription" />
                                </b-form-group>
                            </b-card>
                        </b-form>
                    </TitledCard>
                </b-col>
            </b-row>
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
            onCancelEdit() {},
            onFinishEdit() {},
        }

    }
</script>

<style scoped>

</style>