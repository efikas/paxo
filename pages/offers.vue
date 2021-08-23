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
      <v-col md="2" class="hidden-sm-and-down">
        <div class="category pa-0">
          <h4 class="mb-6 ma-4">FILTER BY <v-icon>filter_alt</v-icon></h4>

          <v-expansion-panels flat focusable>
            <v-expansion-panel style="border-bottom: 1px solid #ddd; border-top: 1px solid #ddd;" >
              <v-expansion-panel-header style="font-size: 15px;">Category</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-for="(i,index) in categories"  :key="index"  :value="i.id" v-model="category" :label="i.name" @change="getProducts()" class="ma-0 pa-0"></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel style="border-bottom: 1px solid #ddd;">
              <v-expansion-panel-header style="font-size: 15px;">Brand</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-for="(i,index) in brands" :value="i.id" v-model="brand"  :key="index" :label="i.name" class="ma-0 pa-0"></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel style="border-bottom: 1px solid #ddd;">
              <v-expansion-panel-header style="font-size: 15px;">Price</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-range-slider v-model="range" max="500000"></v-range-slider>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
      range: [1000, 5000000],
      brands: [],
      categories: [],
      products: [],
      length: 1,
      category: [],
      brand: [],

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
      const data = {
        page: this.page,
        category: this.category,
        brand: this.brand,
        price: this.range
      }
      await this.$store.dispatch('products/offers', data).then((response) => {
        this.products = response.data.data
        this.length = response.data.last_page
        this.loading = false
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.category {
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
</style>
