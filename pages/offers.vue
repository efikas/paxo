<template>
  <div>

    <v-container v-if="loading">
      <v-overlay color="white"  :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-row v-else class="mt-4" :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
      <v-col md="2" class="hidden-sm-and-down pl-6">
        <div class="category pa-0">
          <h4 class="mb-6 ma-">FILTER BY <v-icon>filter_alt</v-icon></h4>

          <h4 class="mb-4">Filter by Category</h4>
          <div class="filter-box pa-4 ">
           <v-checkbox v-for="(i,index) in categories"  :key="index"  :value="i.id" v-model="category" :label="i.name" @change="getProducts()" class="ma-0 pa-0"></v-checkbox>
          </div>

          <h4 class="mb-4 mt-6">Filter by Brand</h4>
          <div class="filter-box pa-4 ">
            <v-checkbox v-for="(i,index) in brands" :value="i.id" v-model="brand"  :key="index" :label="i.name" class="ma-0 pa-0"></v-checkbox>
          </div>
          <h4 class="mb-2 mt-6">Filter by Price</h4>
            <v-range-slider
              v-model="range"
              @change="filterPrice()"
              max="10000"
            ></v-range-slider>
            <div class="d-flex justify-space-between">
              <span> &#8358;{{ range[0] | formatPrice }} </span>
              <span>&#8358;{{ range[1] | formatPrice }}</span>
            </div>



        </div>

      </v-col>
      <v-col md="10">
        <h1 class="font-weight-medium">Offers</h1>
        <v-divider></v-divider>
        <v-row class="mt-8">
          <!-- {{category}} -->
          <v-col md="3" sm="6" cols="6" v-for="(i, index) in products" :key="index">
            <!-- {{i.products}} -->
            <product-display
              :vendor="i.products.brand ? i.products.brand.name : null"
              :product_name="i.products.name"
              rating="5"
              :price="i.products.price"
              :regular_price="i.products.regular_price"
              :wholesale_price="i.products.wholesale_price"
              :image="i.products.avatar"
              :badge="i.products.stock_status"
              :description="i.products.description"
              :short_description="i.products.short_description"
              :product_object="i.products"
              :product_id="i.products.id"
            />
          </v-col>
        </v-row>
        <v-pagination :length="length" class="my-16" v-model="page" @input="getProducts()"></v-pagination>
      </v-col>
    </v-row>
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
      loading: true,
      brand: '',
      page: 1,
      range: [0, 10000],
      brands: [],
      categories: [],
      products: [],
      real_products: [],
      length: 1,
      category: [],
      brand: [],

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
        category: this.category,
        brand: this.brand,
        price: this.range
      }
      await this.$store.dispatch('products/offers', data).then((response) => {
        this.products = this.real_products = response.data.data
        this.length = response.data.last_page
        this.loading = false
        this.filterPrice()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.category {
  position: sticky;
  background-color: #fff;
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
  a {
    font-size: 14px;
    color: #000000de;
    text-decoration: none;
  }
}
.filter-box {
  height: 400px;
  border: 1px solid #ddd;
  overflow: scroll;
}
</style>
