<template>
    <TitledCard :title="title">
        <div v-for="(step, index) in steps" :key="index" class="py-3">
            <b-button class="indexBtn d-flex align-items-center" :class="stepState[index] === true ? 'finished' : null"
                @click=" toggleCollapse(index)">
                {{index}}
            </b-button>
            <b-collapse v-model="display[index]">
                <slot :name="`step_${index+1}`" @finish="finish(data)">
                    {{step}}
                </slot>
                <b-button @click="next(index)">
                    next
                </b-button>
            </b-collapse>
        </div>
    </TitledCard>

</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'
    export default {
        name: "multi-step-form",
        components: {
            TitledCard
        },
        props: {
            steps: Number,
            title: {
                type: String,
                default: 'multi-step-form'
            }
        },
        created() {
            this.initilize()
        },
        data() {
            return {
                display: [],
                stepState: []
            }
        },
        methods: {
            initilize() {
                console.log('init display...')
                for (let i = 0; i < this.steps.length; i++) {
                    this.display.push(false)
                    this.stepState.push(false)
                }
                this.display[0] = true
            },
            toggleCollapse(index) {
                this.display.splice(index, 1, !this.display[index])
            },
            next(index) {
                console.log(index)
                this.stepState.splice(index, 1, true)
                this.display.fill(false)
                this.display.splice(index + 1, 1, true)
            },
            finish(e) {
                console.log(e)
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .indexBtn {
        border-radius: 100%;
        font-size: 5px;
    }

    .indexBtn.finished {
        background-color: #007bff;
        border-color: transparent;
    }
</style>