<template>
  <div>

    <home-page-slider></home-page-slider>
    <v-container fluid>
      <v-row class="mt-4">
        <!-- <v-col md="3">
          <div class="category pa-4">
            <h4 class="mb-6">CATEGORIES</h4>

            <a href="#" v-for="(i, index) in categories" :key="index">
              {{i.name}}<br/>
            </a>
          </div>
          <div class="category mt-6 pa-4">
            <h4 class="mb-6">
              BY BRANDS
            </h4>
            <v-radio-group v-for="(i, index) in brands" :key="index" class="ma-0 pa-0" v-model="brand">
              <v-radio :label="i.name" :value="i.name"></v-radio>
            </v-radio-group>

            <v-divider></v-divider>
            <h4 class="mt-6 mb-2">BY PRICE</h4>
            <v-range-slider v-model="range" max="500000"></v-range-slider>
            {{range}}
          </div>
        </v-col> -->
        <v-col md="12">
          <!-- <h1 class="font-weight-medium">{{ !loading ? ((products.length > 0) ? 'Brand: '+ products[0].brand.name : 'No Products Found') : null}}</h1> -->
          <h1 class="font-weight-bold">{{decodeURI(brand)}}</h1>
          <v-divider></v-divider>
          <v-row class="mt-8">
            <v-col md="2" v-for="(i, index) in products" :key="index">
            <!-- {{i}} -->
              <!-- :vendor="i.product.brand.name" -->
              <product-display
              :product_name="i.name"
              rating="5"
              :price="i.price"
              :image="i.avatar"
              :badge="i.stock_status"
              :description="i.description"
              :short_description="i.short_description"
              :product_object="i"
              :product_id="i.id"
            />
            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-pagination v-model="page" class="my-16" :length="length" @input="getProducts()"></v-pagination>

    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    brand() {
      return location.pathname.split('/')[2]

    },
  },
  mounted() {
    this.getCategories()
    this.getbrands()
    this.getProducts()
  },
  data() {
    return {
      loading: true,
      length: 1,
      range: '',
      page: 1,
      range: [1000, 5000000],
      brands: [],
      categories: [],
      products: []
    }
  },
  methods: {
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
    async getCategories() {
      await this.$store.dispatch('category/openall').then((response) => {
        this.categories = response.data
      })
    },
    async getProducts() {
      this.loading = true
      const data = {
        page: this.page,
        id: this.$route.query.brandId
      }
      await this.$store.dispatch('products/brandproducts', data).then((response) => {
      response.data ?   this.products = response.data.data : null
        this.length = response.data.last_page
        this.loading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.category{
  background-color: #f5f5f5;
  h4{
    font-size: 18px;
    font-weight: 400;
  }
  a{
    font-size: 14px;
    color: #000000DE;
    text-decoration: none;
  }
}
</style>
