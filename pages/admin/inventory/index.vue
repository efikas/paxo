<template>
    <v-container fluid>
      <h2>Inventory</h2>
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
          { text: 'Regular Price', value: 'regular_price' },
          { text: 'Sale Price', value: 'sale_price' },
          { text: 'Wholesale Price', value: 'wholesale_price' },
          { text: 'Quantity in Stock', value: 'stock_quantity' },
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
            // console.log(response.data.data)
            this.real_products = response.data
            this.filtered_products = this.real_products
            this.length = response.data.last_page
            this.pageinationLength = Math.ceil(this.filtered_products.length / this.perPage)
            this.toPage(1)
            this.loading = false
          })
      },
    },
  }
  </script>
  