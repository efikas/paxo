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
      <!-- <v-img :src="banner" width="100%"></v-img> -->
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
          <v-col md="2" class="hidden-sm-and-down pl-6 mx-0">
          <div class="category pa-0">
            <h4 class="mb-4">FILTER BY <v-icon>filter_alt</v-icon></h4>

            <v-expansion-panels focusable flat accordion>
              <v-expansion-panel>
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  >Brand
                </v-expansion-panel-header>

                <v-expansion-panel-content
                  style="overflow: scroll; height: 50vh"
                >
                  <div>
                    <v-checkbox
                      v-for="(i, index) in brands"
                      :value="i.id"
                      v-model="brand"
                      @change="getProducts()"
                      :key="index"
                      :label="i.name"
                      class="ma-0 pa-0"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  >Category</v-expansion-panel-header
                >

                <v-expansion-panel-content
                  class="px-1 mt-2"
                  style="overflow: scroll; height: 50vh; border-style: none"
                >
                  <div>
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
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  >Subcategory</v-expansion-panel-header
                >

                <v-expansion-panel-content
                  class="px-1 mt-2"
                  style="overflow: scroll; height: 50vh; border-style: none"
                >
                  <div>
                    <v-checkbox
                      v-for="(i, index) in subCategories"
                      :key="index"
                      :value="i.id"
                      v-model="subCategory"
                      :label="i.name"
                      @change="getProducts()"
                      class="ma-0 pa-0"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  >Availability</v-expansion-panel-header
                >

                <v-expansion-panel-content
                  class="px-1 mt-2"
                  style="overflow: scroll; height: 60px"
                >
                  <div>
                    <v-checkbox
                      v-for="(i, index) in avalabilities"
                      :value="i.id"
                      v-model="availability"
                      @change="getProducts()"
                      :key="index"
                      :label="i.name"
                      class="ma-0 pa-0"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider></v-divider>
              <v-expansion-panel>
                <v-expansion-panel-header
                  expand-icon="mdi-menu-down"
                  >Price</v-expansion-panel-header
                >

                <v-expansion-panel-content
                  class="px-1 mt-2"
                  style="overflow: scroll; height: 50vh"
                >
                  <div>
                    <v-checkbox
                      v-for="(i, index) in priceRange"
                      :value="i"
                      v-model="selectedPrice"
                      @change="getProducts()"
                      :key="index"
                      :label="`₦${i.start} to ₦${i.end}`"
                      class="ma-0 pa-0 small"
                    >
                    <template v-slot:label>
                      <span class="small">{{ `₦${i.start} to ₦${i.end}` }}</span>
                    </template>
                  </v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-col>
          <v-col md="10">
            <h1 class="font-weight-medium">
              {{
                products.length > 0
                  ?  banner_name
                  : 'No Products Found'
              }}
            </h1>
            <v-divider></v-divider>
            <v-row class="mt-8">
              <v-col md="2" cols="6" v-for="(i, index) in products" :key="index">
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
                  :regular_price="i.regular_price"
                  :product_id="i.id"
                  :wholesale_price="i.wholesale_price"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-pagination
        class="mt-16"
          :length="pageinationLength"
          :total-visible="7"
          v-model="page"
          @input="toPage"
          @next="next"
          @previous="previous"
        ></v-pagination>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  // computed: {
  //   brand() {
  //     return location.pathname.split('/')[2]
  //   },
  // },
  mounted() {
    this.brand = this.$route.query.bannerId,
    this.getCategories()
    this.getbrands()
    this.getProducts()
  },
  data() {
    return {
      page: 1,
      pageinationLength: 1,
      perPage: 40,
      range: [0, 10000],
      brands: [],
      categories: [],
      subCategories: [],
      avalabilities: [
        {id: "instock", name: "Exclude out of stock"}
      ],
      availability: "",
      category: "",
      subCategory: "",
      brand: "",
      selectedPrice: {},
      products: [],
      priceRange: [
        { start: '1', end: '1000'},
        { start: '1000', end: '2000'},
        { start: '2000', end: '3000'},
        { start: '3000', end: '4000'},
        { start: '4000', end: '5000'},
        { start: '5000', end: '10000'},
        { start: '10000', end: '20000'},
        { start: '20000', end: '50000'},
        { start: '50000', end: '100000'},
      ],
      real_products: [],
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
    toPage(page){
      this.page = page
      let start = (this.perPage * (page - 1))
      let end = (this.perPage * page)
      this.products = this.real_products.slice(start, end);
      window.scrollTo(0, 0);
    },
    next(){
      this.toPage(this.page)
    },
    previous(){
      this.toPage(this.page)
    },
    async getProducts() {
      const data = {
        page: this.page,
        id: this.$route.query.sectionId,
        subcategory: this.subCategory,
        section: this.$route.query.sectionId,
        category: this.category,
        brand: this.brand,
        price: this.selectedPrice,
        availability: this.availability,
      }
      await this.$store
        .dispatch('products/sectionproducts', data)
        .then((response) => {
          if(Array.isArray(response.data)){
            this.real_products = response.data
          }
          else {
            if(response.data != null){
             this.real_products = Object.values(response.data)
            }
          }
          
          this.pageinationLength = Math.ceil(this.real_products.length / this.perPage)
          this.toPage(1)
          this.loading = false
        })
    },
    // async getProducts() {
    //   const data = {
    //     page: this.page,
    //     id: this.$route.query.bannerId,
    //   }
    //   await this.$store
    //     .dispatch('products/bannerproducts', data)
    //     .then((response) => {
    //       response.data ? (this.products = response.data.bannerprod) : null
    //       this.banner = response.data.avatar
    //       this.banner_name = response.data.name
    //       this.loading = false
    //     })
    // },
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
