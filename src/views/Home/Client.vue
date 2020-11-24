<template>
    <div id="Client">
        <b-container fluid>
            <div class="Client-Area">
                <b-row>
                    <b-col>
                        <div class="Client-Header">
                            <h2>Client</h2>
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <TitledCard title="Client List">
                            <div class="Client-Table">
                                <CustomTable
                                    :queryRows="20"
                                    :totalRows="100"
                                    :header="header"
                                    :data="data"
                                    :isBusy="tableBusy"
                                    @dataRequire="onDataRequire"
                                >
                                <template #cell(id)="data">
                                    <router-link :to="`/home/client_detail?userId=${data.value.replace(/[^a-z]+/i,'-').toLowerCase()}`">{{ data.value }}</router-link>
                                </template>
                                </CustomTable>
                            </div>
                        </TitledCard>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </div>
</template>

<script>
import TitledCard from '@/components/Card/TitledCard.vue'
import CustomTable from '@/components/Table/CustomTable.vue'

export default {
    name: "Client",
    components: {
        TitledCard,
        CustomTable
    },
    data(){
        return {
            header: ["id", "Phone", "Name", "Address", "L1", "L2", "L3"],
            data: [
                { id: "202011240001", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" },
                { id: "202011240002", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" },
                { id: "202011240003", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" },
                { id: "202011240004", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" },
                { id: "202011240005", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" },
                { id: "202011240006", Phone: "0975555319", Name: "陳柏瑞", Address:"台北", L1:"水電服務", L2:"水電服務", L3:"水電服務" }
            ],
            tableBusy: false
        }
    },
    methods:{
        onDataRequire(currentRows){
            console.log(currentRows);
            this.tableBusy = true;
        }
    }
}
</script>

<style scoped>
#Client {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#Client .Client-Area{
    padding: 0px 50px;
}

#Client .Client-Area .Client-Header{
    margin: 25px 0px;
    text-align: left;
    color: #000;
}

@media (max-width: 768px) {
    #Client .Client-Area{
        padding: 0px;
    }
}
</style>