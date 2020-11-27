<template>
  <div id="Login">
    <b-container>
        <div class="Login-Area">
            <b-form>
                <h3>Login</h3>
                <span class="Login-Area-Error" v-if="formError">incorrect phone number or password</span>
                <b-form-group label="Phone">
                    <b-form-input
                        v-model="phone"
                        type="number"
                        placeholder="Enter Phone"
                        :state="inputState[inputIndex.phone]"
                        @update="phoneValidate"
                    />
                </b-form-group>

                <b-form-group label="Password">
                    <b-form-input
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        :state="inputState[inputIndex.password]"
                        @update="passwordValidate"
                    />
                </b-form-group>

                <b-button variant="primary" class="btn-block" @click="onLoginClick">Login</b-button>
            </b-form>
        </div>
    </b-container>
  </div>
</template>

<script>
const inputIndex = Object.freeze({
    phone: 0,
    password: 1
});
export default {
    name: 'Home',
    data(){
        return{
            inputIndex,
            phone: "",
            password: "",
            inputState: [null, null],
            formError: false
        }
    },
    methods:{
        phoneValidate(){
            var phoneRegex = /09[0-9]{8}/;
            this.inputState[this.inputIndex.phone] = phoneRegex.test(this.phone);
        },
        passwordValidate(){
            this.inputState[this.inputIndex.password] = this.password !== '';
        },
        onLoginClick(){
            if(this.inputState[0] && this.inputState[1]){
                this.$router.push({ path: '/home'});
            }else{
                this.formError = true;
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

#Login .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.Login-Area{
    width: 60%;
    background: #ffffff;
    border-radius: 25px;
    padding: 45px 55px;
    text-align: left;
}

.Login-Area h3{
    text-align: center;
}

.Login-Area .Login-Area-Error{
    color: #dd2a0e;
    font-size: 10px;
}

@media (max-width: 767px) {
  .Login-Area{
    width: 100%;
  }
}
</style>