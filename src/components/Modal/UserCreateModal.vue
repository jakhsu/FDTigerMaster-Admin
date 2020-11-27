<template>
    <b-modal :id="id" @show="resetModal" title="User Create">
        <b-form>
            <b-form-row>
                <b-col lg="6" md="12">
                    <b-form-group label="Phone">
                        <b-form-input
                            v-model="newUser.phone"
                            :state="inputState[inputIndex.phone]"
                            type="number"
                            placeholder="Enter Phone"
                            @update="phoneValidate"
                        />
                    </b-form-group>
                </b-col>
                <b-col lg="6" md="12">
                    <b-form-group label="Name">
                        <b-form-input
                            v-model="newUser.name"
                            :state="inputState[inputIndex.name]"
                            placeholder="Enter Name"
                            @update="nameValidate"
                        />
                    </b-form-group>
                </b-col>
            </b-form-row>
            <b-form-group label="Email">
                <b-form-input
                    v-model="newUser.email"
                    :state="inputState[inputIndex.email]"
                    placeholder="Enter Email"
                    @update="emailValidate"
                />
            </b-form-group>
        </b-form>
        <template #modal-footer="{ cancel }">
            <span class="User-Create-Error" v-if="formError">some field is not complete</span>
            <b-button variant="danger" @click="cancel">
                Cancel
            </b-button>
            <b-button variant="primary" @click="onSaveClick">
                Save
            </b-button>
        </template>
    </b-modal>
</template>

<script>
const inputIndex = Object.freeze({
    phone: 0,
    name: 1,
    email: 2
});
export default {
    name: 'UserCreateModal',
    props: {
        id:{
            type: String,
            default: 'User-Create-Modal'
        }
    },
    data(){
        return {
            inputIndex,
            newUser: {
                phone: '',
                name: '',
                email: ''
            },
            inputState: [null, null, null],
            formError: false
        }
    },
    methods:{
        phoneValidate(){
            var phoneRegex = /09[0-9]{8}/;
            this.inputState[this.inputIndex.phone] = phoneRegex.test(this.newUser.phone);
        },
        nameValidate(){
            this.inputState[this.inputIndex.name] = this.newUser.name !== '';
        },
        emailValidate(){
            this.inputState[this.inputIndex.email] = this.newUser.email !== '';
        },
        resetModal(){
            this.newUser = {
                phone: '',
                name: '',
                email: ''
            }
        },
        onSaveClick(){
            if(this.inputState[0] && this.inputState[1] && this.inputState[2]){
                this.$emit('onSaveClick', this.newUser);
                this.$bvModal.hide(this.id);
            }else{
                this.formError = true;
            }
        }
    }
}
</script>

<style>
.User-Create-Error{
    color: #dd2a0e;
    font-size: 10px;
}
</style>