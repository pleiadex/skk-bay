<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">Change Account Info</p>
    <v-text-field 
      type="text" 
      name="username" 
      label="User Name" 
      v-model="account.name" 
      placeholder="Username"
      disabled
      ></v-text-field>
    <br>
    <v-text-field 
      type="password" 
      name="password" 
      label="Password" 
      v-model="account.password" 
      placeholder="Password"
      required
      :rules="rules.requiredData"
      ></v-text-field>
    <br>
    <v-text-field 
      type="text" 
      name="phonenumber" 
      label="Phone Number" 
      v-model="account.phonenumber" 
      placeholder="010-0000-0000"
      required
      :rules="rules.requiredData"
      ></v-text-field>
    <br>

    <div class="danger-alert" v-html="error"/>
    <v-btn color="primary" @click="edit" dark>Confirm</v-btn>
    <br>
    <br>
    <padding></padding>
  </div>
</template>

<script>
import Padding from './EmptyBox'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  components: {
    Padding
  },
  data () {
    return {
      error: null,
      account: {
        name: '',
        password: '',
        phonenumber: ''
      },
      rules: {
          requiredData: [
            val => (val || '').length > 0 || 'Required'
          ]
        }
      }
  },
  async mounted () {
    const username = this.$route.params.name
    const response = (await AuthenticationService.get(username)).data
    this.account.name = response.name
    this.account.phonenumber = response.phonenumber
  },
  methods: {
    async edit () {
      try {
        if (this.account.name.length 
            * this.account.password.length 
            * this.account.phonenumber.length === 0
          ) {
          console.log('Required!')
          this.error = 'Please fill out all the fields.'
          return
        }

        const response = (await AuthenticationService.edit(
          this.account.name, 
          this.account
          )).data

        this.$router.push({ name: 'MyPage' })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }

}
</script>


<style scoped>
.danger-alert {
  color: red;
}
</style>