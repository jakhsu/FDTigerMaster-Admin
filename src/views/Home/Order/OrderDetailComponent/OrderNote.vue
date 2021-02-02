<template>
    <div id="OrderNote">
        <CreateOrderNoteModal @finish="onRefresh" :orderId="order.id" />
        <ModifyNoteModal @finish="onRefresh" :noteId="selectedNote.id" :initNoteContent="selectedNote.content" />
        <b-container fluid>
            <b-row>
                <b-col>
                    <TitledCard title="訂單註記:">
                        <div class="User-Note-Search d-flex mb-3">
                            <b-button class="ml-auto" variant="success" v-b-modal="'Note-Create-Modal'">新增註記</b-button>
                        </div>
                        <div class="User-Note-Table">
                            <CustomTable :queryRows="totalRows" :totalRows="totalRows" :fields="fields" :datas="notes"
                                :isBusy="tableBusy" @rowClick="onRowClick()">
                                <template #cell(content)="notes">
                                    {{notes.value}}
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
    import CreateOrderNoteModal from '@/components/Modal/CreateOrderNoteModal.vue'
    import ModifyNoteModal from '@/components/Modal/ModifyNoteModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'
    export default {
        name: "OrderNote",
        components: {
            TitledCard,
            CustomTable,
            CreateOrderNoteModal,
            ModifyNoteModal
        },
        props: {
            order: {
                type: Object
            }
        },
        data() {
            return {
                search: {},
                tableBusy: true,
                notes: [],
                totalRows: 0,
                selectedNote: {
                    content: '',
                    id: 0
                },
                fields: [{
                        "key": "content",
                        "label": "內容"
                    },
                    {
                        "key": "createDate",
                        "label": "時間"
                    }
                ]
            }
        },
        async created() {
            const note = tigermaster.note;
            try {
                this.notes = await note.listByOrderId(this.order.id);
                this.totalRows = this.notes.length;
            } catch (e) {
                console.log(e);
            } finally {
                this.tableBusy = false;
            }
        },
        methods: {
            async onRefresh() {
                this.tableBusy = true;
                const note = tigermaster.note;
                try {
                    this.notes = await note.listByOrderId(this.order.id);
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
            },
            onRowClick(item) {
                // this.selectedNote.content = item.content;
                // this.selectedNote.id = item.id;
                console.log(item)
                this.$bvModal.show("Note-Modify-Modal");
            },
        }
    }
</script>