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
                                <b-form-select required v-model="input" :options="options">
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
                        <div class="mt-2 queryList" v-for="(item, index) in searchOption" :key="index">
                            <b-form>
                                <b-input-group class="w-50">
                                    <template #prepend>
                                        <b-input-group-text>
                                            <strong>
                                                {{item}}
                                            </strong>
                                        </b-input-group-text>
                                        <b-form-select>
                                            <option value="大於">大於</option>
                                            <option value="等於">等於</option>
                                            <option value="小於">小於</option>
                                            <option value="像">像</option>
                                        </b-form-select>
                                    </template>
                                    <b-form-input></b-form-input>
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
    import queryOptions from '@/config/QueryOption.json'
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
                input: '',
                searchOption: [],
                options: queryOptions,
                selectedRelation: '',
                afterSearch: [],
            }
        },
        methods: {
            addToQuery() {
                if (this.input != '' && this.input != undefined) {
                    this.options = this.options.filter(element => element.value !== this.input)
                    this.searchOption.push(this.input);
                    this.input = ''
                } else {
                    return
                }
            },
            onSearchClick() {
                this.$emit('onSearch', false)
            },
            onSearchClearClick() {
                this.$emit('onSearch', false)
            },
            deleteQueryCondition(index) {
                this.searchOption.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
</style>