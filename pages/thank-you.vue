<template>
  <v-container>
    <div class="text-center">
      <img src="../static/assets/thankyou.jpeg" alt="" />
      <p>Thank you for shopping with us!</p>
      <v-btn class="primary" to="/" text large>Continue</v-btn>
    </div>
    <v-row v-if="isAuthenticated">
      <v-col cols="12">
        <h1>Wish List</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col
        v-for="i in wishlist"
        :key="i.id"
        class="pa-8"
        :class="{
          'px-8': $vuetify.breakpoint.mdAndUp,
          'px-4': $vuetify.breakpoint.smAndDown,
        }"
        md="3"
        cols="6"
      >
        <product-display
        v-if="i.product != undefined"
          :vendor="i.product.brand ? i.product.brand.name : null"
          :product_name="i.product.name"
          rating="5"
          :price="i.product.price"
          :image="i.product.avatar"
          :badge="i.product.stock_status"
          :description="i.product.description"
          :short_description="i.product.short_description"
          :product_object="i.product"
          :regular_price="i.product.regular_price"
          :wholesale_price="i.product.wholesale_price"
          :product_id="i.product.id"
        />
      </v-col>
    </v-row>
    <span v-else></span>
    <v-row>
      <v-col cols="12">
        <h1>Offers</h1>
        <v-divider></v-divider>
      </v-col>
      <v-col
        v-for="i in offers"
        :key="i.id"
        class="pa-8"
        :class="{
          'px-8': $vuetify.breakpoint.mdAndUp,
          'px-4': $vuetify.breakpoint.smAndDown,
        }"
        md="3"
        cols="6"
      >
        <product-display
          :vendor="i.brand ? i.brand.name : null"
          :product_name="i.name"
          rating="5"
          :price="i.price"
          :image="i.avatar"
          :badge="i.stock_status"
          :description="i.description"
          :short_description="i.short_description"
          :product_object="i"
          :regular_price="i.regular_price"
          :wholesale_price="i.wholesale_price"
          :product_id="i.id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      script: [
        {
          src: 'https://code.jquery',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  data() {
    return {
      wishlist: [],
      offers: [],
    }
  },
  mounted() {
    this.getWishList()
    this.getOffers()
  },
  methods: {
    async getWishList() {
      if (!this.isAuthenticated) {
        return
      }
      await this.$store
        .dispatch('products/wishlist')
        .then((response) => {
          //console.log(response.data)
          if (response.data) {
            this.wishlist = response.data.filter(item => item.product != undefined)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getOffers() {
      const data = {
        page: 1,
      }
      await this.$store.dispatch('products/offers', data).then((response) => {
       
        if (Array.isArray(response.data)) {
          this.offers = response.data.splice(0, 8)
        } else {
          if (response.data != null) {
            this.offers = Object.values(response.data).splice(0, 8)
          }
        }
      })
    },
  },
}
</script>
