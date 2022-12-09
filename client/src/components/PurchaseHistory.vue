<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">Purchase Transactions</p>
  
    <br>
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
      <a 
        target="_blank" 
        :href="`/product/${item.productId}`"
        style="text-decoration: none !important"
      >
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
        v-else-if='(item.status == 0)'
        color='red'
        dark
      >
        Rejected
      </v-chip>
      </a>
    </template>
  </v-data-table>
    <padding></padding>
  
  </div>
</template>

<script>
import Padding from './EmptyBox'
import TransactionService from '@/services/TransactionService'
export default {
  components: {
    Padding
  },
  data () {
    return {
      headers: [
        {
          text: 'Date',
          align: 'start',
          sortable: false,
          value: 'createdAt'
        },
        { text: 'Product Name',
          value: 'productName'
        },
        { text: 'Price',
          value: 'price'
        },
        { text: 'Seller',
          value: 'sellerName'
        },
        { text: 'Trading Place',
          value: 'tradingplace'
        },
        { text: 'Status',
          value: 'status'
        },
      ],
      transactions: []
    }
  },
  async mounted () {
    const response = (await TransactionService.get()).data
    
    for (let i = 0; i < response.length; i++) {
      const time = new Date(response[i].createdAt)
      response[i].createdAt = time.toLocaleString('ko-KR')
    }
    this.transactions = response
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