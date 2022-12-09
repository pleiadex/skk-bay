<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">Sell your product</p>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
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
        label="Inital Price" 
        v-model="product.price" 
        placeholder="Inital Price"
        value="1000"
        prefix="₩"
        required
        :rules="rules.requiredData"
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
      <input
        id="images"
        type="file"
        accept="image/png, image/jpeg, image/bmp"
        truncate-length="15"
        multiple
        ref="images"
        label="Images of your product"
        v-on:change="fileSelect()"
      >
      <br>
      <br>

      <v-btn type="submit" color="primary" dark>Register</v-btn>
    </form>
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
        name: null,
        price: null,
        tradingplace: null,
        description: null,
        images: []
      },
      rules: {
        requiredData: [
          val => (val || '').length > 0 || 'Required'
        ]
      }
    }
  },
  methods: {
    fileSelect () {
      let length = this.$refs.images.files.length
      if (length > 4) {
        length = 4
      } 
      for (let i = 0; i < length; i++) {
        this.product.images.push(this.$refs.images.files[i])
      }
      // this.product.image = this.$refs.images.files[0]
    },
    async submitForm () {
      try {
        if (this.product.name.length 
            * this.product.price.length 
            * this.product.tradingplace.length === 0
          ) {
          console.log('Required!')
          this.error = 'Please fill out all the fields.'
          return
        }
        
        const productData = new FormData()
        productData.append('name', this.product.name)
        productData.append('price', this.product.price)
        productData.append('tradingplace', this.product.tradingplace)
        productData.append('description', this.product.description)
        for (let i = 0; i < this.product.images.length; i++) {
          productData.append('image', this.product.images[i])
        }
        // console.log(productData.getAll('image'))
        const response = (await ProductService.register(
          productData,
          {
            header: {
              'Context-Type': 'multipart/form-data'
            }
          })).data
        this.$router.push({ name: 'Shop' })
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