<template>
  <v-container>
    <h3 class="font-weight-medium mt-8">
      Shopping Cart
    </h3>
    <v-divider color="#00C3B7"></v-divider>
    <div class="mt-5 hidden-sm-and-down" id="shopTable" :class="{ 'px-4': $vuetify.breakpoint.smAndDown, 'p10p': $vuetify.breakpoint.mdAndUp }">
      <v-row>
          <v-col md="6">Product</v-col>
          <v-col md="2">Price</v-col>
          <v-col md="2">Quantity</v-col>
          <v-col md="2">Total</v-col>
      </v-row>
      <v-divider></v-divider>
      
      <v-row v-if="StoreCart.length == 0">
        <v-col md="12" class="d-flex align-center text-center pa-10">
          <p>Your cart is empty!</p>
        </v-col>
      </v-row>

      <div v-for="(i, index) in StoreCart" :key="index" class="d-flex"  :class="{'half-faded': isOutOfStock(i) == 'outofstock'}">
      <div style="width: 100%">
        <v-row class="table-row">
          <v-col md="6" class="py-3"><div class="d-flex align-center">
              <img :src="i.avatar" width="100px" alt="" class="br-all-5" />
              <nuxt-link :to="'/single-product?product_id=' + i.id">
                <p class="ml-8">{{ i.name }}</p>
              </nuxt-link>
            </div></v-col>
          <v-col md="2" class="d-flex align-center">
            &#8358;{{
              (isAuthenticated
                ? user.role == 'wholesaler' || user.role == 'next_champ'
                  ? i.wholesale_price
                  : i.price
                : i.price) | formatPrice
            }}</v-col>
          <v-col md="2" class="d-flex align-center"> 
              <v-btn v-if="isOutOfStock(i) == 'outofstock'"
                outlined
                small
                color="error"
                class="br-all-5 text-caption error-text" 
                >
                <v-icon small> mdi-close-circle-outline</v-icon>
                &nbsp;&nbsp;Out of Stock</v-btn>
              
            <div v-else class="qty-box pa-2 br-all-5">
              <v-btn
                icon
                small
                :class="(i.quantity > 1) ? 'primary' : 'grey'"
                @click="
                  i.quantity > 1 ? updateQuantity(i.quantity - 1, i) : null
                "
                ><v-icon style="color:white">ri-subtract-fill</v-icon></v-btn
              >
              <p class="ma-0">{{ i.quantity }}</p>
              <v-btn
              class="primary"
                @click="
                  i.quantity + 1 > i.stock_quantity
                    ? $toast.error('Out of stock')
                    : updateQuantity(i.quantity + 1, i)"
                icon
                small
                ><v-icon style="color:white">ri-add-fill</v-icon></v-btn
              >
            </div>
          </v-col>
          <v-col md="2" class="d-flex align-center">
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
            }}</span></v-col>
      </v-row>
      </div>
      <div class="ml-3 d-flex align-center"><v-icon color="error"  @click="removeItem(index, i), calculateSubtotal()"
              >{{ (isOutOfStock(i) == 'outofstock') ? 'mdi-delete' : 'mdi-delete-outline'}}</v-icon></div>
    </div>
    </div>


    <div class="mx-auto hidden-md-and-up" id="shopListf" tile>
      <div v-for="(i, index) in StoreCart" :key="index" class="d-flex"  :class="{'half-faded': isOutOfStock(i) == 'outofstock'}">
        <div class="table-row pa-1">
          <v-row>
              <v-col class="d-flex">
                <img :src="i.avatar" width="130px" class="br-all-5 mr-4" alt="" />
                <div class="">
                  <nuxt-link :to="'/single-product?product_id=' + i.id">
                    <p class="black--text" style="font-size: 18px">{{ i.name }}</p>
                </nuxt-link>
                <v-btn
                outlined
                small
                :color="(isOutOfStock(i) == 'outofstock') ? 'error' : 'primary'"
                class="br-all-5 text-caption" 
                :class="(isOutOfStock(i) == 'outofstock') ? 'error-text' : 'primary-text'" 
                >
                <v-icon small>{{ (isOutOfStock(i) == 'outofstock') ? 'mdi-close-circle-outline' : 'mdi-check-circle-outline' }} </v-icon>
                &nbsp;&nbsp;{{ (isOutOfStock(i) == 'outofstock') ? 'Out of Stock' : 'in Stock' }}</v-btn>
                <div class="pt-2" style="font-size: 18px">
                  &#8358;{{
                    (isAuthenticated
                      ? user.role == 'wholesaler' || user.role == 'next_champ'
                        ? i.wholesale_price
                        : i.price
                      : i.price) | formatPrice
                  }}
                </div>
                </div>
              </v-col>
            </v-row>
            <v-row
              class="mb-0 mt-4 d-flex justify-space-between"
            >
              <div class="">
                <p
                  class=" ml-4 mt-2 ma-0 pa-0"
                  style="color: red; font-size: 16px"
                  @click="removeItem(index, i), calculateSubtotal()"
                >
                <v-icon color="error"  @click="removeItem(index, i), calculateSubtotal()"
              >{{ (isOutOfStock(i) == 'outofstock') ? 'mdi-delete' : 'mdi-delete-outline'}}</v-icon>
                  Remove
                </p>
              </div>
            <div class="qty-box pa-2 br-all-5 mr-5 mb-1" style="height: 45px;">
              <v-btn
                icon
                small
                :class="(i.quantity > 1) ? 'primary' : 'grey'"
                @click="
                  i.quantity > 1 ? updateQuantity(i.quantity - 1, i) : null
                "
                ><v-icon style="color:white">ri-subtract-fill</v-icon></v-btn
              >
              <p class="ma-0 mt-1">{{ i.quantity }}</p>
              <v-btn
              class="primary"
                @click="
                  i.quantity + 1 > i.stock_quantity
                    ? $toast.error('Out of stock')
                    : updateQuantity(i.quantity + 1, i)"
                icon
                small
                ><v-icon style="color:white">ri-add-fill</v-icon></v-btn
              >
            </div>
            </v-row>
        </div>
      </div>
      <v-list-item v-if="StoreCart.length == 0">
        <v-list-item-content class="text-center pa-10">
          <v-list-item-title>Your cart is empty!</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>

    <v-row class="mt-8" :class="{ 'px-4': $vuetify.breakpoint.smAndDown, 'p10p': $vuetify.breakpoint.mdAndUp }">
      <v-col md="3" cols="12">
        <!-- <v-btn @click="$router.go(-1)" class="secondary" block text large>
          <v-icon>ri-arrow-left-line</v-icon> Back to Shop</v-btn
        > -->
      </v-col>
      <v-col offset-md="4" md="5" cols="12">
        <div class="shopping-total pa-5 mr-6">
          <div class="header">
            <p>Subtotal</p>
            <p>&#8358;{{ subtotal | formatPrice }}</p>
          </div>
          <v-divider class="mb-6"></v-divider>
          <!-- <div class="pb-6" v-for="(i, index) in StoreCart.filter(item => isOutOfStock(item) != 'outofstock')" :key="index">
            <p>
              {{ i.name }} <br />
              x {{ i.quantity }}
            </p>
            <v-divider></v-divider>
          </div> -->
          <v-btn class="primary black--text br-all-5" large block text to="/checkout"
          ><span style="color: white">Proceed to Checkout</span></v-btn>
        </div>
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
        //console.log(response);
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
      console.log(this.StoreCart);
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
      //console.log(item)
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
<style lang="scss">
.v-data-table#shopTable table {
  // border-collapse: separate !important; 
  border-spacing: 3rem !important;

  
}
</style>

<style lang="scss" scoped>
h1 {
  font-size: 48px;
  font-weight: 600;
}

.half-faded * {
  opacity: .7;
}


thead {
  // background-color: #f1f1f1;
  background-color: white;
  border-bottom: solid 2px grey;
  th {
    font-size: 14px !important;
    color: #000 !important;
    font-weight: 600;
  }
}
td {
  font-size: 16px !important;
  // background-color: white !important;
  color: #8193a5;
}
.table-row {
    border: 2px solid  #66666633;
    margin-top: 30px !important;
    margin-bottom: 10px !important;
    border-radius: 0.4rem !important;
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
  border: 0px solid #bfbfbf;
  border-radius: 10px;
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
