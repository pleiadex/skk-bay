<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Hello, {{username}}</p>
        <div class="row">
          <div class="col-md-4 col-sm-4 col-xs-12">
            <v-card
              class="mx-auto"
              max-width="400"
              outlined
              tile
            >
              <v-card-subtitle class="pb-0">User Information</v-card-subtitle>
              <v-card-text class="text--primary">
                <div>
                  You can change your account information including ID, password, etc.
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                  @click="moveToEdit"
                >
                  Edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="col-md-4 col-sm-3 col-xs-12">
            <v-card
              class="mx-auto"
              max-width="400"
              outlined
              tile
              href="/salehistory"
            >
              <v-card-subtitle class="pb-0">My product</v-card-subtitle>
              <v-card-text class="text--primary">

                <div>
                  All your products are listed in this page. You can modify any of your products' information. Go check how many people are interested in your market!
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Manage
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
          <div class="col-md-4 col-sm-3 col-xs-12">
            <v-card
              class="mx-auto"
              max-width="400"
              outlined
              tile
              href="/purchasehistory"
            >
              <v-card-subtitle class="pb-0">Purchase History</v-card-subtitle>

              <v-card-text class="text--primary">

                <div>
                  Check out the status of what you have bought! You can see the details of purchase transactions.
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Check
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
    </v-container>
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
      username: null
    }
  },
  async mounted () {
    try {
      const isUserLoggedIn = this.$store.state.isUserLoggedIn
      if (isUserLoggedIn) {
        const isAdmin = this.$store.state.user.isAdmin
        if (isAdmin) {
          this.$router.push({
          name: 'UserList'
        })
        }
        this.username = this.$store.state.user.name
        //(await AuthenticationService.get()).data.name
      } else {
        this.$router.push({
          name: 'Login'
        })
      }

    } catch (err) {
      this.$router.push({
          name: 'Home'
        })
    }
      
  },
  methods: {
    moveToEdit () {
      const username = this.$store.state.user.name

      this.$router.push({
        name: 'UserEdit',
        params: {
          name: username
        }
      })
    }
  }

}
</script>

<style>

</style>