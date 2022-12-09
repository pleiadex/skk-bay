<template>
  <v-container>
    <p class="display-3 font-weight-light	text-center pa-4">{{productName}}</p>
    <v-data-table
    :headers="headers"
    :items="transactions"
    :sort-by="['createdAt']"
    :sort-desc="[true]"
    class="elevation-1"
  >
    <template v-slot:[`item.price`] = "{ item }">
      <div>₩ {{numeberWithComma(item.price)}}</div>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip
        v-if='(item.status == 2)'
        color='green'
        dark
      >
        Confirmed
      </v-chip>
      <v-chip
        v-else-if='(item.status == 1)'
        color='gray'
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
import TransactionService from '@/services/TransactionService'
export default {
    components: {
      Padding
    },
  data: () => ({
    productName: null,
    headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'createdAt'
        },
        { text: 'Price',
          value: 'price'
        },
        { text: 'Bidder',
          value: 'bidderName'
        },
        { text: 'Status',
          value: 'status'
        },
    ],
    transactions: [],
  }),
  async created () {
    const productId = this.$route.params.productId
    const response = (await TransactionService.getProductTransaction(productId)).data
    this.productName = response.productName
    this.transactions = response.transactions
    for (let i = 0; i < this.transactions.length; i++) {
      const time = new Date(this.transactions[i].createdAt)
      this.transactions[i].createdAt = time.toLocaleString('ko-KR')
    }
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
    numeberWithComma (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style>

</style>