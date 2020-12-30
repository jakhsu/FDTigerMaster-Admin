<template>
    <div>
        <b-modal :size="size" :id="id" @show="resetModal" :title="title">
            <scale-loader v-if="isLoading" />
            <b-form v-else>
                <b-card>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                        <b-input v-model="skillToBeEdited.id" @update="skillIdValidate(skillToBeEdited.id)"
                            :state="skillInputState[0]" maxlength="10" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能描述: ">
                        <b-input v-model="skillToBeEdited.description" :state="skillInputState[1]"
                            @update="skillDescriptionValidate(skillToBeEdited.description)" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="啟用: ">
                        <b-select v-model="skillToBeEdited.active">
                            <option value="0">停用</option>
                            <option value="1">啟用</option>
                        </b-select>
                    </b-form-group>
                </b-card>
            </b-form>
            <template #modal-footer="{cancel}">
                <span class="Skill-Create-Error" v-if="formErrorMesssage !== ''">{{ formErrorMesssage }}</span>
                <slot name="modal-button"></slot>
                <b-button class="ml-auto" variant="outline-secondary" @click="cancel">
                    取消
                </b-button>
                <b-button variant="primary" @click="onSaveClick">
                    確認
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import IdValidator from '@/model/InputValidators/IdValidator.js'
    import tigermaster from 'fdtigermaster-sdk'
    const inputIndex = Object.freeze({
        skillId: 0,
        skillDescription: 1
    });
    export default {
        name: 'SkillModifyModal',
        components: {},
        props: {
            id: {
                type: String,
                default: 'SkillModifyModal'
            },
            title: {
                type: String,
                default: 'Skill Modify Modal'
            },
            size: {
                type: String,
                default: 'lg'
            },
            skillToBeEdited: {
                type: Object
            }
        },
        data() {
            return {
                isLoading: false,
                skillInputState: [null, null],
                formErrorMesssage: '',
            }
        },
        beforeUpdate() {
            this.skillIdValidate(this.skillToBeEdited.id);
        },
        methods: {
            skillIdValidate(id) {
                this.skillInputState[inputIndex["skillId"]] = IdValidator("skillId", id);
            },
            skillDescriptionValidate(input) {
                this.skillInputState[inputIndex["skillDescription"]] = input !== '';
            },
            async onSaveClick() {
                if (this.skillInputState[0] && this.skillInputState[1]) {
                    this.isLoading = true;
                    try {
                        const skill = tigermaster.services.Skill;
                        await skill.update({
                            id: this.skillToBeEdited.id,
                            description: this.skillToBeEdited.description,
                            active: this.skillToBeEdited.active
                        })
                        this.$emit("isModifySuccess", true)
                    } catch (e) {
                        this.formErrorMesssage = '修改失敗';
                    } finally {
                        this.$bvModal.hide(this.id)
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMesssage = '有些資料不符合規定';
                }
            },
            resetModal() {
                this.formErrorMesssage = '';
                this.skillInputState = [null, null];
                this.isLoading = false;
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