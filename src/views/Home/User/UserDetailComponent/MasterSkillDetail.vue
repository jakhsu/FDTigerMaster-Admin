<template>
    <div id="MasterSkillDetail">
        <b-container fluid>
            <b-row>
                <b-col lg='12' md='12'>
                    <TitledCard title="師傅技能:">
                        <div class="skilltable">
                            <b-table class="skilltable" sticky-header :items="items">
                            </b-table>
                            <b-input-group>
                            </b-input-group>
                        </div>
                        <div class="downloadarea">
                            <b-button class="mr-1">下載</b-button>
                            <b-button class="mr-1">上傳</b-button>
                        </div>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: "MasterSkillDetail",
        components: {
            TitledCard,
        },
        props: {
            user: Object
        },
        data() {
            return {
                items: [{
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                    {
                        技能編號: "TH-W0101",
                        技能敘述: "排水溝清理"
                    },
                ]
            }
        },
    }
</script>