<template>
    <form>
        <div v-for="step in steps" :key="step.id" class="py-3">
            <slot name="header" :step="step">
            </slot>
            <slot :name="`content_${step.id}`">
            </slot>
        </div>
    </form>
</template>

<script>
    // import SimpleCard from '@/components/Card/SimpleCard.vue'
    // import CustomTable from '@/components/Table/CustomTable.vue'
    // import BroadcastTableModel from '@/config/BroadcastTable.json'
    // import BroadcastSearch from '@/components/Broadcast/BroadcastSearch.vue'

    // import tigermaster from 'fdtigermaster-admin-sdk'
    // import BroadcastConfirm from '@/components/Broadcast/BroadcastConfirm.vue'

    export default {
        name: "multi-step-form",
        components: {
            // SimpleCard,
            // CustomTable,
            // BroadcastSearch,
            // BroadcastConfirm
        },
        props: {
            steps: Array
        },
        methods: {

        }
    }
</script>

<style scoped>
    #Broadcast {
        max-width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #Broadcast .Broadcast-Area {
        padding: 0px 50px;
    }

    #Broadcast .Broadcast-Area .Broadcast-Header {
        margin: 25px 0px;
        text-align: left;
        color: #000;
    }

    #Broadcast .Broadcast-Area .Broadcast-Body {
        margin: 25px 0px;
        padding: 0px 20px;
    }

    #Broadcast .Broadcast-Collapse-Toggle {
        color: #000000;
        font-size: 20px;
    }

    #Broadcast .Broadcast-Collapse-Toggle .Collapse-Index {
        color: #ffffff;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
        font-size: 12px;
        background-color: #757575;
    }

    #Broadcast .Broadcast-Collapse-Toggle .Collapse-Index.finished {
        background-color: #007bff;
    }

    #Broadcast .Broadcast-Collapse {
        margin-left: 12px;
    }

    .left-border {
        border-left: 2px solid #e2e2e2;
    }

    @media (max-width: 768px) {
        #Broadcast .Broadcast-Area {
            padding: 0px;
        }
    }
</style>