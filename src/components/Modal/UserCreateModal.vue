<template>
    <b-modal :id="id" @show="resetModal" title="創建用戶">
        <scale-loader v-if="isLoading" />
        <b-form v-else>
            <b-form-row>
                <b-col lg="6" md="12">
                    <b-form-group label="電話">
                        <b-form-input v-model="newUser.phone" :state="inputState[inputIndex.phone]" type="text"
                            placeholder="輸入電話..." @update="phoneValidate" maxlength='10' />
                    </b-form-group>
                </b-col>
                <b-col lg="6" md="12">
                    <b-form-group label="姓名">
                        <b-form-input v-model="newUser.name" :state="inputState[inputIndex.name]" placeholder="輸入姓名..."
                            @update="nameValidate" />
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group label="Email">
                <b-form-input v-model="newUser.email" :state="inputState[inputIndex.email]" placeholder="輸入Email..."
                    @update="emailValidate" />
            </b-form-group>
            <b-form-group label="角色">
                <b-form-select v-model="newUser.roleId" :options="UserRole" :state="inputState[inputIndex.role]"
                    @input="roleValidate" />
            </b-form-group>
        </b-form>
        <template #modal-footer="{ cancel }">
            <span class="User-Create-Error" v-if="formErrorMesssage !== ''">{{ formErrorMesssage }}</span>
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
    import UserRole from '@/config/UserRole.json'

    import tigermaster from 'fdtigermaster-sdk'

    const inputIndex = Object.freeze({
        phone: 0,
        name: 1,
        email: 2,
        role: 3
    });
    export default {
        name: 'UserCreateModal',
        props: {
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
                UserRole,
                inputIndex,
                newUser: {
                    phone: '',
                    name: '',
                    email: '',
                    roleId: this.defaultRole
                },
                inputState: [null, null, null, null],
                formErrorMesssage: '',
                isLoading: false
            }
        },
        methods: {
            phoneValidate() {
                var phoneRegex = /^09[0-9]{8}$/;
                this.inputState[this.inputIndex.phone] = phoneRegex.test(this.newUser.phone);
            },
            nameValidate() {
                this.inputState[this.inputIndex.name] = this.newUser.name !== '';
            },
            emailValidate() {
                var emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
                this.inputState[this.inputIndex.email] = emailRegex.test(this.newUser.email);
            },
            roleValidate() {
                this.inputState[this.inputIndex.role] = this.newUser.roleId !== null;
            },
            resetModal() {
                this.newUser = {
                    phone: '',
                    name: '',
                    email: '',
                    roleId: this.defaultRole
                };
                this.formErrorMesssage = '';
                this.roleValidate();
                this.inputState = [null, null, null, this.defaultRole !== null];
                this.isLoading = false;
            },
            async onSaveClick() {
                if (this.inputState[0] && this.inputState[1] && this.inputState[2] && this.inputState[3]) {
                    this.isLoading = true;
                    try{
                        const id = await tigermaster.auth.createUserWithPhoneAndPassword(
                            this.newUser.phone, "1234567890", this.newUser
                        );
                        this.$router.push({
                            path: '/home/user_detail',
                            query: {
                                userId: id
                            }
                        });
                    }catch(e){
                        this.formErrorMesssage = '創建失敗';
                    }finally{
                        this.isLoading = false;
                    }
                } else {
                    this.formErrorMesssage = '有些資料不符合規定';
                }
            }
        }
    }
</script>

<style>
    .User-Create-Error {
        color: #dd2a0e;
        font-size: 10px;
    }
</style>