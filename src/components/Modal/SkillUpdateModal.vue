<template>
    <div>
        <SimpleModal @onSaveClick="onSaveClick" title="修改技能" @resetModal="clearModalData" :id="id"
            :isLoading="isLoading" :formErrorMessage="formErrorMessage">
            <template #modal-body>
                <b-form>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*技能編號: ">
                        <b-input v-model.trim="skill.id" disabled />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*技能描述: ">
                        <b-input v-model="skill.description" :state="descriptionInputState"
                            @update="descriptionValidate" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="*啟用: ">
                        <b-select v-model="skill.active" :state="true">
                            <option value="0">停用</option>
                            <option value="1">啟用</option>
                        </b-select>
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
        name: 'SkillUpdateModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Skill-Modify-Modal'
            },
            initSkillContent: Object
        },
        data() {
            return {
                isLoading: false,
                descriptionInputState: true,
                skill: this.initSkillContent,
                formErrorMessage: ''
            }
        },
        methods: {
            descriptionValidate() {
                this.descriptionInputState = (this.skill.description !== '');
            },
            async onSaveClick() {
                if (this.descriptionInputState) {
                    this.isLoading = true;
                    try {
                        await tigermaster.services.Skill.update(this.skill);
                        this.$bvModal.hide(this.id);
                        this.$emit("finish");
                    } catch (e) {
                        this.formErrorMessage = '更新失敗';
                    } finally {
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMessage = '有些資料不符合規定';
                }
            },
            clearModalData() {
                this.formErrorMessage = '';
                this.descriptionInputState = true;
                this.isLoading = false;
            }
        },
        watch: {
            initSkillContent() {
                this.skill = this.initSkillContent;
            }
        }
    }
</script>

<style>
    .Skill-Modify-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>