<template>
  <div>
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-row
      v-else
      class="mt-4"
      :class="{ 'px-4': $vuetify.breakpoint.smAndDown }"
    >
      <v-col md="2" class="hidden-sm-and-down pl-6">
        <div class="category pa-0">
          <h4 class="mb-6 ma-">FILTER BY <v-icon>filter_alt</v-icon></h4>

          <h4 class="mb-4">Filter by Category</h4>
          <div class="filter-box pa-4">
            <v-checkbox
              v-for="(i, index) in categories"
              :key="index"
              :value="i.id"
              v-model="category"
              :label="i.name"
              @change="getFilterProducts()"
              class="ma-0 pa-0"
            ></v-checkbox>
          </div>

          <h4 class="mb-4 mt-6">Filter by Brand</h4>
          <div class="filter-box pa-4">
            <v-checkbox
              v-for="(i, index) in brands"
              :value="i.id"
              v-model="brand"
              @change="getFilterProducts()"
              :key="index"
              :label="i.name"
              class="ma-0 pa-0"
            ></v-checkbox>
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
        <h1 class="font-weight-medium">Paxo Store</h1>
        <v-divider></v-divider>
        <v-row class="mt-8">
          <!-- {{category}} -->
          <v-col
            md="3"
            sm="6"
            cols="6"
            v-for="(i, index) in products"
            :key="index"
          >
            <!-- :vendor="i.product.brand.name" -->
            <!-- <product-display
              :vendor="i.brand ? i.brand.name : null"
              :product_name="i.name"
              rating="5"
              :price="i.price"
              :regular_price="i.regular_price"
              :wholesale_price="i.wholesale_price"
              :image="i.avatar"
              :badge="i.stock_status"
              :description="i.description"
              :short_description="i.short_description"
              :product_object="i"
              :product_id="i.id"
            /> -->
            <product-display
              :vendor="i.product.brand ? i.product.brand.name : null"
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
        <v-pagination
          :length="length"
          class="my-16"
          v-model="page"
          @input="getProducts()"
        ></v-pagination>
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
      // brand: '',
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
        price: this.range,
      }
      await this.$store.dispatch('products/all', data).then((response) => {
        this.products = this.real_products = response.data.data
        this.length = response.data.last_page
        this.loading = false
        this.filterPrice()
      })
    },
    async getFilterProducts() {
      const data = {
        page: this.page,
        category: this.category,
        brand: this.brand,
        price: this.range,
      }
      await this.$store.dispatch('products/filter', data).then((response) => {
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

</style>
