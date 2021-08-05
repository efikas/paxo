<template>
  <v-container>
    <div class="text-center pb-16">
      <h1>Shipping Information</h1>
      <!-- {{user.deliveryMethod}} -->
    </div>
    <v-row>
      <v-col md="8" cols="12">
        <div class="contact-card pa-4">
          <v-row>
            <v-col md="2" class="pb-">
              <p class="py-0 my-0">Contact</p>
              <p v-if="user.deliveryMethod == '1'" class="py-0 my-0">Ship to</p>
            </v-col>
            <v-col md="6" class="pb-">
              <p class="py-0 my-0 fade">{{ user.mobile }}</p>
              <p v-if="user.deliveryMethod == '1'" class="py-0 my-0 fade">{{ user.address }}</p>
            </v-col>
            <v-col class="text-right">
              <nuxt-link to="/checkout">Change</nuxt-link><br />
              <nuxt-link v-if="user.deliveryMethod == '1'" to="/checkout">Change</nuxt-link>
            </v-col>
          </v-row>
        </div>
        <v-form lazy-validation v-model="valid" ref="form">
          <h3 class="mt-12">Shipping Method</h3>
          <div class="contact-card pa-4">
            <!-- <v-radio-group
              v-model="shippingmethod"
              required
              :rules="[
                (v) => !!v || 'Please select your preferred shipping method',
              ]"
            >
              <v-radio
                :label="i.description"
                :value="i.id"
                v-for="(i, index) in shippingMethods"
                :key="index"
                @change="calculateShippingPrice()"
              >
              </v-radio>
            </v-radio-group> -->
            <p>Delivery to:</p>
            <p>{{ user.deliveryMethod == '1' ? user.address : 'Local Pickup: (3 Billings Way, Oregun, Ikeja beside Fan Milk)' }}</p>
          </div>
          <br />
            <h3 class="">Have a Coupon?</h3>
          <div class="contact-card pa-4 mb-6">
            <v-form lazy-validation ref="coupon" v-model="valid">
              <v-text-field
                outlined style="width: 300px;" label="Enter your Coupon Code"
                v-model="code"
                required
                :rules="[(v) => !!v || 'Please enter coupon code']"
              ></v-text-field>
              <v-btn
                :loading="loading"
                @click="$refs.coupon.validate() ? applyCoupon() : null"
                text
                outlined
                large
                >Apply</v-btn
              >
            </v-form>
          </div>
          <h3>Payment Options</h3>
          <div class="contact-card pa-4">
            <v-radio-group
              v-model="paymentoption"
              required
              :rules="[(v) => !!v || 'Please selection a payment option']"
            >
              <v-radio label="Pay with your wallet" :disabled="user.balance == '0'" value="1"></v-radio>
              <p class="ml-8">
                Your Wallet Balance: &#8358;{{ user.balance | formatPrice }}
              </p>
              <v-radio label="Pay with a Debit Card" value="0"></v-radio>
            </v-radio-group>
          </div>

          <v-btn
            large
            text
            class="primary mt-12"
            :loading="loading"
            @click="$refs.form.validate() ? confirmDialog = true : null"
            >Complete Order</v-btn
          >
        </v-form>
        <paystack
          :amount="order.order_balance * 100"
          :email="user.email"
          :paystackkey="paystackkey"
          :reference="reference"
          :callback="callback"
          :close="close"
          :embed="false"
          id="paystack"
          style="visibility: hidden"
        >
          <i class="fas fa-money-bill-alt"></i> Make Payment
        </paystack>
      </v-col>
      <v-col md="4">
        <h3>Your Order</h3>
        <div class="checkout-order">
          <v-row>
            <v-col>
              <h5>product</h5>
            </v-col>
            <v-col class="text-right">
              <h5>total</h5>
            </v-col>
          </v-row>
          <v-divider class="my-6"></v-divider>
          <div class="" v-for="(i, index) in StoreCart" :key="index">
            <p>
              {{ i.name }} <br />{{ i.quantity }} x &#8358;{{
                (isAuthenticated
                ? user.role == 'wholesaler'
                  ? i.wholesale_price
                  : i.price
                : i.price) | formatPrice
              }}
            </p>
            <v-divider class="pb-6"></v-divider>
          </div>
          <div>
            <v-row>
              <v-col>
                <h5>subtotal</h5>
              </v-col>
              <v-col class="text-right">
                &#8358;{{ subtotal | formatPrice }}
              </v-col>
            </v-row>
            <v-divider class="my-6"></v-divider>
            <v-row v-if="discount_percent">
              <v-col>
                <h5>discount</h5>
              </v-col>
              <v-col class="text-right">
                - &#8358;{{ discount | formatPrice}}
              </v-col>
            </v-row>
            <v-divider v-if="discount_percent" class="my-6"></v-divider>
            <v-row>
              <v-col>
                <h5>shipping</h5>
              </v-col>
              <v-col class="text-right">
                &#8358;{{ user.deliveryfee | formatPrice }}
              </v-col>
            </v-row>
            <v-divider class="my-6"></v-divider>
            <v-row>
              <v-col>
                <!-- <h5>shipping</h5> -->
              </v-col>
              <v-col class="text-right font-weight-bold">
                &#8358;{{
                  (subtotal + parseInt(user.deliveryfee)) | formatPrice
                }}
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-dialog width="400" v-model="confirmDialog" overlay-color="#36bdb4" overlay-opacity="0.9">
      <v-card class="pa-6 text-center">
        <h3>Proceed to payment?</h3>
        <p>Are you sure you want to proceed to paying for this order? Please note that this step is irreversible!</p>

        <v-btn outlined text @click="confirmDialog = false">Cancel</v-btn>
        <v-btn class="primary" :loading="loading" @click="createOrder()">Proceed</v-btn>

      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import paystack from 'vue-paystack'
export default {
  transition: 'default',
  components: {
    paystack,

  },
  data() {
    return {
      confirmDialog: false,
      valid: true,
      loading: false,
      shippingMethods: [],
      shippingmethod: '',
      paymentoption: '',
      order: [],
      shippingprice: 0,
      subtotal: 0,
      total: 0,
      discount_percent: '',
      discount: '',
      paystackkey: 'pk_test_e88a1928368226327d9382a6c67c82749f30ec13',
      reference: '',

      code: ''
    }
  },
  computed: {
    ...mapGetters('products', ['StoreCart']),
    ...mapGetters('auth', ['user', 'isAuthenticated']),
  },
  mounted() {
    // if (this.$gtm.enabled()) {
    //     alert('yesss')
    // }
    this.getShippingMethods()
    this.calculateSubtotal()
    this.createReference()
    // (isAuthenticated ? (user.role == 'wholesaler' ? i.wholesale_price : i.price) : i.price) | formatPrice
    if(this.user.role == 'wholesaler'){
      console.log(this.StoreCart)
      this.StoreCart.price = this.StoreCart.wholesale_price
    }
  },
  watch: {
    discount_percent: function () {
      this.calculateSubtotal ()
    }
  },
  methods: {
    clickPaystack() {
      document.getElementById('paystack').click()
    },
    calculateShippingPrice() {
      // this.shippingprice = this.shippingMethods.find(
      //   (x) => x.id === this.shippingmethod
      // ).price
      this.total = parseInt(this.subtotal) + parseInt(this.user.deliveryfee)
    },
    calculateSubtotal() {
      this.subtotal = 0
      for (var i = 0; i < this.StoreCart.length; i++) {
        this.subtotal +=
          parseInt(this.StoreCart[i].quantity) *
          parseInt(
            this.isAuthenticated
              ? this.user.role == 'wholesaler'
                ? this.StoreCart[i].wholesale_price
                : this.StoreCart[i].price
              : this.StoreCart[i].price
          )
      }
     if(this.discount_percent){
       this.discount = ((this.discount_percent/100) * this.subtotal)
       this.subtotal -= this.discount

     }
    },
    callback: function (response) {
      this.makeOrder()
    },
    close: function () {
      this.createReference()
    },
    createReference() {
      let text = ''
      let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      this.reference = `PAXO_WEB_${text}`
    },
     async applyCoupon () {
      this.loading = true
      const data = {
        code: this.code
      }
      await this.$store.dispatch('order/applycoupon',data).then(response => {
        this.$toast.success(response.message)
        this.loading = false
        this.discount_percent = response.data.percentage
        this.$refs.coupon.reset()
      }).catch(error => {
        this.$toast.error(error.response.data.message)
        this.loading = false
        this.$refs.coupon.reset()
      })
    },
    async makeOrder() {
      this.loading = true
      const data = {
        order_id: this.order.order.id,
        reference: this.reference,
        amount: this.order.order_balance,
        channel: this.paymentoption == '1' ? 'wallet' : 'card',
        total_product: this.subtotal
      }
      await this.$store
        .dispatch('products/storeorder', data)
        .then((response) => {


          // var dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: response.data.order.order_number, // Transaction ID. Required
              affiliation: 'Online Store', // default value is Online Store
              value: this.order.order_balance, // Total transaction value (does not include tax and shipping)
              tax: '0.00',
              shipping: this.user.deliveryfee,
              coupon: this.code,
              payment_method: this.paymentoption == '1' ? 'wallet' : 'card', // either 'card' or 'wallet'
              shipping_zone: 'SW', // geo-zone shipped to
              shipping_location: this.user.state, // state being shipped to
              shipping_tier: 'Local pickup', // see details below
              account_type: this.user.role == 'user' || this.user.role == 'staff' ? 'RETAILER' : 'WHOLESALER',
              customer_type: 'returning', // Add a code to tell whether this is a new customer or returning.
              gift_item: 'YES', // This is boolean
              currency: 'NGN', // This value is constant
              // items: [
              //   {
              //     // List of productFieldObjects.
              //     item_name: 'KINDII diapers', // Name or ID is required.
              //     item_id: '12345', // ID of individual item
              //     price: '5500.00',
              //     item_brand: 'KINDII',
              //     item_category: 'babys',
              //     item_category2: 'new born', // Need to set a maximum number of categories for the entire store
              //     quantity: 1,
              //     discount: '', // leave empty
              //     coupon: '', // leave empty string.
              //   },
              //   {
              //     item_name: 'Tea tree face mask',
              //     item_id: '67890',
              //     price: '1000',
              //     item_brand: 'Tea Tree',
              //     item_category: 'Shirts',
              //     quantity: 1,
              //     discount: '', // leave empty
              //     coupon: '', // leave empty.
              //   },
              // ], //expand this array if more product exists (make this expand based on number of items ordered)
              items: this.StoreCart
            },
          })
        })
        // setTimeout(() => {
          this.$toast.success(response.message)
          this.loading = this.confirmDialog = false
          this.$store.commit('products/CLEAR_CART')
          this.$router.push('/thank-you')
          this.getUser()
        // },3000)
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    async createOrder() {
      this.loading = true
      const payload = {
        shipping_id: this.user.shipping_id,
        address: this.user.address,
        country: 'Nigeria',
        device: 'web',
        email: this.user.email,
        phone: this.user.mobile,
        city: this.user.city,
        set_paid: 1,
        use_wallet: this.paymentoption,
        product: this.StoreCart,
        reference: this.reference,
        total: this.subtotal + parseInt(this.user.deliveryfee),
        total_product: this.subtotal
      }
      await this.$store
        .dispatch('products/makeorder', payload)
        .then((response) => {
          this.$toast.success(response.message)
          this.getUser()
          this.loading = false
          this.order = response.data
          this.order.order_balance > 0
            ? this.clickPaystack()
            : (this.$store.commit('products/CLEAR_CART'),
              this.$router.push('/'))
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = this.confirmDialog = false
        })
    },
    async getShippingMethods() {
      await this.$store.dispatch('auth/shipping').then((response) => {
        this.shippingMethods = response.data
      })
    },

     async getUser() {
      await this.$store.dispatch('auth/getuser').then((response) => {
        // this.shippingMethods = response.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.contact-card {
  border: 1px solid #d1d1d1;
  border-radius: 4px !important;
  p.fade {
    color: #666;
  }
}
h1 {
  font-size: 48px;
  font-weight: 600;
}
h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
p {
  font-weight: 400;
  color: #000;
  font-size: 14px;
}
h5 {
  font-size: 14px;
  color: #000;
  font-weight: 600;
  text-transform: uppercase;
}
a {
  text-decoration: none;
}
.checkout-order {
  padding: 30px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 2px solid #eaeaea;
}
</style>
