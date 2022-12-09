<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">Login</p>
    <v-text-field 
      type="text" 
      name="username" 
      label="Username" 
      v-model="account.name" 
      placeholder="Username"
      required
      :rules="rules.requiredData"
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

    <div class="danger-alert" v-html="error"/>
    <v-btn color="primary" @click="login" dark>Login</v-btn>
    <br>
    <br>
    <p class="subtitle-1 font-weight-thin">
      Click <a href="/register/user">here</a> to sign up.
    </p>
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
      account: {
        name: '',
        password: ''
      },
      error: null,
      rules: {
        requiredData: [
          val => (val || '').length > 0 || 'Required'
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        if (this.account.name.length 
            * this.account.password.length === 0
          ) {
          console.log('Required!')
          this.error = 'Please fill out all the fields.'
          return
        }

        const response = (await AuthenticationService.login(this.account)).data

        // Set vuex state
        this.$store.dispatch('setToken', response.token)
        this.$store.dispatch('setUser', response.user)

        // this.$router.push({ name: 'Home' })
        window.location.href='/'
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