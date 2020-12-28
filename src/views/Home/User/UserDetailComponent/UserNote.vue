<template>
    <Loading v-if="isLoading" />
    <div v-else id="UserNote">
        <SimpleModal @onDeleteClick="deleteSingleNote" :canBeDeleted="true" @onSaveClick="updateNote"
            :isLoading="isLoadingModal" @modalHidden="clearModalData" id="Note-Modify-Modal" title="註記修改">
            <template #modal-body>
                <b-card>
                    <b-form>
                        <b-form-group>
                            <b-form-group label="註記內容">
                                <b-form-textarea v-model="noteToBeEdited.content" placeholder="輸入內文..." rows="5"
                                    max-rows="20">
                                </b-form-textarea>
                            </b-form-group>
                        </b-form-group>
                    </b-form>
                </b-card>
            </template>
        </SimpleModal>
        <SimpleModal @onSaveClick="createNote" :isLoading="isLoadingModal" @modalHidden="clearModalData"
            id="Note-Create-Modal" title="新增註記">
            <template #modal-body>
                <b-card>
                    <b-form>
                        <b-form-group>
                            <b-form-group label="註記內容">
                                <b-form-textarea v-model="noteToBeAdded" placeholder="輸入內文..." rows="5" max-rows="20">
                                </b-form-textarea>
                            </b-form-group>
                        </b-form-group>
                    </b-form>
                </b-card>
            </template>
        </SimpleModal>
        <b-container fluid>
            <b-row>
                <b-col>
                    <TitledCard title="用戶註記:">
                        <div class="User-Note-Search d-flex mb-3">
                            <b-button class="ml-2" variant="primary" @click="onSearchClick">搜尋</b-button>
                            <b-button class="ml-2" variant="outline-danger" @click="onSearchClearClick">清除搜尋</b-button>
                            <b-button class="ml-auto" variant="success" v-b-modal="'Note-Create-Modal'">新增註記</b-button>
                        </div>
                        <div class="User-Note-Table">
                            <CustomTable :isSelectable="true" selectMode="single" :queryRows="queryRows"
                                :totalRows="totalRows" :fields="fields" :datas="notes" :isBusy="tableBusy"
                                @dataRequire="onDataRequire" @rowSelected="onRowSelected">
                                <template #top-row="notes">
                                    <b-td v-for="(field, index) in notes.fields" :key="index">
                                        <b-form-input v-model="search[field.key]" :name="field.key"
                                            :placeholder="`${field.label}`" />
                                    </b-td>
                                </template>
                                <template #cell(content)="notes">
                                    {{notes.value}}
                                </template>
                                <template #cell(useFor)="notes">
                                    {{notes.value == "0" ? "一般" : notes.value == "1" ? "停權" : notes.value == "2" ? "修改評分" : notes.value}}
                                </template>
                            </CustomTable>
                        </div>
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
    import Loading from '@/components/Loading.vue'
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    export default {
        name: "UserNote",
        components: {
            TitledCard,
            CustomTable,
            Loading,
            SimpleModal,
        },
        props: {
            currentUser: {
                type: Object
            }
        },
        data() {
            return {
                search: {},
                tableBusy: false,
                noteToBeAdded: '',
                noteToBeEdited: {
                    content: '',
                    id: '',
                },
                fields: [{
                        "key": "content",
                        "label": "內容"
                    },
                    {
                        "key": "useFor",
                        "label": "類型"
                    },
                    {
                        "key": "createDate",
                        "label": "時間"
                    },
                ],
                notes: [],
                isLoading: false,
                totalRows: 0,
                queryRows: 0,
                isLoadingNote: false,
                isLoadingModal: false,
            }
        },
        methods: {
            async fetchUserNotes() {
                try {
                    this.isLoading = true;
                    const note = tigermaster.note;
                    this.notes = await note.listByUserId(this.currentUser.id);
                    this.totalRows = this.notes.length;
                    this.queryRows = this.notes.length;
                } catch (error) {
                    console.log(error)
                    this.notes = [];
                } finally {
                    this.isLoading = false;
                }
            },
            onDataRequire() {
                this.tableBusy = true;
            },
            onSearchClick() {},
            onSearchClearClick() {
                this.search = {}
            },
            async createNote() {
                this.isLoadingModal = true;
                this.tableBusy = true;
                const note = tigermaster.note;
                await note.createUserNote(this.currentUser.id, this.noteToBeAdded, note.UseFor
                    .Normal);
                this.noteToBeAdded = '';
                this.notes = await note.listByUserId(this.currentUser.id);
                this.totalRows = this.notes.length;
                this.queryRows = this.notes.length;
                this.$bvModal.hide("Note-Create-Modal");
                this.tableBusy = false;
                this.isLoadingModal = false;
            },
            onRowSelected(obj) {
                this.$bvModal.show("Note-Modify-Modal");
                this.noteToBeEdited.content = obj[0].content;
                this.noteToBeEdited.id = obj[0].id;
            },
            async updateNote() {
                this.isLoadingModal = true;
                this.tableBusy = true;
                const note = tigermaster.note;
                await note.update(this.noteToBeEdited.id, this.noteToBeEdited.content)
                this.$bvModal.hide("Note-Modify-Modal");
                this.notes = await note.listByUserId(this.currentUser.id);
                this.totalRows = this.notes.length;
                this.queryRows = this.notes.length;
                this.tableBusy = false;
                this.isLoadingModal = false;
            },
            clearModalData() {},
            async deleteSingleNote() {
                this.isLoadingModal = true;
                const note = tigermaster.note;
                await note.delete(this.noteToBeEdited.id)
                this.$bvModal.hide("Note-Modify-Modal");
                this.fetchUserNotes();
                this.isLoadingModal = false;
            },
        },
        async created() {
            this.fetchUserNotes();
        },
    }
</script>