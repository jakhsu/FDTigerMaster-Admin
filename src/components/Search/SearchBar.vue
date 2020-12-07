<template>
    <div id="search-bar">
        <b-container fluid>
            <b-row>
                <b-col>
                    <b-form>
                        <b-input-group>
                            <b-form-input list="queryOption" v-model="input" />
                            <b-input-group-append>
                                <b-button class="ml-2" variant="success" @click="addToQuery">加入</b-button>
                            </b-input-group-append>
                            <datalist id="queryOption">
                                <option v-for="(item, index) in options" :key="index">
                                    {{ item.value }}
                                </option>
                            </datalist>
                        </b-input-group>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="mt-2 queryList" v-for="(item, index) in searchOption" :key="index">
                        <b-form inline>
                            <b-input-group class="col-6">
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
                            </b-input-group>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import queryOptions from '@/config/QueryOption.json'
    export default {
        name: "SearchBar",
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
                this.searchOption.push(this.input);
                this.options = this.options.filter(element => element.value !== this.input)
                this.input = ''
            }
        }
    }
</script>

<style scoped>
</style>