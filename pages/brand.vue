<template>
  <div>
    <!-- <home-page-slider></home-page-slider> -->
    <v-container fluid>
      <v-row class="mt-4">
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
                @change="filterCategory()"
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
          <!-- <h1 class="font-weight-medium">{{ !loading ? ((products.length > 0) ? 'Brand: '+ products[0].brand.name : 'No Products Found') : null}}</h1> -->
          <h1 class="font-weight-bold">{{ decodeURI(brand) }}</h1>
          <v-divider></v-divider>
          <v-row class="mt-8">
            <v-col md="2" cols="6" v-for="(i, index) in products" :key="index">
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
                :regular_price="i.regular_price"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        class="my-16"
        :length="length"
        @input="getProducts()"
      ></v-pagination>
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
      range: [0, 10000],
      brands: [],
      categories: [],
      category: [],
      products: [],
      real_products: [],
    }
  },
  methods: {
    filterPrice() {
      this.products = this.real_products.filter(
        (item) => item.price >= this.range[0] && item.price <= this.range[1]
      )
    },
    filterCategory() {
      this.products = []
      var products = []
      for (var i = 0; i < this.category.length; i++) {
        products = this.real_products.filter(
          (item) => item.category === this.category[i].toString()
        )

        this.products.push(products)
      }
      console.log(this.products)
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
      this.loading = true
      const data = {
        page: this.page,
        id: this.$route.query.brandId,
      }
      await this.$store
        .dispatch('products/brandproducts', data)
        .then((response) => {
          response.data
            ? (this.products = this.real_products = response.data.data)
            : null
          this.length = response.data.last_page
          this.loading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.category {
  // background-color: #f5f5f5;
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
