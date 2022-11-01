<template>
  <v-container fluid>
    <h2>Products</h2>
    <v-card class="pa-6 mt-4">
      <v-row>
        <v-col md="3">
          <v-text-field
            outlined
            dense
            placeholder="Search"
            prepend-inner-icon="search"
            v-model="search"
          ><span>{{ computeProduct }}</span>
          </v-text-field>
        </v-col>
        <v-col md="3" offset-md="6">
          <v-btn class="primary" to="/admin/products/add-new" block text>
            <v-icon>add</v-icon> Add New Product
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :loading="loading"
        :items-per-page="perPage"
        hide-default-footer
        :items="products"
        :headers="headers"
      >
        <template v-slot:item.avatar="{ item }">
          <img :src="item.avatar" width="100" alt="" />
        </template>
        <template v-slot:item.price="{ item }">
          &#8358;{{ item.price | formatPrice }}
        </template>
        <template v-slot:item.description="{ item }">
          <div v-html="item.description"></div>
        </template>
        <template v-slot:item.stock_quantity="{ item }">
          {{ item.stock_quantity }}
          <v-chip
            small
            :color="item.stock_status == 'instock' ? 'success' : 'error'"
            >{{ item.stock_status }}</v-chip
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn :to="'/admin/products/edit-product?productId=' + item.id" icon
            ><v-icon color="success">edit</v-icon></v-btn
          >
          <v-btn icon @click="deleteProduct(item.id)"
            ><v-icon color="error">delete</v-icon></v-btn
          >
        </template>
        <template v-slot:item.wholesale_price="{ item }">
          &#8358;{{ item.wholesale_price | formatPrice }}
        </template>
      </v-data-table>
      <v-pagination
        class="mt-16"
        :length="pageinationLength"
        :total-visible="7"
        v-model="page"
        @input="toPage"
        @next="next"
        @previous="previous"
      ></v-pagination>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  search: '',
  computed: {
    computeProduct() {
      this.filtered_products = this.real_products.filter(item => {
         return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
      this.pageinationLength = Math.ceil(this.filtered_products.length / this.perPage)
      this.toPage(1)

      return ""
    },
  },
  data() {
    return {
      search: '',
      page: 1,
      pageinationLength: 1,
      perPage: 50,
      length: 1,
      products: [],
      real_products: [],
      filtered_products: [],
      loading: false,
      headers: [
        { text: 'Product Image', value: 'avatar' },
        { text: 'Product Name', value: 'name' },
        { text: 'Short Description', value: 'short_description' },
        // { text: 'Brand', value: 'product.brand.name' },
        { text: 'Price', value: 'price' },
        { text: 'Wholesales Price', value: 'wholesale_price' },
        // { text: 'Quantity in Stock', value: 'stock_quantity' },
        // { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    toPage(page){
      this.page = page
      let start = (this.perPage * (page - 1))
      let end = (this.perPage * page)
      this.products = this.filtered_products.slice(start, end);
      window.scrollTo(0, 0);
    },
    next(){
      this.toPage(this.page)
    },
    previous(){
      this.toPage(this.page)
    },
    async getProducts() {
      this.loading = true
      const data = {
        page: this.page,
        category: '',
        brand: '',
        price: '',
      }
      // await this.$store.dispatch('products/all', data).then((response) => {
      //   this.products = response.data.data
      //   console.log(this.products)
      //   this.length = response.data.last_page
      //   this.loading = false
      // })
      await this.$store
        .dispatch('products/allproducts', this.page)
        .then((response) => {
          this.real_products = response.data
          this.filtered_products = this.real_products
          this.length = response.data.last_page
          this.pageinationLength = Math.ceil(this.filtered_products.length / this.perPage)
          this.toPage(1)
          this.loading = false
        })
    },
    async deleteProduct(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this product?') &&
        (await this.$store
          .dispatch('products/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getProducts()
          }))
    },
  },
}
</script>
