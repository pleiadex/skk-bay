<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <br>
          <!-- <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs> -->
          <div class="pl-6">
            <p class="display-1 mb-0">{{product.name}}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">₩ {{numeberWithComma(product.price)}}</p>
              <p class="headline font-weight-light pt-3 ml-5">Buy Now: ₩ {{numeberWithComma(product.price * 2)}}</p>
              <v-chip
                class="ml-10"
                v-if='(product.status == 2)'
                color='gray'
                dark
              >
                Sold Out
              </v-chip>
              <v-chip
                class="ml-10"
                v-else-if='(product.status == 1)'
                color='green'
                dark
              >
                On Bidding
              </v-chip>
              <v-chip
                class="ml-10"
                v-else
                color='red'
                dark
              >
                Invalid
              </v-chip>
              <v-spacer></v-spacer>
            </v-card-actions>
            <p class="subtitle-1 font-weight-bold">
              Trading Place: {{product.tradingplace}}  
            </p>
            <p class="subtitle-1">
              Seller Name: {{product.sellerName}} (Tel. {{product.sellerPhonenumber}})  
            </p>
            <p class="subtitle-1 font-weight-light">
              {{product.description}}  
            </p>
            <p class="title">BID</p>
            <div class="d-flex">
              <v-text-field
              class="mr-6"
              type="number"
              outlined
              style="width:100px"
              :value="product.price"
              v-model="suggestedPrice"
              prefix="₩"
              dense
              ></v-text-field>
              <v-btn 
                class="mr-5" 
                outlined 
                tile
                @click="bidding"  
              >
                Request Bidding
              </v-btn>
            </div>
            <v-btn 
              class="mr-5" 
              outlined 
              tile
              @click="purchase"
            >
              Buy Now
            </v-btn>
            <v-btn 
              class="primary white--text" 
              outlined 
              tile 
              dense
              @click="addWishlist"><v-icon>mdi-cart</v-icon> ADD TO Wishlist</v-btn>

          </div>
        </div>
      </div>
    </v-container>
    <div class="danger-alert" v-html="error"/>
    <padding></padding>
  </div>
</template>
<script>
import Padding from './EmptyBox'
import ProductService from '@/services/ProductService'
import WishlistService from '@/services/WishlistService'
import TransactionService from '@/services/TransactionService'
export default {
  components: {
    Padding
  },
  data () {
    return {
      error: null,
      suggestedPrice: 0,
      product: {
        name: '',
        price: '',
        description: ''
      }
    }
  },
  async mounted () {
    try {
      const productId = this.$route.params.id
      this.product = (await ProductService.get(productId)).data

      this.suggestedPrice = this.product.price
      const images = []
      if (!this.product.image1.includes('null')) {
        images.push(this.product.image1)
      }
      if (!this.product.image2.includes('null')) {
        images.push(this.product.image2)
      }
      if (!this.product.image3.includes('null')) {
        images.push(this.product.image3)
      }
      if (!this.product.image4.includes('null')) {
        images.push(this.product.image4)
      }
      this.product.images = images
      console.log(this.product)
    } catch (err) {
      console.log(err)
      this.$router.push({ name: 'Shop' })
    }
  },
  methods: {
    numeberWithComma (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async addWishlist () {
      try { 
        const productId = this.product.id
        await WishlistService.post({ productId: productId })

        window.location.href='/wishlist'
      } catch (err) {
        console.log(err)
        this.error = err.response.data.error
      }
    },
    async bidding () {
      try {
        if (this.product.price.length === 0 || isNaN(this.product.price)) {
          this.error = 'The suggested price is invalid.'
          return
        }

        const productId = this.product.id
        const price = this.suggestedPrice
        await TransactionService.bidding({
          productId: productId,
          price: price
        })

        this.$router.push({ name: 'PurchaseHistory' })
      } catch (err) {
        this.error = err.response.data.error
        console.log(err)
      }
    },
    async purchase () {
      try {
        const productId = this.product.id
        await TransactionService.purchase({
          productId: productId,
        })

        this.$router.push({ name: 'PurchaseHistory' })
      } catch (err) {
        this.error = err.response.data.error
        console.log(err)
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