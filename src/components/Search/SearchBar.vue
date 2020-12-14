<template>
    <TitledCard v-if="isSearch" title="搜索列">
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
                                        <b-button class="delete-icon"  @click="deleteQueryCondition(index)">
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
                                        <strong>
                                            搜尋條件:
                                        </strong>
                                    </b-input-group-text>
                                </template>
                                <b-form-select required v-model="queryEntity.condition" :options="options" style="width:auto">
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
    import tigermaster from 'fdtigermaster-sdk';
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
                if (this.queryEntity.condition != '' && this.queryEntity.condition != undefined 
                && this.queryEntity.operator != '' && this.queryEntity.operator != undefined
                && this.queryEntity.input != '' && this.queryEntity.input != undefined) {
                    this.options = this.options.filter(element => element.value !== this.queryEntity.condition)
                    this.selectedQueryConditions.push(this.queryEntity);
                    this.queryEntity = {}
                } else {
                    return
                }
            },
            async onSearchClick() {
                const res = tigermaster.database
                    .query("user")
                this.selectedQueryConditions.forEach((element) => {
                    if (element.operator == 'LIKE') {
                        // element.input = '%' + element.input + '%';
                    }
                    res.where(`user.${element.condition}`, `${element.operator}`, `${element.input}`)
                })
                res.limit(0,100);
                await res.get();
                console.log(res.data);
                this.$emit('onSearch', false)
            },
            onSearchClearClick() {
                this.$emit('onSearch', false)
            },
            deleteQueryCondition(index) {
                this.options.push(this.selectedQueryConditions[index].condition);
                this.selectedQueryConditions.splice(index, 1);

            }
        },
        created() {

        }
    }
</script>

<style scoped>
b-form-select:disabled, input:disabled {
    background-color: white;
}

</style>