<template>
  <div id="Login">
    <b-container>
        <div class="Login-Area">
            <b-form>
                <h3>Login</h3>

                <b-form-group>
                    <b-form-label>Phone</b-form-label>
                    <b-form-input
                        v-model="phone"
                        name="phone"
                        placeholder="Enter Phone"
                    />
                </b-form-group>

                <b-form-group>
                    <b-form-label>Password</b-form-label>
                    <b-form-input
                        v-model="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                    />
                </b-form-group>

                <b-button variant="primary" class="btn-block" to="/home">Login</b-button>
            </b-form>
        </div>
    </b-container>
  </div>
</template>

<script>

export default {
    name: 'Home',
    data(){
        return{
            phone: "",
            password: ""
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

@media (max-width: 767px) {
  .Login-Area{
    width: 100%;
  }
}
</style>