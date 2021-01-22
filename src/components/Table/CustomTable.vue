<template>
    <div>
        <b-table id="custom-table" :items="datas" :fields="fields" ref="selectableTable" :per-page="perPage"
            :current-page="currentPage" :busy="isBusy" bordered responsive foot-clone hover :selectable="isSelectable"
            :select-mode="selectMode" @row-selected="onRowSelected" @row-clicked="onRowClick">
            <template #table-busy>
                <div class="text-center my-2">
                    <scale-loader color="#34558b" />
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell()="data">
                <span v-b-tooltip.hover :title="data.value">{{ data.value }}</span>
            </template>
            <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
                <slot :name="slotName" v-bind="slotScope"></slot>
            </template>
        </b-table>
        <b-pagination @click.native="changePage" v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
            :disabled="isBusy" align="right" limit="7" aria-controls="CustomTable" />
    </div>
</template>

<script>
    export default {
        name: 'CustomTable',
        props: {
            fields: Array,
            datas: Array,
            queryRows: Number,
            totalRows: Number,
            isSelectAll: Boolean,
            isBusy: {
                type: Boolean,
                default: false
            },
            isSelectable: {
                type: Boolean,
                default: false,
            },
            selectMode: {
                type: String,
                default: 'multi'
            },
            perPage: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                currentPage: 1,
                selected: []
            }
        },
        beforeUpdate() {
            // const currentRows = ((this.currentPage - 1) * this.perPage);
            // if (currentRows >= this.queryRows && !this.isBusy) {
            //     this.$emit("dataRequire", currentRows, this.perPage);
            // }
            // if (!this.isBusy) {
            //     this.$emit("dataRequire", currentRows, this.perPage);
            // }
        },
        methods: {
            changePage() {
                const currentRows = ((this.currentPage - 1) * this.perPage);
                if (!this.isBusy) {
                    this.$emit("dataRequire", currentRows, this.perPage);
                }
                this.currentPage = 1;
            },
            onRowSelected(items) {
                this.selected = items;
                this.$emit("rowSelected", this.selected);
            },
            onRowClick(items, index) {
                this.$emit("rowClick", items, index);
            },
            toFirstPage() {
                this.currentPage = 1;
            }
        },
        watch: {
            isSelectAll() {
                if (this.isSelectAll == true) {
                    this.$refs.selectableTable.selectAllRows();
                }
                if (this.isSelectAll == false) {
                    this.$refs.selectableTable.clearSelected();
                }
            },
            // currentPage() {
            //     const currentRows = ((this.currentPage - 1) * this.perPage);
            //     if (!this.isBusy) {
            //         this.$emit("dataRequire", currentRows, this.perPage);
            //     }
            //     this.currentPage = 1;
            // }
        },

    }
</script>

<style>
    #custom-table {
        text-align: left;
        white-space: nowrap;
        border: 1px solid #e3e6f0;
    }

    #custom-table th {
        color: #858796;
    }

    #custom-table td {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }

    @media (max-width: 767px) {
        #custom-table td {
            max-width: 100px;
        }
    }
</style>