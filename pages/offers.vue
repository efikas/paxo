<template>
  <div>
    <!-- <home-page-slider class="hidden-sm-and-down"></home-page-slider> -->
    <v-row class="mt-4" :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
      <v-col md="2" class="hidden-sm-and-down">
        <div class="category pa-0">
          <h4 class="mb-6 ma-4">FILTER BY <v-icon>filter_alt</v-icon></h4>

          <v-expansion-panels flat focusable>
            <v-expansion-panel style="border-bottom: 1px solid #ddd; border-top: 1px solid #ddd;" >
              <v-expansion-panel-header style="font-size: 15px;">Category</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-for="(i,index) in categories"  :key="index" :label="i.name" class="ma-0 pa-0"></v-checkbox>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel style="border-bottom: 1px solid #ddd;">
              <v-expansion-panel-header style="font-size: 15px;">Brand</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox v-for="(i,index) in brands"  :key="index" :label="i.name" class="ma-0 pa-0"></v-checkbox>
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
        <!-- <h1 class="font-weight-medium">{{products.length > 0 ? products[0].category.name : 'No Products Found'}}</h1> -->
        <v-divider></v-divider>
        <v-row class="mt-8">
          <v-col md="3" v-for="(i, index) in products" :key="index">
            <!-- :vendor="i.product.brand.name" -->
            <product-display
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
            />
          </v-col>
        </v-row>
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
      brand: '',
      page: 1,
      range: [1000, 5000000],
      brands: [],
      categories: [],
      products: [],
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
      }
      await this.$store.dispatch('products/all', data).then((response) => {
        this.products = response.data.data
        this.length = response.data.last_page
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
