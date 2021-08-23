<template>
  <div>
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <div v-else>
      <v-img :src="banner" width="100%"></v-img>
      <v-container>
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
            <h1 class="font-weight-medium">
              {{
                products.length > 0
                  ? 'Banner: ' + banner_name
                  : 'No Products Found'
              }}
            </h1>
            <v-divider></v-divider>
            <v-row class="mt-8">
              <v-col md="3" v-for="(i, index) in products" :key="index">
                <!-- :vendor="i.product.brand.name" -->
                <product-display
                  :product_name="i.products.name"
                  rating="5"
                  :price="i.products.price"
                  :image="i.products.avatar"
                  :badge="i.products.stock_status"
                  :description="i.products.description"
                  :short_description="i.products.short_description"
                  :product_object="i.products"
                  :regular_price="i.products.regular_price"
                  :product_id="i.products.id"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
      brand: '',
      banner_name: '',
      page: 1,
      range: [1000, 5000000],
      brands: [],
      categories: [],
      products: [],
      banner: '',
      loading: true,
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
        id: this.$route.query.bannerId,
      }
      await this.$store
        .dispatch('products/bannerproducts', data)
        .then((response) => {
          response.data ? (this.products = response.data.bannerprod) : null
          this.banner = response.data.avatar
          this.banner_name = response.data.name
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.category {
  background-color: #f5f5f5;
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
