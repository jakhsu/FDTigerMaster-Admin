<template>
    <CustomTable ref="customTable" :queryRows="queryRows" :totalRows="totalCount" :fields="fields" :datas="data"
        :isBusy="tableBusy" @dataRequire="onDataRequire">
        <template #top-row="data">
            <b-td v-for="(field, index) in data.fields" :key="index" style="overflow:visible">
                <b-form-select v-if="field.key == 'status'" v-model="search['status']">
                    <option value="0">停用</option>
                    <option value="1">啟用</option>
                </b-form-select>
                <b-form-select v-else-if="field.key == 'roleId'" v-model.number="search['roleId']">
                    <option value="1">一般客戶</option>
                    <option value="2">企業用戶</option>
                </b-form-select>
                <b-input-group v-else-if="field.key == 'createDate'">
                    <b-form-input v-model="search['createDate']">
                    </b-form-input>
                    <b-input-group-append>
                        <b-form-datepicker v-model="search['createDate']" size="sm" placeholder="選擇日期" button-only
                            offset="10px" />
                    </b-input-group-append>
                </b-input-group>
                <b-form-input v-else v-model="search[field.key]" :name="field.key" :placeholder="`${field.label}`" />
            </b-td>
        </template>
        <template #cell(phone)="data">
            <router-link :to="`/home/user_detail?userId=${data.item.id}`">
                {{ data.value }}
            </router-link>
        </template>
        <template #cell(status)="data">
            {{ data.value == "1" ? "啟用" : "凍結" }}
        </template>
        <template #cell(roleId)="data">
            {{ roleIdMap[data.value] }}
        </template>
    </CustomTable>
</template>

<script>
    import CustomTable from '@/components/CustomTable.vue'
    export default {
        components: {
            CustomTable
        },
        props: {
            data: {
                type: Array
            }
        },
        data() {

        },
        methods: {

        }
    }
</script>