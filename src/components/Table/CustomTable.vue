<template>
<div>
    <b-table
        id="CustomTable"
        :items="datas" 
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        :busy="isBusy"
        bordered
        responsive
        foot-clone
        hover
    >
        <template #table-busy>
            <div class="text-center my-2">
                <scale-loader color="#34558b"/>
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
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      :disabled="isBusy"
      align="right"
      limit="7"
      aria-controls="CustomTable"
    ></b-pagination>
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
        isBusy:{
            type: Boolean,
            default: false
        }, 
    },
    data(){
        return{
            perPage: 10,
            currentPage: 1
        }
    },
    beforeUpdate(){
        const currentRows = ((this.currentPage-1) * this.perPage) +1;
        if(currentRows > this.queryRows && !this.isBusy){
            this.$emit("dataRequire", currentRows);
        }
    }
}
</script>

<style>
#CustomTable{
    text-align: left;
    white-space: nowrap;
    border: 1px solid #e3e6f0;
}

#CustomTable th{
    color: #858796;
}

#CustomTable td{
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

@media (max-width: 767px){
    #CustomTable td{
        max-width: 100px;
    }
}
</style>