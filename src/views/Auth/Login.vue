<template>
    <Loading v-if="isLoading" />
    <div v-else id="Login">
        <b-container>
            <div class="Login-Area">
                <b-form>
                    <h3>登入</h3>
                    <span class="Login-Area-Error" v-if="RegexError">電話號碼或密碼格式錯誤</span>
                    <span class="Login-Area-Error" v-if="genericError">出現錯誤，請再確認電話密碼正確</span>
                    <b-form-group label="電話號碼">
                        <span class="Login-Area-Error" v-if="phoneError">此用戶不存在，請確認電話號碼</span>
                        <b-form-input v-model="phone" type="text" placeholder="輸入電話..."
                            :state="inputState[inputIndex.phone]" @update="phoneValidate" maxlength='12' />
                    </b-form-group>
                    <b-form-group label="密碼">
                        <span class="Login-Area-Error" v-if="passError">密碼錯誤</span>
                        <b-form-input v-model="password" type="password" placeholder="輸入密碼..."
                            :state="inputState[inputIndex.password]" @update="passwordValidate"
                            @keyup.enter="onLoginClick" />
                    </b-form-group>
                    <b-button variant="primary" class="btn-block" @click="onLoginClick">登入</b-button>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
    import Loading from '@/components/Loading'

    import tigermaster from 'fdtigermaster-admin-sdk'
    import {
        messaging
    } from '@/utility/Firebase'

    const inputIndex = Object.freeze({
        phone: 0,
        password: 1
    });
    export default {
        name: 'Home',
        components: {
            Loading
        },
        data() {
            return {
                inputIndex,
                phone: "",
                password: "",
                inputState: [null, null],
                RegexError: false,
                phoneError: false,
                passError: false,
                genericError: false,
                isLoading: true
            }
        },
        created() {
            tigermaster.auth.onReady(() => {
                if (tigermaster.auth.currentUser) {
                    this.$router.push({
                        path: '/home'
                    });
                } else {
                    this.isLoading = false;
                }
            });
        },
        methods: {
            phoneValidate() {
                var phoneRegex = /^09[0-9]{8}$/;
                this.inputState[this.inputIndex.phone] = phoneRegex.test(this.phone);
            },
            passwordValidate() {
                this.inputState[this.inputIndex.password] = this.password !== '';
            },
            async onLoginClick() {
                if (this.inputState[0] && this.inputState[1]) {
                    try {
                        this.isLoading = true;
                        await tigermaster.auth.loginWithPhoneAndPassword(this.phone, this.password);
                        const token = await messaging.getToken();
                        await tigermaster.device.create(token);
                        this.$router.push({
                            path: '/home'
                        });
                    } catch (errorMsg) {
                        switch (errorMsg.message) {
                            case 'Login fail: status 403':
                                this.passError = true
                                break
                            case 'Login fail: status 404':
                                this.phoneError = true
                                break
                            default:
                                this.genericError = true
                        }
                        this.inputState = [false, false]
                    } finally {
                        this.isLoading = false;
                    }
                } else {
                    this.RegexError = true;
                }
            }
        }
    }
</script>

<style scoped>
    #Login {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #34558b;
    }

    #Login .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .Login-Area {
        width: 60%;
        background: #ffffff;
        border-radius: 25px;
        padding: 45px 55px;
        text-align: left;
    }

    .Login-Area h3 {
        text-align: center;
    }

    .Login-Area .Login-Area-Error {
        color: #dd2a0e;
        font-size: 10px;
    }

    @media (max-width: 767px) {
        .Login-Area {
            width: 100%;
        }
    }
</style>