<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">Change Product Info</p>
    <v-text-field 
        type="text" 
        name="productName" 
        label="Product Name" 
        v-model="product.name" 
        placeholder="Product Name"
        required
        :rules="rules.requiredData"
      ></v-text-field>
      <br>
      <v-text-field 
        type="number" 
        name="price" 
        v-model="product.price" 
        placeholder="Inital Price"
        prefix="₩"
        required
        ></v-text-field>
      <br>
      <v-text-field 
        type="text"
        prepend-inner-icon="mdi-map-marker" 
        name="tradingPlace" 
        label="Trading Place" 
        v-model="product.tradingplace" 
        placeholder="address"
        required
        :rules="rules.requiredData"
        ></v-text-field>
      <br>
      <v-textarea
        name="input-7-1"
        label="Description"
        v-model="product.description"
      ></v-textarea>
      <br>
      <!-- <input
        id="images"
        type="file"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera" 
        truncate-length="15"
        multiple
        ref="images"
        label="Images of your product"
        v-on:change="fileSelect()"
      > -->
      <br><br>
      <v-btn color="primary" @click="edit" dark>Edit</v-btn>
      <div class="danger-alert" v-html="error"/>
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
      error: null,
      product: {
        id: null,
        name: null,
        price: null,
        tradingplace: null,
        description: null
      },
      rules: {
        requiredData: [
          val => (val || '').length > 0 || 'Required'
        ]
      }
    }
  },
  async created () {
    const productId = this.$route.params.id
    this.product = (await ProductService.get(productId)).data
  },
  methods: {
    async edit () {
      try {
        if (this.product.name.length 
            * this.product.price.length 
            * this.product.tradingplace.length 
            * this.product.description.length === 0
          ) {
          console.log('Required!')
          this.error = 'Please fill out all the fields.'
          return
        }

        const productId = this.product.id
        const response = (await ProductService.edit(productId, this.product)).data
        console.log(response)
        this.$router.push({ name: 'SaleHistory' })
      } catch (err) {
        console.log(err)
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