<template>
    <div>
        <b-modal :size="size" :id="id" @show="resetModal" :title="title">
            <scale-loader v-if="isLoading" />
            <b-form v-else>
                <b-card>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能編號: ">
                        <b-input v-model="skillToBeAdded.id" @update="skillIdValidate(skillToBeAdded.id)"
                            :state="skillInputState[0]" maxlength="10" />
                    </b-form-group>
                    <b-form-group label-align-sm="right" label-cols="3" label-cols-xl="2" label="技能描述: ">
                        <b-input v-model="skillToBeAdded.description"
                            @update="skillDescriptionValidate(skillToBeAdded.description)"
                            :state="skillInputState[1]" />
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
        name: 'SkillCreateModal',
        components: {},
        props: {
            id: {
                type: String,
                default: 'SkillCreateModal'
            },
            title: {
                type: String,
                default: 'Skill Create Modal'
            },
            size: {
                type: String,
                default: 'lg'
            }
        },
        data() {
            return {
                isLoading: false,
                skillToBeAdded: {
                    id: '',
                    description: '',
                },
                skillInputState: [true, null],
                formErrorMesssage: '',
            }
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
                        await skill.create({
                            id: this.skillToBeAdded.id,
                            description: this.skillToBeAdded.description,
                            active: 1
                        })
                        this.$emit("isCreateSuccess", true)
                    } catch (e) {
                        this.formErrorMesssage = '創建失敗';
                    } finally {
                        this.$bvModal.hide(this.id)
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMesssage = '有些資料不符合規定';
                }
            },
            resetModal() {
                this.skillToBeAdded = {};
                this.formErrorMesssage = '';
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