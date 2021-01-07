<template>
    <div id="selectable-search">
        <b-input-group class="mb-2" v-for="(item, index) in conditions" :key="index" inline>
            <b-form-select required v-model="item.field" :options="options">
            </b-form-select>
            <b-form-select required v-model="item.operator">
                <option value="=">等於</option>
                <option value="!=">不等於</option>
                <option value=">">大於</option>
                <option value="<">小於</option>
                <option value="LIKE">包含</option>
            </b-form-select>
            <b-form-input required v-model="item.condition" maxlength="20">
            </b-form-input>
            <b-input-group-append>
                <b-button @click="deleteCondition(index)" variant="danger">
                    <font-awesome-icon icon="trash-alt" />
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-input-group class="mb-3" inline>
            <b-form-select required v-model="pendingCondiction.field" :options="options">
            </b-form-select>
            <b-form-select required v-model="pendingCondiction.operator">
                <option value="=">等於</option>
                <option value="!=">不等於</option>
                <option value=">">大於</option>
                <option value="<">小於</option>
                <option value="LIKE">包含</option>
            </b-form-select>
            <b-form-input required v-model="pendingCondiction.condition" maxlength="20">
            </b-form-input>
            <b-input-group-append>
                <b-button type="submit" variant="success" @click="addConditions">
                    <font-awesome-icon icon="plus-square" />
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <div class="d-flex">
            <b-button variant="primary" @click="onSearchClick">
                <font-awesome-icon icon="search" />
                搜尋
            </b-button>
            <b-button class="ml-2" variant="outline-danger" @click="onClearClick">清空搜尋列
            </b-button>
        </div>
    </div>
</template>

<script>
    import QueryConditions from '@/config/QueryOption.json'

    export default {
        name: "BroadcastSearch",
        props: {
            isSearch: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                options: QueryConditions,
                pendingCondiction: {
                    field: 'name',
                    operator: '=',
                    condition: ''
                },
                conditions: []
            }
        },
        methods: {
            isValidForm(form) {
                return form.field != '' && form.operator != '' && form.condition != '';
            },
            addConditions() {
                if (this.isValidForm(this.pendingCondiction)) {
                    this.conditions.push(this.pendingCondiction);
                    this.pendingCondiction = {
                        field: 'name',
                        operator: '=',
                        condition: ''
                    };
                }
            },
            onSearchClick() {
                if (this.conditions.length !== 0) {
                    this.$emit('search', this.conditions);
                }
            },
            onClearClick() {
                this.conditions = [];
                this.$emit('searchClear')
            },
            deleteCondition(index) {
                this.conditions.splice(index, 1);
            }
        },
    }
</script>