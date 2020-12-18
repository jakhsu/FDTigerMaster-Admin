<template>
    <div id="UserNote">
        <b-container fluid>
            <b-row>
                <b-col lg='6' md='12'>
                    <TitledCard title="用戶註記:">
                        <div class="User-Note-Search d-flex mb-3">
                            <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button>
                        </div>
                        <div class="User-Note-Table">
                            <CustomTable :queryRows="1" :totalRows="3" :fields="fields" :datas="notes"
                                :isBusy="tableBusy" @dataRequire="onDataRequire">
                                <template #top-row="notes">
                                    <b-td v-for="(field, index) in notes.fields" :key="index">
                                        <b-form-input v-model="search[field.key]" :name="field.key"
                                            :placeholder="`${field.label}`" />
                                    </b-td>
                                </template>
                            </CustomTable>
                        </div>
                    </TitledCard>
                </b-col>
                <b-col lg='6' md='12'>
                    <TitledCard title="添加註記">
                        <b-form>
                            <b-form-group label="註記內容">
                                <b-form-textarea v-model="noteToBeAdded" id="textarea" placeholder="輸入內文..." rows="5"
                                    max-rows="20">
                                </b-form-textarea>
                            </b-form-group>
                            <b-button variant="primary" @click="submitNote">送出</b-button>
                        </b-form>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    import CustomTable from '@/components/Table/CustomTable.vue'
    import tigermaster from 'fdtigermaster-sdk'
    export default {
        name: "UserNote",
        components: {
            TitledCard,
            CustomTable,
        },
        data() {
            return {
                search: {},
                tableBusy: false,
                noteToBeAdded: '',
                fields: [{
                        "key": "note",
                        "label": "註記"
                    },
                    {
                        "key": "noteCreatedTime",
                        "label": "註記時間"
                    }
                ],
                notes: [],
            }
        },
        methods: {
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {
                this.search = {}
            },
            async submitNote() {
                const note = tigermaster.note;
                const noteId = await note.createUeserNote("2020121600002", "note", note.UseFor.Normal);
                console.log(noteId);
            }
        },
        async created() {
            // const res = await tigermaster.database.query("note").get();
            // console.log(res);
        },
    }
</script>