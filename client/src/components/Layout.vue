<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
<!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title
        style="width: 350px"
      >
        <a href="/" class="white--text" style="text-decoration: none"><v-icon>mdi-truck</v-icon>&nbsp;SKK Bay</a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
        v-model="keyword"
        @keyup.enter="search"
      />
      <v-spacer />
      <v-btn
        icon
        @click="enter()"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn href="/wishlist" icon>
        <v-badge
          :content=numOfWishlist
          :value=numOfWishlist
          color="green"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        @click="logout"
        icon
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation
        color="primary"
        horizontal
      > 
        <a href="/" class="v-btn">
          <span>Home</span>
        </a>
        <a href="/shop" class="v-btn">
          <span>Product</span>
        </a>
        <a href="/register/product" class="v-btn">
          <span>Sell</span>
        </a>
        <v-btn href="/mypage">
          <span>My page</span>
        </v-btn>
      </v-bottom-navigation>
    </v-main>

      <router-view/>


    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="secondary white--text text-center"
      >
        <v-card-text>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-linkedin</v-icon>
          </v-btn>
           <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-instagram</v-icon>
          </v-btn>

        </v-card-text>

        <v-card-text class="white--text pt-0">
          Buying and selling products online is now easier than ever. Our auction website allows you to buy and sell products at the lowest prices.<br>
          We have a wide range of products, from clothes to electronics, furniture to cars. You can find anything you need on our website, and we have the best deals in town.  
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>SKKU Web Programming Final Project</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
  import WishlistService from '@/services/WishlistService'
  export default {
    data () {
      return {
        keyword: '',
        numOfWishlist: 0
      }
    },
    async mounted () {
      try {
        this.numOfWishlist = (await WishlistService.getNumOfWishlist()).data
      } catch (err) {
        console.log('failed to fetch the number of wishlist.')
      }
    },
    methods: {
      enter () {
        try {
          const isUserLoggedIn = this.$store.state.isUserLoggedIn

          if (isUserLoggedIn) {
            this.$router.push({ name: 'MyPage' }).catch(() => {})
          } else {
            this.$router.push({ name: 'Login' }).catch(() => {})
          }
        } catch (err) {
          this.$router.push({ name: 'Login' }).catch(() => {})
        }
      },
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.numOfWishlist = 0
        this.$router.push({
          name: 'Home'
        }).catch(() => {})
      },
      search () {
        this.$router.push({
          name: 'Shop', 
          params: {
            keyword: this.keyword
          }
        }).catch(() => {
          window.location.href = `/shop/${this.keyword}`
        })
      }
    }
  }
</script>
