<template>
  <div>
    <!-- <home-page-slider></home-page-slider> -->
    <v-container fluid>
      <v-row class="mt-4" :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
        <v-col md="12 p3p">
          <!-- <h1 class="font-weight-medium">{{ !loading ? ((products.length > 0) ? 'Brand: '+ products[0].brand.name : 'No Products Found') : null}}</h1> -->
          <h1 class="font-weight-bold">
            {{
              !loading
                ? products.length > 0
                  ? decodeURI(pagename != undefinded ? pagename : '')
                  : 'No Products Found'
                : null
            }}
          </h1>
          <v-divider color="#00C3B7"></v-divider>

          <v-col md="12" class="hidden-sm-and-down pl-6 mt-6">
            <div
              class="
                category
                pa-0
                d-flex
                flex-row
                justify-content-center
                align-center
              "
            >
              <h4 class="mb-6 ma- mr-2" style="width: 120px">
                FILTER BY <v-icon>mdi-filter-variant</v-icon>
              </h4>
              <v-select
                id="mySelect"
                :items="brands"
                label="Brands"
                item-text="name"
                item-value="id"
                class="rounded-lg mr-3"
                v-model="brand"
                @change="getProducts()"
                rounded
                outlined
                shaped
                color="primary"
                clearable
              ></v-select>
              <v-select
                :items="categories"
                label="Category"
                item-text="name"
                item-value="id"
                v-model="category"
                @change="getProducts()"
                class="rounded-lg mr-3"
                outlined
                clearable
              ></v-select>
              <v-select
                :items="subCategories"
                label="Sub-category"
                item-text="name"
                item-value="id"
                v-model="subCategory"
                @change="getProducts()"
                class="rounded-lg mr-3"
                outlined
                clearable
              ></v-select>
              <v-select
                :items="priceRange"
                label="Price"
                v-model="selectedPrice"
                @change="getProducts()"
                :item-text="(i) => `₦${i.start} to ₦${i.end}`"
                :item-value="(i) => i"
                class="rounded-lg mr-3"
                outlined
                clearable
              ></v-select>
              <v-select
                :items="avalabilities"
                v-model="availability"
                label="Availability"
                item-text="name"
                item-value="id"
                @change="getProducts()"
                class="rounded-lg mr-3"
                outlined
                clearable
              ></v-select>
              <v-select
                :items="[]"
                label="Sort By"
                item-text="name"
                @change="getProducts()"
                item-value="id"
                class="rounded-lg mr-3"
                outlined
                clearable
              ></v-select>
            </div>
            <div></div>
          </v-col>
          <v-row class="mt-0">
            <v-col
              :class="{
                custom5cols: $vuetify.breakpoint.mdAndUp,
                '': $vuetify.breakpoint.smAndDown,
              }"
              md="auto"
              sm="6"
              cols="6"
              v-for="(i, index) in products"
              :key="index"
            >
              <!-- {{i}} -->
              <!-- :vendor="i.product.brand.name" -->
              <!-- <product-display
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
      let dBrand = this.brands.filter((item) => item.id == this.brand)
      if (dBrand.length > 0) {
        let newUrlIS =
          window.location.origin +
          `/brands/${dBrand[0].name}?brandId=${this.brand}`
        window.history.pushState({}, null, newUrlIS)
        return dBrand[0].name
      }
      return location.pathname.split('/')[2]
    },
  },
  mounted() {
    this.brand = this.$route.query.brandId
    this.getSubCategories()
    this.getCategories()
    this.getbrands()
    this.getProducts()

    this.subCategory = this.$route.query.subCategoryId
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
      avalabilities: [{ id: 'instock', name: 'Exclude out of stock' }],
      availability: '',
      category: '',
      subCategory: '',
      brand: '',
      selectedPrice: {},
      products: [],
      priceRange: [
        { start: '1', end: '1000' },
        { start: '1000', end: '2000' },
        { start: '2000', end: '3000' },
        { start: '3000', end: '4000' },
        { start: '4000', end: '5000' },
        { start: '5000', end: '10000' },
        { start: '10000', end: '20000' },
        { start: '20000', end: '50000' },
        { start: '50000', end: '100000' },
      ],
      real_products: [],
      loading: true,
      // pagename: location.pathname.split('/')[2],
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
    },
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
    async getSubCategories() {
      await this.$store.dispatch('category/subcategories').then((response) => {
        this.subCategories = response.data
      })
    },
    async getCategories() {
      await this.$store.dispatch('category/openall').then((response) => {
        this.categories = response.data
      })
    },
    toPage(page) {
      this.page = page
      let start = this.perPage * (page - 1)
      let end = this.perPage * page
      this.products = this.real_products.slice(start, end)
      window.scrollTo(0, 0)
    },
    next() {
      this.toPage(this.page)
    },
    previous() {
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
          if (Array.isArray(response.data)) {
            this.real_products = response.data
          } else {
            if (response.data != null) {
              this.real_products = Object.values(response.data)
            }
          }

          this.pageinationLength = Math.ceil(
            this.real_products.length / this.perPage
          )
          this.toPage(1)
          this.loading = false
          // this.filterPrice()
        })
    },
    // async getProducts() {
    //   this.loading = true
    //   const data = {
    //     page: this.page,
    //     id: this.$route.query.brandId,
    //   }
    //   await this.$store
    //     .dispatch('products/brandproducts', data)
    //     .then((response) => {
    //       response.data
    //         ? (this.products = this.real_products = response.data.data)
    //         : null
    //       this.length = response.data.last_page
    //       this.loading = false
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
