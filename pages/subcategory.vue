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
        <v-col md="12 p5p">
          <v-row>
            <v-col md="9">
              <h1 class="font-weight-medium">
                {{
                  !loading
                    ? products.length > 0
                      ? decodeURIComponent(pageName)
                      : 'No Products Found'
                    : null
                }}
              </h1>
            </v-col>
          </v-row>
          <v-divider color="#00C3B7"></v-divider>
          <div class="d-flex mt-8"
            :class="{ 'flex-column': $vuetify.breakpoint.smAndDown, 'flex-row pr-16': $vuetify.breakpoint.mdAndUp }">
            <div class="py-0">
              <h4 class="mb-0 mr-2" style="width: 120px;">
                FILTER BY <v-icon>mdi-filter-variant</v-icon>
              </h4>
            </div>
            <v-row>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete id="mySelect" :items="brands" label="Brands" item-text="name" item-value="id"
                  class="rounded-lg mr-3" v-model="brand" @change="getProducts()" dense outlined clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ item.name }}</span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete :items="categories" label="Category" item-text="name" item-value="id" v-model="category"
                  @change="getProducts()" class="rounded-lg mr-3" outlined dense clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ item.name }}</span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete :items="subCategories" label="Sub-category" item-text="name" item-value="id"
                  v-model="subCategory" @change="getProducts()" class="rounded-lg mr-3" outlined dense clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ item.name }}</span>
                  </template></v-autocomplete>
              </v-col>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete :items="priceRange" label="Price" v-model="selectedPrice" @change="getProducts()"
                  :item-text="(i) => `₦${i.start} to ₦${i.end}`" :item-value="(i) => i" class="rounded-lg mr-3" outlined
                  dense clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ `₦${item.start} to ₦${item.end}` }}</span>
                  </template></v-autocomplete>
              </v-col>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete :items="avalabilities" v-model="availability" label="Availability" item-text="name"
                  item-value="id" @change="getProducts()" class="rounded-lg mr-3" outlined dense clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ item.name }}</span>
                  </template></v-autocomplete>
              </v-col>
              <v-col md="2" sm="12" cols="12" class="py-0 px-0">
                <v-autocomplete :items="sortBy" v-model="sortByValue" label="Sort By" item-text="name"
                  @change="getProducts()" item-value="id" class="rounded-lg mr-3" outlined dense clearable>
                  <template v-slot:selection="{ item }">
                    <span class="dropdown-toggle-150">{{ item.name }}</span>
                  </template></v-autocomplete>
              </v-col>
            </v-row>
          </div>
          <v-row class="mt-0">
            <v-col :class="{
              custom5cols: $vuetify.breakpoint.mdAndUp,
              '': $vuetify.breakpoint.smAndDown,
            }" md="auto" sm="6" cols="6" v-for="(i, index) in products" :key="index">
              <product-display :product_name="i.name" rating="5" :price="i.price" :regular_price="i.regular_price"
                :wholesale_price="i.wholesale_price" :image="i.avatar" :badge="i.stock_status"
                :description="i.description" :short_description="i.short_description" :product_object="i"
                :product_id="i.id" />
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-pagination class="mt-16" :length="pageinationLength" :total-visible="7" v-model="page" @input="toPage"
        @next="next" @previous="previous"></v-pagination>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    pageName() {
      let dCate = this.subCategories.filter(
        (item) => item.id == this.subCategory
      )
      if (dCate.length > 0) {
        let newUrlIS =
          window.location.origin +
          `/subcategory/${dCate[0].name}?subCategoryId=${this.subCategory}`
        window.history.pushState({}, null, newUrlIS)
        return dCate[0].name
      }
      return location.pathname.split('/')[2]
    },
  },
  mounted() {
    this.subCategory = this.$route.query.subCategoryId
    this.getSubCategories()
    this.getCategories()
    this.getbrands()
    this.getProducts()
    // this.subCategory = this.$route.query.subCategoryId;
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
      sortBy: [
        { id: 'relevance', name: 'Relevance' },
        { id: 'lth', name: 'Lowest to Highest Price' },
        { id: 'htl', name: 'Highest to Lowest Price' },
      ],
      sortByValue: '',
      real_products: [],
      loading: true,
      // pagename: location.pathname.split('/')[2],
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
    sortItems(items) {
      if (this.sortByValue == "lth") {
        return items.sort(
        (a, b) =>
          a.price - b.price
      );

      }
      if (this.sortByValue == "htl") {
        return items.sort(
        (a, b) =>
          b.price - a.price
      );
      }
      return items;
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
          this.real_products = this.sortItems(this.real_products);

          this.pageinationLength = Math.ceil(
            this.real_products.length / this.perPage
          )
          this.toPage(1)
          this.loading = false
          // this.filterPrice()
        })
    },
    // async getProducts() {
    //   const data = {
    //     page: this.page,
    //     id: this.$route.query.subCategoryId,
    //     subcategory: this.$route.query.subCategoryId,
    //     section: this.$route.query.sectionId,
    //     category: this.category,
    //     brand: this.brand,
    //     price: this.selectedPrice,
    //     availability: this.availability,
    //   }
    //   await this.$store
    //     .dispatch('products/subcategoryproducts', data)
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
