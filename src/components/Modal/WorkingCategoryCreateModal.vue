<template>
    <SimpleModal size='xl' @onSaveClick="onCreateClick" title="新增工項" @resetModal="clearModalData"
        :id="id" :isLoading="isLoading" :formErrorMessage="formErrorMessage">
        <template #modal-body>
            <b-form>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項編號: ">
                    <b-input v-model="workingCategory.id" @update="idValidate(workingCategory.id)"
                        :state="inputState[0]" maxlength="10" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="工項描述: ">
                    <b-input v-model="workingCategory.description" :state="inputState[1]"
                        @update="notEmptyValidate(workingCategory.description, 1)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="啟用: ">
                    <b-select v-model="workingCategory.active" :state="true">
                        <option value="0">停用</option>
                        <option value="1">啟用</option>
                    </b-select>
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="特殊訂單: ">
                    <b-select v-model="workingCategory.isForSpecialOrder" :state="true">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </b-select>
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="企業保固(日): ">
                    <b-form-input v-model.number="workingCategory.commercialWarrantyDay" :state="inputState[2]"
                        @update="numberValidate(workingCategory.commercialWarrantyDay, 2)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="一般消費者保固(日): ">
                    <b-form-input v-model.number="workingCategory.consumerWarrantyDay" :state="inputState[3]"
                        @update="numberValidate(workingCategory.consumerWarrantyDay, 3)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="最高價格: ">
                    <b-form-input v-model="workingCategory.maxPrice" :state="inputState[4]"
                        @update="numberValidate(workingCategory.maxPrice, 4)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="最高價格比例(%): ">
                    <b-form-input v-model="workingCategory.maxPricePercentage" :state="inputState[5]"
                        @update="numberValidate(workingCategory.maxPricePercentage, 5)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="最低價格: ">
                    <b-form-input v-model="workingCategory.minPrice" :state="inputState[6]"
                        @update="numberValidate(workingCategory.minPrice, 6)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="最低價格比例(%): ">
                    <b-form-input v-model="workingCategory.minPricePercentage" :state="inputState[7]"
                        @update="numberValidate(workingCategory.minPricePercentage, 7)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="價格說明: ">
                    <b-form-input v-model="workingCategory.priceRangeDescription" :state="inputState[8]"
                        @update="notEmptyValidate(workingCategory.priceRangeDescription, 8)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="保固說明: ">
                    <b-form-input v-model="workingCategory.warrantyDescription" :state="inputState[9]"
                        @update="notEmptyValidate(workingCategory.warrantyDescription, 9)" />
                </b-form-group>
            </b-form>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'WorkingCategoryCreateModal',
        components:{
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: "WorkingCategory-Create-Modal"
            }
        },
        data(){
            return {
                isLoading: false,
                workingCategory: {active: 1, isForSpecialOrder: 0},
                inputState: [null, null, null, null, null, null, null, null, null, null],
                formErrorMessage: ''
            }
        },
        methods:{
            async onCreateClick(){
                if(this.inputState.every((element) => element === true)){
                    this.isLoading = true;
                    try{
                        const workingCategory = tigermaster.services.WorkingCategory;
                        await workingCategory.create(this.workingCategory);
                        this.$bvModal.hide(this.id);
                        this.$emit('finish');
                    }catch(e){
                        this.formErrorMessage = '建立失敗';
                    }finally{
                        this.isLoading = false;
                    }
                }else{
                    this.formErrorMessage = '部分資料不符合規定';
                }
            },
            clearModalData(){
                this.workingCategory = {active: 1, isForSpecialOrder: 0},
                this.inputState = [null, null, null, null, null, null, null, null, null, null];
                this.formErrorMessage = '';
            },
            idValidate(id) {
                const regex = /^TM-[A-Z]{1}[0-9]{4}[0-9]{2}(?<!00)$/;
                this.inputState[0] = regex.test(id);
            },
            notEmptyValidate(input, index) {
                this.inputState[index] = (input !== '');
            },
            numberValidate(input, index) {
                this.inputState[index] = (!isNaN(input) && input !== '');
            }
        }
    }
</script>