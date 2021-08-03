<template>
  <div>

    <v-container v-if="loading">
      <v-overlay color="primary"  :opacity="1" :value="loading">
        <v-progress-circular indeterminate size="64">
          Loading...
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container fluid v-else>
      <v-row class="mt-4" :class="{'px-4':$vuetify.breakpoint.smAndDown}" >
        <v-col md="12">
          <h1 class="font-weight-medium">{{!loading ? (products.length > 0 ? decodeURIComponent(pagename) : 'No Products Found') : null}}</h1>
          <v-divider></v-divider>
          <v-row class="mt-8" >
            <v-col md="2" v-for="(i, index) in products" :key="index">

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
              :product_object="i"
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
      range: [1000, 5000000],
      brands: [],
      categories: [],
      products: [],
      loading: true,
      pagename: location.pathname.split('/')[2]
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
        id: this.$route.query.subCategoryId
      }
      await this.$store.dispatch('products/subcategoryproducts', data).then((response) => {
        this.products = response.data.data
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
