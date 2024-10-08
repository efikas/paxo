<template>
  <div class="p3p">
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
          <!-- Loading... -->
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-row v-else class="mt-4" :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
      <v-col md="12 p3p">
        <h1 class="font-weight-medium">
          {{
            !loading
              ? products.length > 0
                ? 'Shop All'
                : 'No Products Found'
              : null
          }}
        </h1>
        <v-divider color="#00C3B7"></v-divider>
       

        <div class="d-flex mt-6" :class="{ 'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row': $vuetify.breakpoint.mdAndUp }">
          <div class="py-0 mt-2"> 
            <h4 class="mb-8 mr-2" style="width: 120px;">
                FILTER BY <v-icon>mdi-filter-variant</v-icon>
              </h4>
          </div>
          <v-row>
            <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select id="mySelect" :items="brands" label="Brands" item-text="name" item-value="id"
              class="rounded-lg mr-3" v-model="brand" @change="getProducts()" rounded outlined shaped color="primary"
              clearable></v-select>
          </v-col>
          <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select :items="categories" label="Category" item-text="name" item-value="id" v-model="category"
              @change="getProducts()" class="rounded-lg mr-3" outlined clearable></v-select>
          </v-col>
          <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select :items="subCategories" label="Sub-category" item-text="name" item-value="id" v-model="subCategory"
              @change="getProducts()" class="rounded-lg mr-3" outlined clearable></v-select>
          </v-col>
          <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select :items="priceRange" label="Price" v-model="selectedPrice" @change="getProducts()"
              :item-text="(i) => `₦${i.start} to ₦${i.end}`" :item-value="(i) => i" class="rounded-lg mr-3" outlined
              clearable></v-select>
          </v-col>
          <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select :items="avalabilities" v-model="availability" label="Availability" item-text="name"
              item-value="id" @change="getProducts()" class="rounded-lg mr-3" outlined clearable></v-select>
          </v-col>
          <v-col md="2" sm="12" cols="12" class="py-0">
            <v-select :items="[]" label="Sort By" item-text="name" @change="getProducts()" item-value="id"
              class="rounded-lg mr-3" outlined clearable></v-select>
          </v-col>
          </v-row>
        </div>

        <v-row class="mt-0">
          <!-- {{category}} -->
          <v-col :class="{
            custom5cols: $vuetify.breakpoint.mdAndUp,
            '': $vuetify.breakpoint.smAndDown,
          }" md="auto" sm="6" cols="6" v-for="(i, index) in products" :key="index">
            <!-- {{i.products}} -->
            <product-display :vendor="i.brand ? i.brand.name : null" :product_name="i.name" rating="5" :price="i.price"
              :regular_price="i.regular_price" :wholesale_price="i.wholesale_price" :image="i.avatar"
              :badge="i.stock_status" :description="i.description" :short_description="i.short_description"
              :product_object="i" :product_id="i.id" />
          </v-col>
        </v-row>
        <v-pagination class="mt-16" :length="pageinationLength" :total-visible="7" v-model="page" @input="toPage"
          @next="next" @previous="previous"></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  computed: {
    // category() {
    //   return location.pathname.split('/')[2]
    // },
  },
  mounted() {
    ; (this.category = this.$route.query.categoryId), this.getSubCategories()
    this.getCategories()
    this.getbrands()
    this.getShopAllProducts()

    this.subCategory = this.$route.query.subCategoryId
  },
  data() {
    return {
      // loading: true,
      // brand: '',
      // page: 1,
      // range: [0, 10000],
      // brands: [],
      // categories: [],
      // products: [],
      // real_products: [],
      // length: 1,
      // category: [],
      // brand: [],

      page: 1,
      pageinationLength: 1,
      perPage: 42,
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
    async getShopAllProducts() {
      // const data = {
      //   page: this.page,
      //   category: this.category,
      //   brand: this.brand,
      //   price: this.range
      // }
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
      await this.$store.dispatch('products/shopall', data).then((response) => {
        if (Array.isArray(response.data.data)) {
          this.real_products = response.data.data
        } else {
          if (response.data.data != null) {
            this.real_products = Object.values(response.data.data)
          }
        }

        this.pageinationLength = Math.ceil(
          this.real_products.length / this.perPage
        )
        this.toPage(1)
        this.loading = false
      })
    },
  },
}
</script>
<style>
#mySelect .v-select .dropdown-toggle {
  border: none;
}
</style>
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

.filter-box {
  height: 400px;
  border: 1px solid #ddd;
  overflow: scroll;
}
</style>
