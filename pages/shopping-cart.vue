<template>
  <v-container>
    <div class="text-center pb-4">
      <h1>Shopping Cart</h1>
    </div>
    <v-simple-table id="shopTable">
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
              
              <nuxt-link :to="'/single-product?product_id=' + i.id">
                <p class="ml-8">{{ i.name }}</p>
              </nuxt-link>
            </div>
          </td>

          <td>
            &#8358;{{
              (isAuthenticated
                ? user.role == 'wholesaler' || user.role == 'next_champ'
                  ? i.wholesale_price
                  : i.price
                : i.price) | formatPrice
            }}
          </td>

          <td>
            <!-- outofstock -->
            <!-- instock -->
            <v-chip v-if="isOutOfStock(i) == 'outofstock'"
              :class="'error'"
              style="float: right; border-radius: 0;"
              small
              >{{'Out of stock' }}
              </v-chip>
            <div v-else class="qty-box pa-2">
              <v-btn
                icon
                small
                @click="
                  i.quantity > 1 ? updateQuantity(i.quantity - 1, i) : null
                "
                ><v-icon>ri-subtract-fill</v-icon></v-btn
              >
              <p class="ma-0">{{ i.quantity }}</p>
              <v-btn
                @click="
                  i.quantity + 1 > i.stock_quantity
                    ? $toast.error('Out of stock')
                    : updateQuantity(i.quantity + 1, i)"
                icon
                small
                ><v-icon>ri-add-fill</v-icon></v-btn
              >
            </div>
          </td>
          <td>
           <span v-if="isOutOfStock(i) != 'outofstock'"> &#8358;{{
              (parseInt(
                isAuthenticated
                  ? user.role == 'wholesaler' || user.role == 'next_champ'
                    ? i.wholesale_price
                    : i.price
                  : i.price
              ) *
                parseInt(i.quantity))
                | formatPrice
            }}</span>
          </td>
          <td class="text-right">
            <v-icon @click="removeItem(index, i), calculateSubtotal()"
              >ri-close-line</v-icon
            >
          </td>
        </tr>
        <tr v-if="StoreCart.length == 0">
          <td colspan="5" class="text-center pa-10">
            <p>Your cart is empty!</p>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card class="mx-auto" id="shopList" tile>
      <v-list-item three-line v-for="(i, index) in StoreCart" :key="index">
        <v-list-item-content>
          <v-list-item-subtitle>
            <v-row>
              <v-col>
                <img :src="i.avatar" width="130px" alt="" />
              </v-col>
              <v-col class="py-6">
                <nuxt-link :to="'/single-product?product_id=' + i.id">
                  {{ i.name }}
                </nuxt-link>
                <p class="pt-2">
                  &#8358;{{
                    (isAuthenticated
                      ? user.role == 'wholesaler' || user.role == 'next_champ'
                        ? i.wholesale_price
                        : i.price
                      : i.price) | formatPrice
                  }}
                </p>
              </v-col>
            </v-row>

            <td class="text-right"></td>

            <v-row
              class="mb-2 ml-0"
              style="
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
              "
            >
              <div class="qty-box pa-2 mt-1">
                <v-btn
                  icon
                  small
                  @click="
                    i.quantity > 1 ? (i.quantity -= 1) : null,
                      calculateSubtotal()
                  "
                  ><v-icon>ri-subtract-fill</v-icon></v-btn
                >
                <p class="ma-0">{{ i.quantity }}</p>
                <v-btn
                  @click="
                    i.quantity + 1 > i.stock_quantity
                      ? $toast.error('Out of stock')
                      : (i.quantity += 1),
                      calculateSubtotal()
                  "
                  icon
                  small
                  ><v-icon>ri-add-fill</v-icon></v-btn
                >
              </div>
              <div style="padding-right: 15px">
                <p
                  class="mt-7 ma-0 pl-16 pa-0"
                  style="color: red; font-size: 16px"
                  @click="removeItem(index, i), calculateSubtotal()"
                >
                  Remove
                </p>
              </div>
            </v-row>
          </v-list-item-subtitle>
          <v-divider class="mt-6" horizontal></v-divider>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="StoreCart.length == 0">
        <v-list-item-content class="text-center pa-10">
          <v-list-item-title>Your cart is empty!</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>

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
          <div class="pb-6" v-for="(i, index) in StoreCart.filter(item => isOutOfStock(item) != 'outofstock')" :key="index">
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
    this.$store
      .dispatch('products/fetchcart')
      .then((response) => {
        console.log(response);
        if (response.status == true) {
          this.calculateSubtotal()
          // if (this.StoreCart.length > 0) {
          //   this.getUpdatedCart()
          // }
        }
      })
      .catch((error) => {
        this.$toast.error(error.response.data.error.message)
      })
  },
  watch: {
    // StoreCart(oldvalue, newValue){
    //   this.subtotal = 0
    //   if(newValue == null || newValue == undefined){
    //     return;
    //   }

    //   let inStoreCartItems = newValue.filter(item => item.stock_status != 'outofstock');
    
    //   for (var i = 0; i < inStoreCartItems.length; i++) {
    //     this.subtotal +=
    //       parseInt(inStoreCartItems[i].quantity) *
    //       parseInt(
    //         this.isAuthenticated
    //           ? this.user.role == 'wholesaler' || this.user.role == 'next_champ'
    //             ? inStoreCartItems.wholesale_price
    //             : inStoreCartItems.price
    //           : inStoreCartItems.price
    //       )
    //   }
    // }
  },
  methods: {
    calculateSubtotal() {
      this.subtotal = 0
      if(this.StoreCart == null || this.StoreCart == undefined){
        return;
      }

      let inStoreCartItems = this.StoreCart.filter(item => this.isOutOfStock(item) != 'outofstock');
      
      for (var i = 0; i < inStoreCartItems.length; i++) {
        this.subtotal +=
          parseInt(inStoreCartItems[i].quantity) *
          parseInt(
            this.isAuthenticated
              ? this.user.role == 'wholesaler' || this.user.role == 'next_champ'
                ? inStoreCartItems[i].wholesale_price
                : inStoreCartItems[i].price
              : inStoreCartItems[i].price
          )
      }
    },
    isOutOfStock(item){
      console.log(item)
      if(item.stock_status == 'outofstock'){
        return 'outofstock';
      }

      if(item.stock_quantity < item.quantity){
        return 'outofstock';
      }

      return ""
    },
    removeItem(index, product) {
      let data = {
        index,
        product
      }
      this.$store.dispatch('products/removeFromCart', data)
    },
    updateQuantity(count, product) {
      this.$store.dispatch('products/updateItemQuantity', {
        count: count,
        product: product,
      })
      .then((response) => {
        this.calculateSubtotal()
      })
    },
    async getUpdatedCart() {
      const products = await this.StoreCart.reduce(function (acc, obj) {
        return [...acc, obj.id]
      }, [])

      try {
        await this.$store
          .dispatch('products/refreshcart', products)
          .then((response) => {
            const newCart = response.data.map((cart) => {
              const stored = this.StoreCart.find((data) => data.id === cart.id)
              if (stored) {
                cart.quantity = stored.quantity
              }
              return cart
            })
            this.$store.commit('products/UPDATE_CART', newCart)
            this.$store.commit('products/ADD_CART_QUANTITY')
            this.calculateSubtotal()
          })
      } catch (error) {
        this.$toast.error(error)
      }
    },
  },
  computed: {
    ...mapGetters('products', ['StoreCart']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),
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
@media only screen and (max-width: 420px) {
  #shopTable {
    display: none;
  }
}
@media only screen and (min-width: 420px) {
  #shopList {
    display: none;
  }
}
</style>
