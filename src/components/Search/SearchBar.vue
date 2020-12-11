<template>
    <TitledCard v-if="isSearch" title="搜索列">
        <div id="search-bar">
            <b-container fluid>
                <b-row>
                    <b-col>
                        <b-form>
                            <b-input-group>
                                <template #prepend>
                                    <b-input-group-text>
                                        <strong>
                                            搜尋條件:
                                        </strong>
                                    </b-input-group-text>
                                </template>
                                <b-form-select required v-model="queryEntity.condition" :options="options">
                                </b-form-select>
                                <b-input-group-append>
                                    <b-button type="submit" variant="success" @click="addToQuery">加入</b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form>
                    </b-col>
                </b-row>
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
                                    </template>
                                    <b-form-input v-model=selectedQueryConditions[index].input></b-form-input>
                                    <template #append>
                                        <b-button @click="deleteQueryCondition(index)">
                                            <font-awesome-icon icon="trash-alt" />
                                        </b-button>
                                    </template>
                                </b-input-group>
                            </b-form>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <div class="d-flex mt-3">
                        <b-button class="ml-2" variant="primary" @click="onSearchClick">
                            <font-awesome-icon icon="search" />
                            搜尋
                        </b-button>
                        <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">取消搜尋
                        </b-button>
                    </div>
                </b-row>
            </b-container>
        </div>
    </TitledCard>
</template>

<script>
    import allselectedQueryConditions from '@/config/QueryOption.json'
    import TitledCard from '@/components/Card/TitledCard.vue';
    export default {
        components: {
            TitledCard,
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
                queryEntity:{
                    condition: '',
                    operator: '',
                    input: '',
                },
                selectedQueryConditions: [],
                options: allselectedQueryConditions,
                selectedOperator: '',
                search: [],
            }
        },
        methods: {
            addToQuery() {
                if (this.queryEntity.condition != '' && this.queryEntity.condition != undefined) {
                    this.options = this.options.filter(element => element.value !== this.queryEntity.condition)
                    this.selectedQueryConditions.push(this.queryEntity);
                    this.queryEntity = {}
                } else {
                    return
                }
            },
            onSearchClick() {
                this.selectedQueryConditions.forEach((element) => {
                    if (element == '' || element == undefined) {
                        this.$set(element, 'input', '%')
                    }
                })
                this.$emit('onSearch', false)
            },
            onSearchClearClick() {
                this.$emit('onSearch', false)
            },
            deleteQueryCondition(index) {
                this.selectedQueryConditions.splice(index, 1);
            }
        },
        created() {

        }
    }
</script>

<style scoped>
</style>