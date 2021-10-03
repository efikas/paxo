<template>
  <v-container py-16>
    <h3>Showing Search Results for: {{ $route.query.str | capitalize }}</h3>
    <v-divider class="my-6"></v-divider>

    <v-row v-if="loading">
      <v-col md="3" v-for="i in 4"  :key="i">
        <v-skeleton-loader type="image,article"></v-skeleton-loader>
      </v-col>

    </v-row>
    <v-row v-else-if="products.length == 0">
      <v-col class="text-center py-16" >
        <h4>Whoops!</h4>
        <p>No product was found for this search criteria</p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col md="3" v-for="i in products" :key="i.id">
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
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      loading: true,
    }
  },
  watch: {
    '$route.query.str': function () {
      this.getProducts()
    },
  },
  methods: {
    async getProducts() {
      this.loading = true
      const data = {
        search: this.$route.query.str,
      }
      await this.$store
        .dispatch('products/search', data)
        .then((response) => {
          this.products = response.data
          this.loading = false
        })
        .catch((error) => {

          this.loading = false
        })
    },
  },
  mounted() {
    this.getProducts()
  },
}
</script>
