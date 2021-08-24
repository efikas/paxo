<template>
  <div>

    <v-container v-if="loading">
      <v-overlay color="white"  :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container fluid v-else>
      <v-row class="mt-4" :class="{'px-4':$vuetify.breakpoint.smAndDown}">
      <!-- {{products}} -->
        <!-- <v-col md="3" class="hidden-sm-and-down">
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

          <v-row>
            <v-col md="9">
              <h1 class="font-weight-medium">{{!loading ? (products.length > 0 ? products[0].category.name : 'No Products Found') : null}}</h1>
            </v-col>
            <v-col>
              Filter by Price:
              <v-range-slider
                v-model="range"
                @change="filterPrice()"
                max="10000"
              ></v-range-slider>
              <div class="d-flex justify-space-between">
                <span> &#8358;{{ range[0] | formatPrice }} </span>
                <span>&#8358;{{ range[1] | formatPrice }}</span>
              </div>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="mt-8" >
            <v-col md="2" v-for="(i, index) in products" :key="index">

              <product-display
              :product_name="i.product.name"
              rating="5"
              :price="i.product.price"
              :regular_price="i.product.regular_price"
              :wholesale_price="i.product.wholesale_price"
              :image="i.product.avatar"
              :badge="i.product.stock_status"
              :description="i.product.description"
              :short_description="i.product.short_description"
              :product_object="i.product"
              :product_id="i.product.id"
            />


            </v-col>
          </v-row>
        </v-col>

      </v-row>
      <v-pagination class="mt-16" :length="length" v-model="page" @input="getProducts()"></v-pagination>

    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    category() {
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
      brand: '',
      page: 1,
      length: 1,
      range: [0, 10000],
      brands: [],
      categories: [],
      products: [],
      real_products: [],
      loading: true,
    }
  },
  methods: {
    filterPrice() {
      this.products = this.real_products.filter(
        (item) => item.product.price >= this.range[0] && item.product.price <= this.range[1]
      )
    },
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
      const data = {
        page: this.page,
        id: this.$route.query.categoryId
      }
      await this.$store.dispatch('products/categoryproducts', data).then((response) => {
        this.products =  this.real_products = response.data.data
        this.length = response.data.last_page
        this.loading = false
        this.filterPrice()
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
