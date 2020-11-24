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
                                    :fields="fields"
                                    :datas="data"
                                    :isBusy="tableBusy"
                                    @dataRequire="onDataRequire"
                                >
                                <template #cell(id)="data">
                                    <router-link :to="`/home/client_detail?userId=${data.value}`">{{ data.value }}</router-link>
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
import UserTableModel from '@/model/UserTable.json'

export default {
    name: "Client",
    components: {
        TitledCard,
        CustomTable
    },
    data(){
        return {
            fields: UserTableModel,
            data: [
                { id: "202011240001", phone: "0975555319", name: "陳柏瑞", address:"新北市永和區文化路67巷3弄10號", l1:"水電服務", l2:"水電服務", l3:"水電服務", createDate:"2020/11/24 09:57", star:"3" }
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