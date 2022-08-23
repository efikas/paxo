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
      <v-row class="mt-4" :class="{'px-4':$vuetify.breakpoint.smAndDown}" >
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
                @change="getProducts()"
                class="ma-0 pa-0"
              ></v-checkbox>
            </div>
            

            <h4 class="mb-4 mt-6">Filter by Brand</h4>
            <div class="filter-box pa-4">
              <v-checkbox
                v-for="(i, index) in brands"
                :value="i.id"
                v-model="pages"
                @change="getProducts()"
                :key="index"
                :label="i.name"
                class="ma-0 pa-0"
              ></v-checkbox>
            </div>
            <h4 class="mb-4 mt-6">Filter by Price</h4>
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
          <v-row>
            <v-col md="9">
              <h1 class="font-weight-medium">
                {{
                  !loading
                    ? products.length > 0
                      ? decodeURIComponent(pagename)
                      : 'No Products Found'
                    : null
                }}
              </h1>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="mt-8" >
            <v-col md="2" cols="6" v-for="(i, index) in products" :key="index" v-if="i.product">

              <product-display v-if="i.product"
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
      pagename: location.pathname.split('/')[2]
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
        id: this.$route.query.subCategoryId
      }
      await this.$store.dispatch('products/subcategoryproducts', data).then((response) => {
        this.products = this.real_products = response.data.data
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
 // background-color: #f5f5f5;
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
