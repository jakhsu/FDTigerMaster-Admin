<template>
    <SimpleModal :id="id" :isLoading="isLoading" @onSaveClick="addSkill" title="新增/移除技能" @modalHidden="clearModalData"
        :formErrorMessage="formErrorMessage">
        <template #modal-body>
            <b-form>
                <b-tags size="lg" v-model="skillList" tag-variant="success" :tag-validator="tagValidator"
                    @tag-state="onTagState">
                    <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                        <b-input-group class="mb-2">
                            <b-form-input v-bind="inputAttrs" v-on="inputHandlers" placeholder="新增技能編號"
                                class="form-control" list="Available-Skills"></b-form-input>
                            <datalist id="Available-Skills">
                                <option v-for="(option, index) in options" :key="index" :value="option">
                                    {{ optionTexts[index] }}
                                </option>
                            </datalist>
                            <b-input-group-append>
                                <b-button @click="addTag()" variant="primary" :disabled="invalidInput !== undefined">新增
                                </b-button>
                            </b-input-group-append>
                            <b-form-invalid-feedback :state="invalidInput === undefined">
                                {{ `錯誤或重複的技能編號: ${invalidInput}` }}
                            </b-form-invalid-feedback>
                        </b-input-group>
                        <div class="d-inline-block" style="font-size: 1.5rem;">
                            <b-form-tag v-for="tag in tags" @remove="removeTag(tag)" :key="tag" :title="tag"
                                :variant="tagVariant" class="mr-1">{{ tag }}</b-form-tag>
                        </div>
                    </template>
                </b-tags>
            </b-form>
        </template>
    </SimpleModal>
</template>

<script>
    import SimpleModal from '@/components/Modal/SimpleModal.vue'

    import tigermaster from 'fdtigermaster-admin-sdk'

    export default {
        name: 'DeactivateModal',
        components: {
            SimpleModal
        },
        props: {
            id: {
                type: String,
                default: 'Master-Skill-Create-Modal'
            },
            existSkill: Array,
            currentUser: Object
        },
        data() {
            return {
                isLoading: true,
                skillList: this.existSkill,
                options: [],
                optionTexts: [],
                formErrorMessage: '',
                invalidInput: undefined
            }
        },
        async created() {
            this.options = [];
            this.optionTexts = [];
            const skillItems = await tigermaster.database.query('skill_item').where('skill_item.active', '!=', 0)
                .get();
            skillItems.data.forEach((skill) => {
                this.options.push(skill.id);
                this.optionTexts.push(skill.description);
            });
            this.isLoading = false;
        },
        methods: {
            async addSkill() {
                this.isLoading = true;
                try {
                    const skillStr = this.skillList.join(',');
                    await this.currentUser.update({
                        master: {
                            id: this.currentUser.data.master.id,
                            skillItems: skillStr
                        }
                    });
                    this.$bvModal.hide(this.id);
                    this.$emit('finish');
                } catch (e) {
                    this.formErrorMessage = '新增失敗';
                } finally {
                    this.isLoading = false;
                }
            },
            tagValidator(tag) {
                return this.options.includes(tag);
            },
            clearModalData() {
                this.isLoading = false;
                this.invalidInput = undefined;
                this.skillList = [];
                this.formErrorMessage = '';
            },
            onTagState(valid, invalid, duplicate) {
                this.invalidInput = invalid[0] || duplicate[0];
            }
        }
    }
</script>