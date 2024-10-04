<template>
  <div>
    <v-row>
      <v-col md="6" cols="12" :class="{'py-0' : $vuetify.breakpoint.smAndDown}" class="px-0 pt-1">
        <!-- {{ productSearch }} -->
        <!-- <v-text-field v-model="productSearch" dense outlined placeholder="Search for your choice products" ></v-text-field> -->
        <!-- <v-autocomplete
          v-model="productSearch"
          :items="products"
          :loading="isLoading"
          :search-input.sync="search"
          prepend-inner-icon="search" @keypress="findProduct()"
          clearable
          hide-details
          hide-selected
          dense
          item-text="billername"
          item-value="billername"
          label="Search for products of your choice"
          outlined
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Search for your favourite
                <strong>products</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-coin</v-icon>
              <span v-text="item.billername"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              @click="loadPage(item.billerid)"
              color="indigo"
              class="headline font-weight- white--text"
            >
              <img :src="item.image" alt="" />
            </v-list-item-avatar>
            <v-list-item-content @click="loadPage(item.billerid)">
              <v-list-item-title v-text="item.billername"></v-list-item-title>
              <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-coin</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete> -->
        <v-autocomplete
          v-model="product"
          :items="products"
          :search-input.sync="productSearch"
          hide-no-data
          item-text="name"
          item-value="id"
          prepend-inner-icon="search"
          outlined
          dense 
          @change="goToProduct(product.id)"
          class="pt-6"
          :class="(productSearch ?? '').length == 0 ? 'template-subscribe' : ''"
          input-class="search-box"
          :input-attrs="{'class': 'search-box'}"
          append-icon=""
          placeholder="Search for products"
          clearable
          return-object
        >
        <!-- <template v-slot:append v-if="(productSearch ?? '').length == 0">
          <v-divider vertical thickness="6" class="my-2"></v-divider>
          <v-btn icon class="search-btn" :to="'search?str='+productSearch"
          ><v-icon>mdi-filter-variant</v-icon></v-btn
        >
        </template> -->
        <!-- <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-coin</v-icon>
              <span v-text="item.billername"></span>
            </v-chip>
          </template> -->
          <template v-slot:item="{ item }">
            <v-list-item-avatar
              color="primary"
              class="headline font-weight- white--text"
              :rounded="false"
            >
              <img :src="item.avatar" alt="" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-coin</v-icon>
            </v-list-item-action>
          </template>
      </v-autocomplete>
      </v-col>
      <!-- <v-col md="4" cols="2" class="px-0 pt-7" :class="{'py-0' : $vuetify.breakpoint.smAndDown}">
        <v-btn class="primary search-btn" :to="'search?str='+productSearch" 
          ><v-icon>search</v-icon></v-btn
        >
      </v-col> -->
    </v-row>
    <!-- <v-dialog
      transition="scroll-y-transition"
      @click="searchDialog = false"
      v-model="searchDialog"
      class="px-0 mx-0"
      origin="top bottom"
    >
      <v-card
        @blur="searchDialog = false"
        transition="scroll-y-transition"
        class="pa-6 mx-0"
        light
        width="100vw"
        min-height="500"
        style="top: 0; position: relative; width: 100vw"
      >
        <div class="text-right">
          <v-icon large @click="searchDialog = false">ri-close-line</v-icon>
        </div>
        <div class="px-16">
          <h2>Search Products</h2>
          <v-text-field
            placeholder="Search Products"
            append-icon="search" @keypress="findProduct()"
            class="mt-16" v-model="productSearch" outlined
          >
          </v-text-field>
          <v-layout row wrap>
            <v-flex pa-2 md2 v-for="i in products" :key="i.id">
              <product-display :product_name="i.name" :rating="5" :price="i.price" :image="i.avatar" :badge="i.stock_status" :description="i.description" :short_description="i.short_description" :product_object="i" :product_id="i.id" />

            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import ProductDisplay from './ProductDisplay.vue'
import debounce from 'debounce'
export default {
  components: { ProductDisplay },
  data() {
    return {
      search: '',
      searchDialog: null,
      products: [],
      originalProducts: [],
      productSearch: '',
      product: null,
      loading: false,
    }
  },
  methods: {
    goToProduct (id) {
      this.$router.push('/single-product?product_id='+id)
    },
    async findProduct() {
      const data = {
        search: this.productSearch,
      }
      await this.$store
        .dispatch('products/search', data)
        .then((response) => {
          this.products = response.data
          console.log(this.products)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    makeSearch: async (value, self) => {
      // Handle empty value
      if (!value) {
        self.products = []
        self.productSearch = ''
      }
      // Items have already been requested
      if (self.loading) {
        return
      }

      self.loading = true

      // YOUR AJAX Methods go here
      // if you prefer not to use vue-api-query
      const data = {
        search: self.productSearch,
      }
      await self.$store
        .dispatch('products/search', data)
        // .where('name', value)
        // .get()
        .then((response) => {
          self.products = response.data
        })
        .catch((error) => {
          self.error = 'Unknown Error. Please check details and try again.'
          self.failed()
        })
        .finally(() => (self.loadingLearner = false))
    },
    // searchProducts() {
    //   if (this.productSearch == '') {
    //     this.products = this.originalProducts
    //     return
    //   }

    //   var searchedProducts = []
    //   for (var i = 0; i < this.originalProducts.length; i++) {
    //     var productName = this.originalProducts[i]['name'].toLowerCase()
    //     if (productName.indexOf(this.productSearch.toLowerCase()) >= 0) {
    //       searchedProducts.push(this.originalProducts[i])
    //     }
    //   }

    //   this.products = searchedProducts
    // },
    // async getProducts () {
    //   const data = {
    //     page: this.page
    //   }
    //   await this.$store.dispatch('products/all', data).then(response => {
    //     this.products = response.data.data
    //     this.length = response.data.last_page
    //   })
    // },
  },
   watch: {
      productSearch(value) {
        if (!value) {
          return
        }
        // Debounce the input and wait for a pause of at
        // least 200 milliseconds. This can be changed to
        // suit your needs.
        debounce(this.makeSearch, 200)(value, this)
      }
    }
}
</script>
<style lang="scss" scoped>
.search-btn {
  height: 40px !important;
}

.search-box {
  border: none;
  border: solid 1px #33333333 !important;
  border-radius: 40px !important;
}
</style>
