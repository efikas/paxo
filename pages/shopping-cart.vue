<template>
  <v-container>
    <div class="text-center pb-16">
      <h1>Shopping Cart</h1>
    </div>
    <v-simple-table>
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in StoreCart" :key="index">
          <td class="py-5">
            <div class="d-flex align-center">
              <img :src="i.avatar" width="100px" alt="" />
              <nuxt-link to="/single-product">
                <p class="ml-8">{{ i.name }}</p>
              </nuxt-link>
            </div>
          </td>

          <td>&#8358;{{ i.price | formatPrice }}</td>
          <td>
            <div class="qty-box pa-2">
              <v-btn
                icon
                small
                @click="
                  i.quantity > 1 ? (i.quantity -= 1) : null, calculateSubtotal()
                "
                ><v-icon>ri-subtract-fill</v-icon></v-btn
              >
              <p class="ma-0">{{ i.quantity }}</p>
              <v-btn @click=";(i.quantity += 1), calculateSubtotal()" icon small
                ><v-icon>ri-add-fill</v-icon></v-btn
              >
            </div>
          </td>
          <td>
            &#8358;{{
              (parseInt(i.price) * parseInt(i.quantity)) | formatPrice
            }}
          </td>
          <td class="text-right">
            <v-icon @click="removeItem(index), calculateSubtotal()">ri-close-line</v-icon>
          </td>
        </tr>
        <tr v-if="StoreCart.length == 0">
          <td colspan="5" class="text-center pa-10">
            <p>Your cart is empty!</p>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-row class="mt-8">
      <v-col md="3">
        <v-btn @click="$router.go(-1)" class="secondary" block text large>
          <v-icon>ri-arrow-left-line</v-icon> Back to Shop</v-btn
        >

      </v-col>
      <v-col offset-md="5" md="4">
        <div class="shopping-total pa-5">
          <div class="header">
            <p>Subtotal</p>
            <p>&#8358;{{ subtotal | formatPrice }}</p>
          </div>
          <v-divider class="mb-6"></v-divider>
          <div class="pb-6" v-for="(i, index) in StoreCart" :key="index">
            <p>
              {{ i.name }} <br />
              x {{ i.quantity }}
            </p>
            <v-divider></v-divider>
          </div>
        </div>
        <v-btn class="primary black--text" large block text to="/checkout"
          >Proceed to Checkout</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      subtotal: 0,

    }
  },
  mounted() {
    this.calculateSubtotal()
  },
  methods: {

    calculateSubtotal() {
      this.subtotal = 0
      for (var i = 0; i < this.StoreCart.length; i++) {
        this.subtotal +=
          parseInt(this.StoreCart[i].quantity) *
          parseInt(this.StoreCart[i].price)
      }
    },
    removeItem(index) {
      this.$store.dispatch('products/removeFromCart', index)
    },
  },
  computed: {
    ...mapGetters('products', ['StoreCart']),
  },
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 600;
}
thead {
  background-color: #f1f1f1;
  th {
    font-size: 14px !important;
    color: #000 !important;
    font-weight: 600;
  }
}
td {
  font-size: 16px !important;
  color: #8193a5;
}

.qty-box {
  border: 0.5px solid #666;
  display: flex;
  justify-content: space-between;
  width: 120px;
  p {
    color: #000 !important;
  }
}

a {
  color: #0066cc !important;
  text-decoration: none;
}
.shopping-total {
  margin-bottom: 30px;
  padding: 30px 35px;
  background-color: #f1f1f1;
  border: 1px solid #bfbfbf;
  p {
    font-size: 14px !important;
    color: #000000de !important;
  }

  .header {
    font-size: 16px !important;
    color: #666 !important;
    display: flex;
    justify-content: space-between;
  }
}
</style>
