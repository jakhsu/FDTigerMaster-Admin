<template>
    <Loading v-if="isLoading" />
    <TitledCard v-else-if="isSearch" title="搜索列">
        <div id="search-bar">
            <b-container fluid>
                <b-row>
                    <b-col>
                        <div class="mt-2 queryList" v-for="(item, index) in selectedQueryConditions" :key="index">
                            <b-form>
                                <b-input-group>
                                    <template #prepend>
                                        <b-input-group-text>
                                            <strong>
                                                {{item.condition}}
                                            </strong>
                                        </b-input-group-text>
                                        <b-form-select v-model=selectedQueryConditions[index].operator>
                                            <option value=">">大於</option>
                                            <option value="=">等於</option>
                                            <option value="<">小於</option>
                                            <option value="LIKE">像</option>
                                        </b-form-select>
                                        <b-form-input v-model=selectedQueryConditions[index].input>
                                        </b-form-input>
                                    </template>
                                    <template #append>
                                        <b-button class="delete-icon" @click="deleteQueryCondition(index)">
                                            <font-awesome-icon icon="trash-alt" />
                                        </b-button>
                                    </template>
                                </b-input-group>
                            </b-form>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form class="mt-2">
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>
                                        <strong v-b-popover.hover="searchTips()">
                                            搜尋條件:
                                        </strong>
                                    </b-input-group-text>
                                </template>
                                <b-form-select required v-model="queryEntity.condition" :options="options">
                                </b-form-select>
                                <b-form-select required v-model="queryEntity.operator">
                                    <option value=">">大於</option>
                                    <option value="=">等於</option>
                                    <option value="<">小於</option>
                                    <option value="LIKE">像</option>
                                </b-form-select>
                                <b-form-input required v-model="queryEntity.input" maxlength="20">
                                </b-form-input>
                                <b-input-group-append>
                                    <b-button type="submit" variant="success" @click="addToQuery">加入</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form>
                    </b-col>
                </b-row>
                <b-row>
                    <div class="d-flex mt-3">
                        <b-button class="ml-2" variant="primary" @click="onSearchClick">
                            <font-awesome-icon icon="search" />
                            搜尋
                        </b-button>
                        <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清空搜尋列
                        </b-button>
                        <b-button @click="translate(queryEntity.condition)">測試</b-button>
                    </div>
                </b-row>
            </b-container>
        </div>
    </TitledCard>
</template>

<script>
    import allselectedQueryConditions from '@/config/QueryOption.json'
    import TitledCard from '@/components/Card/TitledCard.vue';
    import Loading from '@/components/Loading'
    import tigermaster from 'fdtigermaster-sdk';

    export default {
        components: {
            TitledCard,
            Loading,
        },
        name: "SearchBar",
        props: {
            isSearch: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                isLoading: false,
                queryEntity: {
                    condition: '',
                    operator: '',
                    input: '',
                },
                selectedQueryConditions: [],
                options: allselectedQueryConditions,
                selectedOperator: '',
                search: [],
                data: [],
            }
        },
        methods: {
            searchTips() {
                return {
                    variant: 'info',
                    html: true,
                    title: () => {
                        '說明'
                    },
                    content: () => {
                        return `如有需要可以在這放入搜索列說明`
                    },
                    placement: 'top',
                }
            },
            addToQuery() {
                if (this.queryEntity.condition != '' && this.queryEntity.condition != undefined &&
                    this.queryEntity.operator != '' && this.queryEntity.operator != undefined &&
                    this.queryEntity.input != '' && this.queryEntity.input != undefined) {
                    this.selectedQueryConditions.push(this.queryEntity);
                    this.queryEntity = {}
                } else {
                    return
                }
            },
            async onSearchClick() {
                this.isLoading = true;
                let query = tigermaster.database
                    .query("user")
                this.selectedQueryConditions.forEach((element) => {
                    if (element.operator == 'LIKE') {
                        element.input = '%' + element.input + '%';
                    } else if (element.condition == 'roleId') {
                        element.condition = 'role_id';
                    }
                    query.where(`user.${element.condition}`, `${element.operator}`, `${element.input}`);
                })
                query.limit(0, 100);
                const res = await query.get();
                this.data = res.data;
                this.$emit('completeSearch', this.data)
                this.$emit('onSearch', false);
                this.selectedQueryConditions = [];
                this.isLoading = false;
            },
            onSearchClearClick() {
                this.$emit('onSearch', false)
            },
            deleteQueryCondition(index) {
                this.options.push(this.selectedQueryConditions[index].condition);
                this.selectedQueryConditions.splice(index, 1);
            },
        },
    }
</script>

<style scoped>
    b-form-select:disabled,
    input:disabled {
        background-color: white;
    }
</style>