<template>
    <div>
        <b-table id="custom-table" 
        ref="broadcastTable"
        :items="datas" 
        :fields="fields" 
        :per-page="perPage" 
        :current-page="currentPage"
        :busy="isBusy" 
        bordered responsive foot-clone hover 
        selectable 
        :select-mode="selectMode"
        @row-selected="onRowSelected">
            <b-button>hello</b-button>
            <template #table-busy>
                <div class="text-center my-2">
                    <scale-loader color="#34558b" />
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell()="data">
                <span v-b-tooltip.hover :title=data.value>{{ data.value }}</span>
            </template>
            <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
                <slot :name="slotName" v-bind="slotScope"></slot>
            </template>
        </b-table>
        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" :disabled="isBusy" align="right"
            limit="7" aria-controls="CustomTable" />
    </div>
</template>

<script>
    export default {
        name: 'BroadcastTable',
        props: {
            fields: Array,
            datas: Array,
            queryRows: Number,
            totalRows: Number,
            isBusy: {
                type: Boolean,
                default: false
            },
            isSelectAll: {
            }
        },
        methods: {
            onRowSelected(items) {
                this.selected = items
            }
        },
        data() {
            return {
                perPage: 10,
                currentPage: 1,
                selected:[],
                selectMode: 'multi'
            }
        },
        beforeUpdate() {
            const currentRows = ((this.currentPage - 1) * this.perPage) + 1;
            if (currentRows > this.queryRows && !this.isBusy) {
                this.$emit("dataRequire", currentRows);
            }
        },
        watch: {
            isSelectAll: function () {
                if (this.isSelectAll == true) {
                    this.$refs.broadcastTable.selectAllRows()
                }
                if (this.isSelectAll == false) {
                     this.$refs.broadcastTable.clearSelected()
                }
            }
        }
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