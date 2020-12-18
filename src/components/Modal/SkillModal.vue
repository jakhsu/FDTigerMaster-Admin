<template>
    <b-modal :id="id" @show="resetModal" :title="title">
        <b-form>
            <b-form-row>
                <b-col lg="6" md="12">
                    <b-form-group label="技能編號">
                        <b-form-input v-model="skill.id" :state="inputState[inputIndex.id]" type="text"
                            placeholder="輸入編號..." @update="idValidate" maxlength='10' />
                    </b-form-group>
                </b-col>
                <b-col lg="6" md="12">
                    <b-form-group label="技能描述">
                        <b-form-input v-model="skill.description" :state="inputState[inputIndex.description]"
                            placeholder="輸入描述..." @update="descriptionValidate" />
                    </b-form-group>
                </b-col>
            </b-form-row>
        </b-form>
        <template #modal-footer="{ cancel }">
            <span class="Skill-Modal-Error" v-if="formError">有些資料不符合規定</span>
            <b-button variant="outline-danger" @click="cancel">
                取消
            </b-button>
            <b-button variant="primary" @click="onSaveClick">
                確認
            </b-button>
        </template>
    </b-modal>
</template>

<script>
    const inputIndex = Object.freeze({
        id: 0,
        description: 1,
    });
    export default {
        name: 'SkillModal',
        props: {
            title: {
                type: String,
            },
            id: {
                type: String,
                default: 'User-Create-Modal'
            },
            defaultRole: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                inputIndex,
                skill: {
                    id: '',
                    description: '',
                },
                inputState: [null, null],
                formError: false
            }
        },
        methods: {
            idValidate() {
                var idRegex = /^TM-[A-Z]{1}[0-9]{4}00$/;
                this.inputState[this.inputIndex.id] = idRegex.test(this.skill.id);
            },
            descriptionValidate() {
                this.inputState[this.inputIndex.description] = this.skill.description !== '';
            },
            resetModal() {
                this.skill = {
                    id: '',
                    description: '',
                };
                this.formError = false;
                this.inputState = [];
            },
            onSaveClick() {
                if (this.inputState[0] && this.inputState[1]) {
                    this.$emit('onSaveClick', this.skill);
                    this.$bvModal.hide(this.id);
                    this.inputState = [];
                } else {
                    this.formError = true;
                    this.inputState = [];
                }
            },
        },
        computed: {}
    }
</script>

<style>
    .Skill-Modal-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>