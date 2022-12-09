<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4"
        v-if="(products.length==0)">Sorry, we don't have one...</p>
    
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12"
        >
        <br>
          <v-card outlined>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
        <br>
          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id" v-for="pro in products">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.image1"
                  >
                    <!-- <v-card-title>{{pro.type}} </v-card-title> -->
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn 
                          v-if="hover" 
                          @click="view(pro.id)"
                          class="" 
                          outlined>VIEW</v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <a @click="view(pro.id)" style="text-decoration: none">
                        {{pro.name}}
                      </a>
                    </div>
                    <div>₩{{numeberWithComma(pro.price)}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <padding></padding>
  </div>
</template>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
<script>
import Padding from './EmptyBox'
import ProductService from '@/services/ProductService'
export default {
  components: {
    Padding
  },
  data: () => ({
    range: [0, 1000000],
    min: 0,
    max: 1000000,
    products: []
  }),
  watch: {
    range() {
      this.search()
    }
  },
  async mounted () {
    let keyword = this.$route.params.keyword
    if (!keyword) {
      keyword = ''
    }
    this.products = (await ProductService.search(
      keyword, 
      {
        minPrice: this.range[0],
        maxPrice: this.range[1]
      }
      )).data
  },
  methods: {
    view (productId) {
      console.log(productId)
      this.$router.push({
        name: 'Product',
        params: {
          id: productId
        }
      })
    },
    numeberWithComma (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    async search () {
      let keyword = this.$route.params.keyword
      if (!keyword) {
        keyword = ''
      }
      console.log(this.range[0])
      console.log(this.range[1])
      this.products = (await ProductService.search(
        keyword, 
        {
          minPrice: this.range[0],
          maxPrice: this.range[1]
        }
        )).data
    }
  }
}
</script>
