<template>
    <div id="MasterSkillDetail">
        <b-container fluid>
            <b-row>
                <TitledCard title="師傅技能:">
                </TitledCard>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: "MasterSkillDetail",
        components: {
            TitledCard
        },
        props: {
            user: Object
        }
    }
</script>