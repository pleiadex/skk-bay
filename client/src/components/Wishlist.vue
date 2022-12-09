<template>
  <v-container>
    <p class="display-3 font-weight-light	text-center pa-4">Wishlist</p>
    <v-data-table
    :headers="headers"
    :items="wishlist"
    sort-by="productName"
    class="elevation-1"
  >
    <template v-slot:[`item.productName`]="{ item }">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src=item.image></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{item.productName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:[`item.price`] = "{ item }">
      <div>₩ {{numeberWithComma(item.price)}}</div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        v-if='(item.status == 2)'
        color='gray'
        dark
      >
        Confirmed
      </v-chip>
      <v-chip
        v-else-if='(item.status == 1)'
        color='green'
        dark
      >
        Pending
      </v-chip>
      <v-chip
        v-else
        color='red'
        dark
      >
        Rejected
      </v-chip>
    </template>
  </v-data-table>
  <padding></padding>
  </v-container>
</template>

<script>
import Padding from './EmptyBox'
import WishlistService from '@/services/WishlistService'
export default {
    components: {
      Padding
    },
  data: () => ({
    headers: [
      {
        text: 'Product Name',
        align: 'start',
        sortable: false,
        value: 'productName',
      },
      { text: 'Price', value: 'price' },
      { text: 'Trading Place', value: 'tradingplace' },
      { text: 'Seller', value: 'sellerName' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    wishlist: [],
  }),
  async created () {
    const response = (await WishlistService.get()).data
    this.wishlist = response
  },
  async mounted () {
    try {
      const isUserLoggedIn = this.$store.state.isUserLoggedIn
      if (!isUserLoggedIn) {
        this.$router.push({ name: 'Home' }).catch(() => {})
      }
    } catch (err) {
      this.$router.push({ name: 'Home' }).catch(() => {})
    }
  },

  methods: {
    async deleteItem (item) {
      try {
        await WishlistService.delete(item.productId)
        // this.wishlist = (await WishlistService.get()).data
        window.location.href='/wishlist'
      } catch (err) {
        console.log(err)
      }
    },
    numeberWithComma (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style>

</style>