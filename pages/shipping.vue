<template>
  <v-container>
    <h4 class="font-weight-medium mt-8">
      Shipping Info
    </h4>
    <v-divider color="#00C3B7"></v-divider>
    <v-form lazy-validation v-model="valid" ref="form">
      <v-row class="mt-4 mb-10"  :class="{ 'px-4': $vuetify.breakpoint.smAndDown, 'p10p': $vuetify.breakpoint.mdAndUp }">
        <v-col md="6" cols="12">
          <h3>Shipping Method</h3>
          <div class="mt-4">
            <p class="py-0 my-0 font-weight-bold">Delivery type:</p>
            <p class="py-0 my-0">{{(user.deliveryMethod == '1') ? "Home Delivery" : "Local Pickup"}}</p>
          </div>
          <div class="mt-4" v-if="user.deliveryMethod == '1'">
            <p class="py-0 my-0 font-weight-bold">Home address:</p>
            <p class="py-0 my-0">{{user.address}}</p>
          </div>
          <div class="mt-4">
            <p class="py-0 my-0 font-weight-bold">Phone Number:</p>
            <p class="py-0 my-0">{{user.mobile}}</p>
          </div>
          <div class="mt-4">
            <p class="py-0 my-0 font-weight-bold">Name:</p>
            <p class="py-0 my-0">{{user.fullname}}</p>
          </div>

          <div class="mt-4"> <v-btn
              outlined
              small
              color="primary"
              class="primary-text mb-2 br-all-5 text-caption"
              to="/checkout"
              >
              Change</v-btn>
          </div>
          
          <!-- <div class="contact-card pa-4">
            <v-row>
              <v-col md="2" class="pb-">
                <p class="py-0 my-0">Contact</p>
                <p v-if="user.deliveryMethod == '1'" class="py-0 my-0">Ship to</p>
              </v-col>
              <v-col md="6" class="pb-">
                <p class="py-0 my-0 fade">{{ user.mobile }}</p>
                <p v-if="user.deliveryMethod == '1'" class="py-0 my-0 fade">
                  {{ user.address }}
                </p>
              </v-col>
              <v-col class="text-right">
                <nuxt-link to="/checkout">Change</nuxt-link><br />
              </v-col>
            </v-row>
          </div> -->
        
            <!-- <h3 class="mt-12">Shipping Method</h3>
            <div class="contact-card pa-4">
              <v-radio-group
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
              </v-radio-group>
              <p>Delivery to:</p>
              <p>
                {{
                  user.deliveryMethod == '1'
                    ? user.address
                    : 'Local Pickup: (3 Billings Way, Oregun, Ikeja beside Fan Milk)'
                }}
              </p>
            </div>
            <br /> -->
          
            <h3 class="mt-4">Payment Options</h3>
            <p class="py-0 my-0 font-weight-medium">Please select your preferred payment method</p>
            <div class="contact-cardj pa-4l">
              <v-radio-group
                v-model="paymentoption"
                required
                :rules="[(v) => !!v || 'Please selection a payment option']"
              >
                <v-radio
                  label="Pay with your wallet"
                  :disabled="user.balance == '0'"
                  value="1"
                >
                <template v-slot:label>
                <div>Pay with your wallet  <div class="text--disabled text-caption">Wallet Balance: &#8358;{{ user.balance | formatPrice }}</div></div>
                </template>
              </v-radio>
                <v-radio label="Paystack Gateway" value="0"></v-radio>
                <v-radio label="Polaris Gateway" value="2"></v-radio>
              </v-radio-group>
            </div>

            <h3 class="coupon-colorf mt-3">Have a Coupon?</h3>
            <div class="contact-cardh pa-4 mb-6 pr-10 mr-10">
              <v-form lazy-validation ref="coupon" v-model="valid">
                <v-row class="pr-0 pl-0">
                    <v-col cols="8" md="9" class="pr-0 pl-0">
                      <v-text-field
                        outlined
                        label="Enter Coupon Code"
                        v-model="code"
                        required
                        :rules="[(v) => !!v || 'Please enter coupon code']"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" md="3">
                      <v-btn
                        :loading="loading"
                        @click="$refs.coupon.validate() ? applyCoupon() : null"
                        primary
                        color="primary"
                        class="br-all-5"
                        large
                        block
                        height="56"
                        >Apply code</v-btn
                      >
                    </v-col>
                  </v-row>
                  <div class="mt-2">
                    <p class="py-0 my-0 font-weight-medium">Hot to get a Coupon Code?</p>
                    <p class="py-0 mt-2">Follow our news on the website, as well as subscribe to our social networks. So you will not only be able to receive up-to-date codes, but also learn about new products and promotional items.</p>
                  </div>
              </v-form>
            </div>

           
        
          <paystack
            :amount="order.order_balance * 100"
            :email="user.email"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :channels="channels"
            :close="close"
            :embed="false"
            id="paystack"
            style="visibility: hidden"
          >
            <i class="fas fa-money-bill-alt"></i> Make Payment
          </paystack>
        </v-col>
        <v-col md="6">
          <div class="checkout-order">
            <h4 class="font-weight-bold">Your Order</h4>
            <v-divider color="black" class="mb-4"></v-divider>
            <!-- <v-row>
              <v-col>
                <h5>product</h5>
              </v-col>
              <v-col class="text-right">
                <h5>total</h5>
              </v-col>
            </v-row>
            <v-divider class="my-6"></v-divider> -->
            <div 
            v-for="(i, index) in StoreCart.filter(
                (item) => item.stock_status != 'outofstock')" :key="index" class="d-flex my-2 br-all-5 product-item">
                  <div style="width: 100%;">
                    <v-row>
                      <v-col cols="10"  class="pky-3">
                        <div class="d-flex align-center" >
                          <img :src="i.avatar" width="60px" alt="" class="br-all-5" />
                          <div class="d-flex flex-column ml-4 mr-4">
                            <div class="text-caption text-black">{{ i.name }}</div>
                            <div class="text-caption mt-2">
                              &#8358;{{
                                (isAuthenticated
                                  ? user.role == 'wholesaler' || user.role == 'next_champ'
                                    ? i.wholesale_price
                                    : i.price
                                  : i.price) | formatPrice
                              }}</div>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="2"  class="py-3 d-flex align-center">
                      <span class="text-caption text-center">x {{ parseInt(i.quantity) }}</span>
                      </v-col>
                    </v-row>
                  </div>
            </div>
            <div class="shopping-total pa-10">
                    <div class="header">
                      <p>Subtotal</p>
                      <p>&#8358;{{ subtotal | formatPrice }}</p>
                    </div>
                    <div class="header" v-if="discount_percent">
                      <p>Discount on coupon code</p>
                      <p> - &#8358;{{ discount | formatPrice }}</p>
                    </div>
                    <div class="header">
                      <p>Shipping</p>
                      <p>&#8358;{{ user.deliveryfee | formatPrice }}</p>
                    </div>
                    <v-divider class="mb-6"></v-divider>
                    <div class="header mb-6">
                      <p class="font-weight-bold">Total</p>
                      <p class="font-weight-bold">&#8358;{{ (subtotal + parseInt(user.deliveryfee)) | formatPrice }}</p>
                    </div>
                    
                    <v-btn
                      v-if="paymentoption == '0'"
                      class="primary black--text br-all-5" large block text
                      :loading="loading"
                      @click="$refs.form.validate() ? (confirmDialog = true) : null"
                      ><span style="color: white">Complete Order</span></v-btn
                    >

                    <v-btn
                      v-if="paymentoption == '2'"
                      class="primary black--text br-all-5" large block text
                      :loading="loading"
                      @click="$refs.form.validate() ? (confirmDialog = true) : null"
                      ><span style="color: white">Complete Order</span></v-btn
                    >

                    <v-btn
                      v-if="paymentoption == '1'"
                      class="primary black--text br-all-5" large block text
                      :loading="loading"
                      @click="$refs.form.validate() ? (walletDialog = true) : null"
                      ><span style="color: white">Complete Order</span></v-btn
                    >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog
      width="400"
      v-model="confirmDialog"
      overlay-color="#141515"
      overlay-opacity="0.9"
    >
      <div class="pa-0 ma-0 br-all-10">
        <div class="text-center py-4" style="background-color: #00C3B7;">
          <h3 style="color:white;">
          Order Total: 
          </h3>
          <h4 style="color:white;" class="font-weight-medium">&#8358;{{ (subtotal + parseInt(user.deliveryfee)) | formatPrice }}</h4>
        </div>
        <div class="pa-6 text-center" style="background-color: white;">
          <p class="mb-6">
          Are you sure you want to proceed to paying for this order? Please note
          that this step is irreversible!
        </p>

        <v-btn outlined class="br-all-5" text @click="confirmDialog = false">Cancel</v-btn>
        <v-btn class="primary br-all-5" :loading="loading" @click="createOrder()"
          >Proceed</v-btn
        >
        </div>
      </div>
    </v-dialog>
    <v-dialog
      width="470"
      v-model="walletDialog"
      overlay-color="#141515"
      overlay-opacity="0.9"
    >
      <div class="text-center br-all-10">
        <div class="text-center py-4" style="background-color: #00C3B7;">
          <h3 style="color:white;">
          Order Total: 
          </h3>
          <h4 style="color:white;" class="font-weight-medium">&#8358;{{ (subtotal + parseInt(user.deliveryfee)) | formatPrice }}</h4>
        </div>
          <div class="pa-6 text-center" style="background-color: white;">
            <v-row
              v-if="
                subtotal + parseInt(user.deliveryfee) - parseInt(user.balance) > 0
              "
            >
              <v-col class="pb-0 text-center">
                <v-btn outlined text small class="br-all-5"
                  >Wallet Payment: &#8358;{{ user.balance | formatPrice }}</v-btn
                >
              </v-col>
              <v-col ma-0>
                <v-btn class="primary br-all-5" small
                  >Card Payment: &#8358;{{
                    (subtotal + parseInt(user.deliveryfee) - parseInt(user.balance))
                      | formatPrice
                  }}
                </v-btn>
              </v-col>
            </v-row>
            <v-col class="pb-0 text-center">
              <v-radio-group v-model="completepaymentoption">
                <v-radio label="Paystack Gateway" value="0"></v-radio>
                <v-radio label="Polaris Gateway" value="1"></v-radio>
              </v-radio-group>
            </v-col>
            <br />

            <p class="mt-0">
              Are you sure you want to proceed to paying for this order? Please note
              that this step is irreversible!
            </p>

            <v-btn outlined text class="br-all-5" @click="walletDialog = false">Cancel</v-btn>
            <v-btn class="primary br-all-5" :loading="loading" @click="createOrder2()"
              >Proceed</v-btn
            >
          </div>
      </div>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import paystack from 'vue-paystack'
import { FlutterwavePayButton } from 'flutterwave-vue-v3'
import mixpanel from "mixpanel-browser";

export default {
  transition: 'default',
  components: {
    paystack,
    FlutterwavePayButton,
  },
  data() {
    return {
      use_wallet_card: false,
      use_percent: false,
      confirmDialog: false,
      walletDialog: false,
      valid: true,
      loading: false,
      shippingMethods: [],
      shippingmethod: '',
      completepaymentoption: '0',
      paymentoption: '0',
      order: [],
      shippingprice: 0,
      subtotal: 0,
      total: 0,
      discount_percent: '',
      discount: '',
      paystackkey: 'pk_live_7c02e6083d7879d591e497d97392bf4a3e4697f5',
      // pk_live_7c02e6083d7879d591e497d97392bf4a3e4697f5
      reference: '',
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      code: '',
      totalweight: null,
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
    if (this.user.role == 'wholesaler' || this.user.role == 'next_champ') {
      // console.log(this.StoreCart)
      this.StoreCart.price = this.StoreCart.wholesale_price
    }
    this.calculateWeight()
  },
  watch: {
    discount_percent: function () {
      this.calculateSubtotal()
    },
  },
  methods: {
    makePaymentCallback(response) {
      console.log('Payment callback updated', response)

      if (
        response.status == 'successful' &&
        response.charge_response_code == '00'
      ) {
        !this.use_wallet_card ? this.makeOrder() : this.makeOrder2()
      }
    },
    getPaymentData() {
      return {
        tx_ref: this.reference,
        amount: this.order.order_balance,
        currency: 'NGN',
        payment_options: 'card,ussd',
        redirect_url: '',
        meta: {
          counsumer_id: '7898',
          consumer_mac: 'kjs9s8ss7dd',
        },
        customizations: {},
        customer: {
          name: this.user.first_name + '  ' + this.user.last_name,
          email: this.user.email,
          phone_number: this.user.mobile,
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal,
      }
    },
    closedPaymentModal() {
      // console.log('payment modal is closed');
    },
    getOrderBalance() {
      return this.order.order_balance ?? '0'
    },
    clickPaystack() {
      document.getElementById('paystack').click()
    },
    clickFlutterwave() {
      this.$payWithFlutterwave(this.getPaymentData())
    },
    calculateShippingPrice() {
      // this.shippingprice = this.shippingMethods.find(
      //   (x) => x.id === this.shippingmethod
      // ).price
      this.total = parseInt(this.subtotal) + parseInt(this.user.deliveryfee)
    },
    calculateSubtotal() {
      // console.log(this.StoreCart);
      this.subtotal = 0
      if (this.StoreCart == null || this.StoreCart == undefined) {
        return
      }

      let inStoreCartItems = this.StoreCart.filter(
        (item) => item.stock_status != 'outofstock'
      )

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
      if (this.discount_percent) {
        if (this.use_percent) {
          this.discount = (this.discount_percent / 100) * this.subtotal
        } else {
          this.discount = this.discount_percent
        }
        this.subtotal -= this.discount
      }
    },
    callback: function (response) {
      !this.use_wallet_card ? this.makeOrder() : this.makeOrder2()
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
    async applyCoupon() {
      this.loading = true
      const data = {
        code: this.code,
      }
      await this.$store
        .dispatch('order/applycoupon', data)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
          if (response.data.percentage != null) {
            this.use_percent = true
            this.discount_percent = response.data.percentage
          } else {
            this.use_percent = false
            this.discount_percent = response.data.coupon_amount
          }
          //this.$refs.coupon.reset()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
          //this.$refs.coupon.reset()
        })
    },
    async makeOrder() {
      this.loading = true
      const data = {
        order_id: this.order.order.id,
        reference: this.reference,
        amount: this.order.order_balance,
        channel:
          this.paymentoption == '1'
            ? 'wallet'
            : this.paymentoption == '2'
            ? 'polaris'
            : 'card',
        total_product: this.subtotal,
      }
      const self = this
      await this.$store
        .dispatch('products/storeorder', data)
        .then((response) => {
          // const res = response
          // var dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: self.order.order.order_number, // Transaction ID. Required
              affiliation: 'Online Store', // default value is Online Store
              value: self.subtotal, // Total transaction value (does not include tax and shipping)
              tax: '0.00',
              shipping: self.user.deliveryfee,
              coupon: self.code,
              payment_method:
                self.paymentoption == '1'
                  ? 'wallet'
                  : self.paymentoption == '2'
                  ? 'polaris'
                  : 'card', // either 'card' or 'wallet'
              shipping_zone: 'SW', // geo-zone shipped to
              shipping_location: this.user.state, // state being shipped to
              shipping_tier: 'Local pickup', // see details below
              account_type:
                self.user.role == 'user' || self.user.role == 'staff'
                  ? 'RETAILER'
                  : 'WHOLESALER',
              customer_type: 'returning', // Add a code to tell whether this is a new customer or returning.
              gift_item: '', // This is boolean
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
              items: self.StoreCart.filter(
                (item) => item.stock_status != 'outofstock'
              ),
            },
          })
          // setTimeout(() => {
          this.$toast.success(response.message)
          this.loading = this.confirmDialog = false
          this.getProfile()
          this.registerEvent()
          this.$router.push('/thank-you')
          this.$store.commit('products/CLEAR_CART')
          this.getUser().then((response) => {
            location.reload()
          })
          // },3000)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          console.log(error)
        })
    },
    async makeOrder2() {
      this.loading = true
      let _channel = 'wallet'
      if (this.use_wallet_card && this.completepaymentoption == '1') {
        _channel = 'wallet_polaris'
      } else if (this.use_wallet_card && this.completepaymentoption == '0') {
        _channel = 'wallet_card'
      }

      const data = {
        order_id: this.order.order.id,
        reference: this.reference,
        amount: this.order.order_balance,
        channel: _channel,
        total_product: this.subtotal,
      }
      const self = this
      await this.$store
        .dispatch('products/storeorder', data)
        .then((response) => {
          // const res = response
          // var dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: self.order.order.order_number, // Transaction ID. Required
              affiliation: 'Online Store', // default value is Online Store
              value: self.subtotal, // Total transaction value (does not include tax and shipping)
              tax: '0.00',
              shipping: self.user.deliveryfee,
              coupon: self.code,
              payment_method: self.paymentoption == '1' ? 'wallet' : 'card', // either 'card' or 'wallet'
              shipping_zone: 'SW', // geo-zone shipped to
              shipping_location: this.user.state, // state being shipped to
              shipping_tier: 'Local pickup', // see details below
              account_type:
                self.user.role == 'user' || self.user.role == 'staff'
                  ? 'RETAILER'
                  : 'WHOLESALER',
              customer_type: 'returning', // Add a code to tell whether this is a new customer or returning.
              gift_item: '', // This is boolean
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
              items: self.StoreCart,
            },
          })
          // setTimeout(() => {
          this.$toast.success(response.message)
          this.loading = this.confirmDialog = false
          this.getProfile()
          this.registerEvent()
          this.$router.push('/thank-you')
          this.$store.commit('products/CLEAR_CART')
          this.getUser().then((response) => {
            location.reload()
          })
          // },3000)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          console.log(error)
        })
    },
    calculateWeight() {
      for (var i = 0; i < this.StoreCart.length; i++) {
        this.totalweight +=
          this.StoreCart[i].weight * this.StoreCart[i].quantity
      }
    },
    async createOrder() {
      this.loading = true
      const payload = {
        weight: this.totalweight,
        shipping_id: this.user.shipping_id,
        address: this.user.address,
        delivery_method: this.user.deliveryMethod,
        description: this.user.description,
        country: 'Nigeria',
        device: 'web',
        dob: this.user.dob,
        email: this.user.email,
        phone: this.user.mobile,
        city: this.user.city,
        lga: this.user.lga?.name,
        state: this.user.state?.name,
        set_paid: 1,
        use_wallet: parseInt(this.paymentoption),
        product: this.StoreCart,
        reference: this.reference,
        total: this.subtotal + parseInt(this.user.deliveryfee),
        total_product: this.subtotal,
        code: this.code,
      }
      // console.log('datat to send', payload);
      await this.$store
        .dispatch('products/makeorder', payload)
        .then((response) => {
          this.$toast.success(response.message)
          // this.getUser()
          // this.getProfile()
          // console.log(response)
          this.loading = false
          this.order = response.data

          const self = this
          if (this.order.order_balance > 0) {
            if (this.paymentoption == '2') {
              this.clickFlutterwave()
            } else {
              this.clickPaystack()
            }
          } else {
            window.dataLayer.push({
              event: 'purchase',
              ecommerce: {
                transaction_id: self.order.order.order_number, // Transaction ID. Required
                affiliation: 'Online Store', // default value is Online Store
                value: self.subtotal, // Total transaction value (does not include tax and shipping)
                tax: '0.00',
                shipping: self.user.deliveryfee,
                coupon: self.code,
                payment_method:
                  self.paymentoption == '1'
                    ? 'wallet'
                    : self.paymentoption == '2'
                    ? 'polaris'
                    : 'card', // either 'card' or 'wallet'
                shipping_zone: 'SW', // geo-zone shipped to
                shipping_location: this.user.state, // state being shipped to
                shipping_tier: 'Local pickup', // see details below
                account_type:
                  self.user.role == 'user' || self.user.role == 'staff'
                    ? 'RETAILER'
                    : 'WHOLESALER',
                customer_type: 'returning', // Add a code to tell whether this is a new customer or returning.
                gift_item: '', // This is boolean
                currency: 'NGN', // This value is constant
                items: self.StoreCart,
              },
            }),
              this.$store.commit('products/CLEAR_CART'),
              this.registerEvent()
              this.$router.push('/thank-you')
          }
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error.response.data.message)
          this.loading = this.confirmDialog = false
        })
    },
    async createOrder2() {
      this.loading = true
      const payload = {
        weight: this.totalweight,
        shipping_id: this.user.shipping_id,
        address: this.user.address,
        delivery_method: this.user.deliveryMethod,
        description: this.user.description,
        country: 'Nigeria',
        device: 'web',
        dob: this.user.dob,
        email: this.user.email,
        phone: this.user.mobile,
        city: this.user.city,
        lga: this.user.lga?.name,
        state: this.user.state?.name,
        set_paid: 1,
        use_wallet: parseInt(this.paymentoption),
        product: this.StoreCart,
        reference: this.reference,
        total: this.subtotal + parseInt(this.user.deliveryfee),
        total_product: this.subtotal,
        code: this.code,
      }
      await this.$store
        .dispatch('products/makeorder', payload)
        .then(async (response) => {
          return response
        })
        .then(async (response) => {
          // console.log('product saved', response)
          this.$toast.success(response.message)
          // this.getUser()
          // this.getProfile()
          // console.log(response)
          this.loading = false
          this.order = {
            ...response.data,
            order_balance: response.data.order_balance,
          }

          console.log(this.order)

          const self = this
          if (this.order.order_balance > 0) {
            this.use_wallet_card = true
            if (this.completepaymentoption == '1') {
              this.clickFlutterwave()
            } else {
              this.clickPaystack()
            }
          } else {
            this.loading = true
            //  console.log('order value', self.order);
            const data = {
              order_id: self.order.order.id,
              reference: 'null',
              amount: self.order.order.total,
              channel: 'wallet',
            }
            await this.$store
              .dispatch('products/storeorderwallet', data)
              .then((response) => {
                window.dataLayer.push({
                  event: 'purchase',
                  ecommerce: {
                    transaction_id: self.order.order.order_number, // Transaction ID. Required
                    affiliation: 'Online Store', // default value is Online Store
                    value: self.subtotal, // Total transaction value (does not include tax and shipping)
                    tax: '0.00',
                    shipping: self.user.deliveryfee,
                    coupon: self.code,
                    payment_method:
                      self.paymentoption == '1' ? 'wallet' : 'card', // either 'card' or 'wallet'
                    shipping_zone: 'SW', // geo-zone shipped to
                    shipping_location: this.user.state, // state being shipped to
                    shipping_tier: 'Local pickup', // see details below
                    account_type:
                      self.user.role == 'user' || self.user.role == 'staff'
                        ? 'RETAILER'
                        : 'WHOLESALER',
                    customer_type: 'returning', // Add a code to tell whether this is a new customer or returning.
                    gift_item: '', // This is boolean
                    currency: 'NGN', // This value is constant
                    items: self.StoreCart,
                  },
                })
                setTimeout(() => {
                  this.getProfile()
                  this.registerEvent()
                  this.$store.commit('products/CLEAR_CART'),
                    this.$router.push('/thank-you')
                  this.getUser().then((response) => {
                    location.reload()
                  })
                }, 3000)
                // setTimeout(() => {
                //   this.$toast.success(response.message)
                //   this.loading = this.confirmDialog = false
                //   this.getProfile()
                //   this.$router.push('/thank-you')
                //   this.$store.commit('products/CLEAR_CART')
                //   this.getUser()
                //    },3000)
              })
              .catch((error) => {
                this.$toast.error(error.response.data.message)
                console.log(error)
              })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error(error.response.data.message)
          this.loading = this.walletDialog = false
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
    async getProfile() {
      await this.$store.dispatch('auth/profile').then((response) => {
        // this.states = response.data
      })
    },

    registerEvent(){
      mixpanel.init("e8933091d8272d61b9c4c16a619ab0e2", {track_pageview: true});
      mixpanel.track("Product Purchase", {
        products: this.StoreCart,
        location: "",
      });
    }
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
  padding: 10px 20px 30px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 2px dotted #36bdb4;
}
.coupon-color {
  color: #36bdb4;
}
.product-item {
  background-color: #F2F2F266;
  padding: 10px 10px;
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
</style>
