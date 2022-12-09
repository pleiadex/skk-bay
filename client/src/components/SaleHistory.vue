<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">My Products</p>
  
    <br>
    <v-data-table
    :headers="headers"
    :items="products"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:[`item.name`]="{ item }">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src=item.image1></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{item.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="show(item)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
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
    </template>
  </v-data-table>
    <padding></padding>
  
  </div>
</template>

<script>
import Padding from './EmptyBox'
import ProductService from '@/services/ProductService'
export default {
  components: {
    Padding
  },
  data () {
    return {

      headers: [
        {
          text: 'Product Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Price',
          value: 'price'
        },
        { text: 'Trading Place',
          value: 'tradingplace'
        },
        { text: 'Status',
          value: 'status'
        },
        { text: 'Bidding Count',
          value: 'numOfBidding'
        },
        { 
          text: 'Actions', 
          value: 'actions', 
          sortable: false 
        }
      ],
      products: []
    }
  },
  async created () {
    this.products = (await ProductService.getMyProducts()).data
  },
  methods: {
    show (item) {
      this.$router.push({
        name: 'ProductTransaction',
        params: {
          productId: item.id
        }
      })
    },
    editItem (item) {
      console.log(item.id)
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: item.id
        }
      })
    },
    async deleteItem (item) { 
      try { 
        await ProductService.delete(item.id)
        this.products = (await ProductService.getMyProducts()).data
      } catch (err) {
        console.log(err.response.data.error)
      }
    }
  }
}
</script>

<style>

</style>