<template>
    <TitledCard title="VIP權限管理">
        <b-row class="m-3">
            <div v-for="(digit,index) in binary" :key="index">
                <b-form-checkbox class="m-2" @change="show(index)" :checked="digit === '1'">
                    {{privilegeMap[index]}}
                </b-form-checkbox>
            </div>
        </b-row>
        <b-row class="m-3">
            <b-button variant="success" class="ml-auto" v-if="hasBeenEdited" @click="finishEdit">儲存</b-button>
        </b-row>
    </TitledCard>
</template>

<script>
    import PrivilegeMap from '@/model/Mapping/PrivilegeMap.js'
    import ToggleBits from '@/model/Bitwise/ToggleBit.js'
    import TitledCard from '../Card/TitledCard.vue'

    export default {
        components: {
            TitledCard
        },
        name: "TogglePrivilege",
        props: {
            privilege: {
                type: Number
            },
            user: {
                type: Object
            }
        },
        data() {
            return {
                privilegeMap: PrivilegeMap(),
                binary: String,
                resultNum: Number
            }
        },
        created() {
            this.parseToBinary()
        },
        methods: {
            show(index) {
                this.toggleDigit(index)
            },
            toggleDigit(index) {
                let result = ToggleBits(this.binary, index)
                this.resultNum = result[0]
                this.binary = result[1]
            },
            async finishEdit() {
                await this.user.update({
                    defaultOrderProcedure: this.resultNum
                })
            },
            parseToBinary() {
                this.binary = this.privilege.toString(2)
            }
        },
        computed: {
            hasBeenEdited() {
                return this.resultNum !== this.privilege
            }
        }
    }
</script>