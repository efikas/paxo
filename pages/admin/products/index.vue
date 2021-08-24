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
          >
          </v-text-field>
        </v-col>
        <v-col md="3" offset-md="6">
          <v-btn class="primary" to="/admin/products/add-new" block text>
            <v-icon>add</v-icon> Add New Product
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :loading="loading" :items-per-page="80" hide-default-footer :items="products" :headers="headers" :search="search">
      <template v-slot:item.product.avatar="{item}">
        <img :src="item.product.avatar" width="100" alt="">
      </template>
      <template v-slot:item.product.price="{item}">
      &#8358;{{item.product.price | formatPrice}}
      </template>
      <template v-slot:item.description="{item}">
      <div v-html="item.description"></div>
      </template>
       <template v-slot:item.stock_quantity="{item}">
      {{item.stock_quantity}} <v-chip small :color="item.stock_status == 'instock' ? 'success' : 'error'">{{item.stock_status}}</v-chip>
      </template>
      <template v-slot:item.actions="{item}">
      <v-btn :to="'/admin/products/edit-product?productId='+item.id" icon ><v-icon color="success">edit</v-icon></v-btn>
      <v-btn icon @click="deleteProduct(item.id)"><v-icon color="error">delete</v-icon></v-btn>
      </template>
      <template v-slot:item.product.wholesale_price="{item}">
      &#8358;{{item.product.wholesale_price | formatPrice}}
      </template>
      </v-data-table>
      <v-pagination v-model="page" :length="length" @input="getProducts()"></v-pagination>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  search: '',
  data() {
    return {
      search: '',
      page: 1,
      length: 1,
      products: [],
      loading: false,
      headers: [
        { text: 'Product Image', value: 'product.avatar' },
        { text: 'Product Name', value: 'product.name' },
        { text: 'Short Description', value: 'product.short_description' },
        // { text: 'Brand', value: 'product.brand.name' },
        { text: 'Price', value: 'product.price' },
        { text: 'Wholesales Price', value: 'product.wholesale_price' },
        // { text: 'Quantity in Stock', value: 'stock_quantity' },
        { text: 'Status', value: 'product.status' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.getProducts()

  },
  methods: {
    async getProducts () {
      this.loading = true
      const data = {
        page: this.page,
        category: '',
        brand: '',
        price: ''
      }
      await this.$store.dispatch('products/all', data).then(response => {
        this.products = response.data.data
        this.length = response.data.last_page
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
  }
}
</script>
