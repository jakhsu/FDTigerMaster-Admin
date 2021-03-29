<template>
    <SimpleModal size='xl' @onSaveClick="onUpdateClick" title="新增工項" @resetModal="clearModalData" :id="id"
        :isLoading="isLoading" :formErrorMessage="formErrorMessage">
        <template #modal-body>
            <b-form>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*工項編號: ">
                    <b-input v-model.trim="workingCategory.id" disabled />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*工項描述: ">
                    <b-input v-model="workingCategory.description" :state="inputState[0]"
                        @update="notEmptyValidate(workingCategory.description, 0)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*啟用: ">
                    <b-select v-model="workingCategory.active" :state="true">
                        <option value="0">停用</option>
                        <option value="1">啟用</option>
                    </b-select>
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*特殊訂單: ">
                    <b-input v-model="workingCategory.isForSpecialOrder" :state="true" disabled></b-input>
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*企業保固(日): ">
                    <b-form-input v-model.number.trim="workingCategory.commercialWarrantyDay" :state="inputState[1]"
                        @update="numberValidate(workingCategory.commercialWarrantyDay, 1)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*一般消費者保固(日): ">
                    <b-form-input v-model.number.trim="workingCategory.consumerWarrantyDay" :state="inputState[2]"
                        @update="numberValidate(workingCategory.consumerWarrantyDay, 2)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*最高價格: ">
                    <b-form-input v-model.number.trim="workingCategory.maxPrice" :state="inputState[3]"
                        @update="numberValidate(workingCategory.maxPrice, 3)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*最高價格比例(%): ">
                    <b-form-input v-model.number.trim="workingCategory.maxPricePercentage" :state="inputState[4]"
                        @update="numberValidate(workingCategory.maxPricePercentage, 4)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*最低價格: ">
                    <b-form-input v-model.number.trim="workingCategory.minPrice" :state="inputState[5]"
                        @update="numberValidate(workingCategory.minPrice, 5)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*最低價格比例(%): ">
                    <b-form-input v-model.number.trim="workingCategory.minPricePercentage" :state="inputState[6]"
                        @update="numberValidate(workingCategory.minPricePercentage, 6)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*價格說明: ">
                    <b-form-input v-model="workingCategory.priceRangeDescription" :state="inputState[7]"
                        @update="notEmptyValidate(workingCategory.priceRangeDescription, 7)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*保固說明: ">
                    <b-form-input v-model="workingCategory.warrantyDescription" :state="inputState[8]"
                        @update="notEmptyValidate(workingCategory.warrantyDescription, 8)" />
                </b-form-group>
                <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*對應技能編號: ">
                    <b-form-input v-model="workingCategory.skillItemId" disabled />
                </b-form-group>
            </b-form>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'WorkingCategoryUpdateModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: "WorkingCategory-Update-Modal"
            },
            initWorkingCategoryContent: Object
        },
        data() {
            return {
                isLoading: false,
                workingCategory: this.initWorkingCategoryContent,
                inputState: [true, true, true, true, true, true, true, true, true],
                formErrorMessage: ''
            }
        },
        methods: {
            async onUpdateClick() {
                if (this.inputState.every((element) => element === true)) {
                    this.isLoading = true;
                    const workingCategoryToBeUpdated = {
                        id: this.workingCategory.id,
                        description: this.workingCategory.description,
                        maxPrice: this.workingCategory.maxPrice,
                        minPrice: this.workingCategory.minPrice,
                        maxPricePercentage: this.workingCategory.maxPricePercentage,
                        minPricePercentage: this.workingCategory.minPricePercentage,
                        priceRangeDescription: this.workingCategory.priceRangeDescription,
                        consumerWarrantyDay: this.workingCategory.consumerWarrantyDay,
                        commercialWarrantyDay: this.workingCategory.commercialWarrantyDay,
                        warrantyDescription: this.workingCategory.warrantyDescription,
                        active: this.workingCategory.active
                    };
                    try {
                        const workingCategory = tigermaster.services.WorkingCategory;
                        await workingCategory.update(workingCategoryToBeUpdated);
                        this.$bvModal.hide(this.id);
                        this.$emit('finish');
                    } catch (e) {
                        this.formErrorMessage = '更新失敗';
                    } finally {
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMessage = '部分資料不符合規定';
                }
            },
            clearModalData() {
                this.workingCategory = JSON.parse(JSON.stringify(this.initWorkingCategoryContent));
                this.inputState = [true, true, true, true, true, true, true, true, true];
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
        },
        watch: {
            initWorkingCategoryContent() {
                this.workingCategory = JSON.parse(JSON.stringify(this.initWorkingCategoryContent));
            }
        }
    }
</script>