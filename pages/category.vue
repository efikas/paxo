<template>
  <div>
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container fluid v-else>
      <v-row class="mt-4" :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
        <v-col md="2" class="hidden-sm-and-down pl-6 mx-0">
          <div class="category pa-0">
            <h4 class="mb-6">FILTER BY <v-icon>filter_alt</v-icon></h4>

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
                  >Availability</v-expansion-panel-header
                >

                <v-expansion-panel-content
                  class="px-1 mt-2"
                  style="overflow: scroll; height: 60px"
                >
                  <div>
                    <v-checkbox
                      v-for="(i, index) in avalabilities"
                      :value="i"
                      v-model="availability"
                      @change="getProducts()"
                      :key="index"
                      :label="i"
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

            <!-- <h4 class="mb-4 mt-6">Price</h4>
            <v-range-slider
              v-model="range"
              @change="filterPrice()"
              max="10000"
            ></v-range-slider>
            <div class="d-flex justify-space-between">
              <span> &#8358;{{ range[0] | formatPrice }} </span>
              <span>&#8358;{{ range[1] | formatPrice }}</span>
            </div> -->
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
          <v-row class="mt-8">
            <v-col
              md="3"
              v-for="(i, index) in products"
              :key="index"
            >
              <!-- <product-display
                v-if="i.product"
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
              /> -->
              <product-display
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
</template>
<script>
export default {
  computed: {
    pagename() {
       let dBrand = this.categories.filter(item => item.id == this.category);
       if(dBrand.length > 0){
        let newUrlIS =  window.location.origin + `/category/${dBrand[0].name}?categoryId=${this.category}`;
        window.history.pushState({}, null, newUrlIS);
        return dBrand[0].name;
       }
      return location.pathname.split('/')[2]
    },
  },
  mounted() {
    this.category = this.$route.query.categoryId,
    this.getCategories()
    this.getbrands()
    this.getProducts()
  },
  data() {
    return {
      // brand: '',
      // page: 1,
      // length: 1,
      // range: [0, 10000],
      // brands: [],
      // categories: [],
      // products: [],
      // real_products: [],
      // loading: true,
      page: 1,
      pageinationLength: 1,
      perPage: 40,
      range: [0, 10000],
      brands: [],
      categories: [],
      avalabilities: [
        "Instock"
      ],
      availability: "",
      category: "",
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
    filterPrice() {
      this.products = this.real_products.filter(
        (item) =>
          item.product.price >= this.range[0] &&
          item.product.price <= this.range[1]
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
        subcategory: this.$route.query.subCategoryId,
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
          // this.filterPrice()
        })
    },
    // async getProducts() {
    //   const data = {
    //     page: this.page,
    //     id: this.$route.query.categoryId,
    //   }
    //   await this.$store
    //     .dispatch('products/categoryproducts', data)
    //     .then((response) => {
    //       this.products = this.real_products = response.data.data
    //       this.length = response.data.last_page
    //       this.loading = false
    //       this.filterPrice()
    //     })
    // },
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
