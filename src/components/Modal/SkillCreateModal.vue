<template>
    <div>
        <SimpleModal @onSaveClick="onSaveClick" title="新增技能" @resetModal="clearModalData" :id="id"
            :isLoading="isLoading" :formErrorMessage="formErrorMessage">
            <template #modal-body>
                <b-form>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*技能編號: ">
                        <b-input v-model.trim="skill.id" @update="idValidate" :state="inputState[0]" maxlength="10" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*技能描述: ">
                        <b-input v-model="skill.description" @update="descriptionValidate" :state="inputState[1]" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*啟用: ">
                        <b-form-select v-model="skill.active" :state="true">
                            <option value="0">停用</option>
                            <option value="1">啟用</option>
                        </b-form-select>
                    </b-form-group>
                </b-form>
            </template>
        </SimpleModal>
    </div>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-sdk'

    export default {
        name: 'SkillCreateModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Skill-Create-Modal'
            }
        },
        data() {
            return {
                isLoading: false,
                skill: {
                    id: '',
                    description: '',
                    active: 1
                },
                inputState: [null, null],
                formErrorMessage: ''
            }
        },
        methods: {
            idValidate() {
                const regex = /^TM-[A-Z]{1}[0-9]{4}00$/;
                this.inputState[0] = regex.test(this.skill.id);
            },
            descriptionValidate() {
                this.inputState[1] = (this.skill.description !== '');
            },
            async onSaveClick() {
                if (this.inputState[0] && this.inputState[1]) {
                    this.isLoading = true;
                    try {
                        await tigermaster.services.Skill.create(this.skill);
                        this.$bvModal.hide(this.id);
                        this.$emit("finish");
                    } catch (e) {
                        this.formErrorMessage = '創建失敗';
                    } finally {
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMessage = '有些資料不符合規定';
                }
            },
            clearModalData() {
                this.skill = {
                    id: '',
                    description: '',
                    active: 1
                };
                this.formErrorMessage = '';
                this.skillInputState = [null, null];
                this.isLoading = false;
            }
        }
    }
</script>

<style>
    .Skill-Create-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>