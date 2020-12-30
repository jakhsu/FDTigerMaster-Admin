<template>
    <div id="UserNote">
        <CreateNoteModal @finish="onRefresh" :userId="currentUser.id" />
        <ModifyNoteModal @finish="onRefresh" :noteId="selectedNote.id" :initNoteContent="selectedNote.content" />
        <b-container fluid>
            <b-row>
                <b-col>
                    <TitledCard title="用戶註記:">
                        <div class="User-Note-Search d-flex mb-3">
                            <b-button class="ml-auto" variant="success" v-b-modal="'Note-Create-Modal'">新增註記</b-button>
                        </div>
                        <div class="User-Note-Table">
                            <CustomTable :queryRows="totalRows" :totalRows="totalRows" :fields="fields" :datas="notes"
                                :isBusy="tableBusy" @rowClick="onRowClick">
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
    import CreateNoteModal from '@/components/Modal/CreateNoteModal.vue'
    import ModifyNoteModal from '@/components/Modal/ModifyNoteModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: "UserNote",
        components: {
            TitledCard,
            CustomTable,
            CreateNoteModal,
            ModifyNoteModal
        },
        props: {
            currentUser: {
                type: Object
            }
        },
        data() {
            return {
                search: {},
                tableBusy: true,
                selectedNote: {
                    content: '',
                    id: 0
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
                    }
                ],
                notes: [],
                totalRows: 0
            }
        },
        async created() {
            const note = tigermaster.note;
            try {
                this.notes = await note.listByUserId(this.currentUser.id);
                this.totalRows = this.notes.length;
            } catch (e) {
                console.log(e);            
            } finally {
                this.tableBusy = false;
            }
        },
        methods: {
            onRowClick(item) {
                this.selectedNote.content = item.content;
                this.selectedNote.id = item.id;
                this.$bvModal.show("Note-Modify-Modal");
            },
            async onRefresh() {
                this.tableBusy = true;
                const note = tigermaster.note;
                try {
                    this.notes = await note.listByUserId(this.currentUser.id);
                    this.totalRows = this.notes.length;
                } catch (e) {
                    this.notes = [];
                    this.totalRows = 0;
                } finally {
                    this.tableBusy = false;
                    this.selectedNote = {
                        content: '',
                        id: 0
                    }
                }
            }
        },
    }
</script>