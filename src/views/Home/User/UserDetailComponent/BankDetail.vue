<template>
    <div id="bankDetail">
        <b-container fluid>
            <b-row>
                <b-col lg="12" md="12">
                    <TitledCard title="銀行資料">
                        <b-form>
                            <b-form-group label-cols="3" label-cols-xl="2" label="銀行帳號: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-cols="3" label-cols-xl="2" label="某些資料: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-cols="3" label-cols-xl="2" label="某些資料: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-cols="3" label-cols-xl="2" label="某些資料: ">
                                <b-form-input disabled />
                            </b-form-group>
                            <b-form-group label-cols="3" label-cols-xl="2" label="某些資料: ">
                                <b-form-input disabled />
                            </b-form-group>
                        </b-form>
                    </TitledCard>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import TitledCard from '@/components/Card/TitledCard.vue'

    export default {
        name: "BankDetail",
        components: {
            TitledCard,
        }
    }
</script>