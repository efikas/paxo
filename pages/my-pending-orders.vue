<template>
  <v-container pt-16>
    <v-row>
      <v-col md="4">
        <div style="display: flex">
          <v-avatar size="60">
            <img src="../static/assets/avatar.jpg" alt="" />
          </v-avatar>
          <div class="ml-6">
            <p class="mb-0 pb-0">Hello</p>
            <h4>{{ user.first_name }} {{ user.last_name }}</h4>
          </div>
        </div>
        <v-list class="mt-7 sidebar py-0" outlined>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item :to="item.to" v-for="(item, i) in menus" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col md="8">
        <h2>My Pending Orders</h2>
        <v-divider></v-divider>
        <v-simple-table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>DELIVERY ADDRESS</th>
              <!-- <th>ORDER NUMBER</th> -->
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in orders" :key="index">
              <td class="py-5">
                ORDER NUMBER: {{ i.order_number }}<br /><br />
                <div
                  class="d-flex mb-2 align-center"
                  v-for="j in i.product"
                  :key="j.id"
                >
                  <img :src="j.avatar" height="60px" alt="" />
                  <div>
                    <nuxt-link :to="'/single-product?product_id=' + j.id">
                      <p class="ml-8 mb-0 pb-0">{{ j.name }}</p>
                    </nuxt-link>
                    <span class="ml-8">
                      &#8358;{{ j.price | formatPrice }} x {{ j.quantity }}
                    </span>
                  </div>
                </div>
              </td>

              <td>{{ i.address }}, {{ i.city }}, {{ i.state }}</td>
              <!-- <td>{{i.order_number}}</td> -->
              <td>&#8358;{{ i.total | formatPrice }}</td>
              <td>
                <span
                  :class="
                    i.status == 'pending'
                      ? 'warning--text'
                      : i.status == 'cancelled'
                      ? 'error--text'
                      : i.status == 'processing'
                      ? 'primary--text'
                      : 'success--text'
                  "
                  >{{ i.status }}</span
                >
              </td>

              <td class="text-">
                <span
                  @click="deleteWishlist(i.id)"
                  :class="'error--text pointer'"
                >
                  Delete</span
                >
                <span @click="checkout(i)" class="pointer"> Checkout</span>
                <!-- <v-icon @click="deleteWishlist(i.id)"
                  >ri-delete-bin-line</v-icon
                > -->
              </td>
            </tr>
            <tr v-if="orders.length == 0">
              <td colspan="5" class="text-center pa-10">
                <p>No recent orders found!</p>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
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
    <flutterwave-pay-button
      :tx_ref="reference"
      :amount="order.order_balance"
      currency="NGN"
      payment_options="card,ussd"
      redirect_url=""
      class="class-name"
      :meta="{
        counsumer_id: '7898',
        consumer_mac: 'kjs9s8ss7dd',
      }"
      :customer="{
        name: user.first_name + '  ' + user.last_name,
        email: user.email,
        phone_number: user.mobile,
      }"
      :customizations="{}"
      :callback="makePaymentCallback"
      :onclose="closedPaymentModal"
      id="flutterwave"
      style="visibility: hidden"
    >
      Make Payment
    </flutterwave-pay-button>
    <!-- this dialog is used to handle only card payment -->
    <v-dialog
      width="400"
      v-model="confirmDialog"
      overlay-color="#36bdb4"
      overlay-opacity="0.9"
    >
      <v-card class="pa-6 text-center">
        <h3>
          Order Total: &#8358;
          {{ subtotal | formatPrice }}
        </h3>
        <p>
          Are you sure you want to proceed to paying for this order? Please note
          that this step is irreversible!
        </p>

        <v-btn outlined text @click="confirmDialog = false">Cancel</v-btn>
        <v-btn class="primary" :loading="loading" @click="createOrder()"
          >Proceed</v-btn
        >
      </v-card>
    </v-dialog>
    <!-- this dialog is used for waller and wallet/card payment -->
    <v-dialog
      width="470"
      v-model="walletDialog"
      overlay-color="#36bdb4"
      overlay-opacity="0.9"
    >
      <v-card class="pa-6 text-center">
        <h3>
          Order Total: &#8358;
          {{ subtotal | formatPrice }}
        </h3>
        <v-row v-if="subtotal - parseInt(user.balance) > 0">
          <v-col class="pb-0 text-center">
            <v-btn outlined text small
              >Wallet Payment: &#8358;{{ user.balance | formatPrice }}</v-btn
            >
          </v-col>
          <v-col ma-0>
            <v-btn class="primary" small
              >Card Payment: &#8358;{{
                (subtotal - parseInt(user.balance)) | formatPrice
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

        <p class="mt-3">
          Are you sure you want to proceed to paying for this order? Please note
          that this step is irreversible!
        </p>

        <v-btn outlined text @click="walletDialog = false">Cancel</v-btn>
        <v-btn class="primary" :loading="loading" @click="createOrder2()"
          >Proceed</v-btn
        >
      </v-card>
    </v-dialog>
    <!-- proceed verification dialog -->
    <v-dialog
      width="470"
      v-model="paymentMethodDialog"
      overlay-color="#36bdb4"
      overlay-opacity="0.9"
    >
      <v-card class="pa-6 text-center">
        <v-row v-if="subtotal - parseInt(user.balance) > 0">
          <v-col class="pb-0 text-center">
            <h3>Payment Options</h3>
            <div class="contact-card pa-4">
              <v-radio-group v-model="paymentoption" required>
                <v-radio
                  label="Pay with your wallet"
                  :disabled="user.balance == '0'"
                  value="1"
                ></v-radio>
                <p class="ml-8">
                  Your Wallet Balance: &#8358;{{ user.balance | formatPrice }}
                </p>
                <v-radio label="Paystack Gateway" value="0"></v-radio>
                <v-radio label="Polaris Gateway" value="2"></v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
        <p class="mt-3">
          Are you sure you want to proceed to paying for this order? Please note
          that this step is irreversible!
        </p>

        <v-btn outlined text @click="paymentMethodDialog = false">Cancel</v-btn>
        <v-btn class="primary" :loading="loading" @click="createOrder()"
          >Proceed</v-btn
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import paystack from 'vue-paystack'
import { FlutterwavePayButton } from 'flutterwave-vue-v3'
export default {
  components: {
    paystack,
    FlutterwavePayButton,
  },
  data() {
    return {
      loading: false,
      confirmDialog: false,
      walletDialog: false,
      paymentMethodDialog: false,
      selectedItem: '',
      subtotal: 0,
      paymentoption: '0',
      completepaymentoption: '0',
      orders: [],
      order: { order_balance: 0 },
      myCheckoutOrder: {},
      paystackkey: 'pk_live_7c02e6083d7879d591e497d97392bf4a3e4697f5',
      // paystackkey: 'pk_test_e88a1928368226327d9382a6c67c82749f30ec13',
      reference: '',
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      code: '',
      menus: [
        {
          icon: 'ri-user-line',
          text: 'Account Information',
          to: '/dashboard',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'My Pending Orders',
          to: '/my-pending-orders',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'My Orders / Transactions',
          to: '/my-orders',
        },
        {
          icon: 'ri-heart-line',
          text: 'My Wishlist',
          to: '/my-wishlist',
        },
        {
          icon: 'ri-honour-line',
          text: 'Become an Affiliate',
          to: '/become-affiliate',
        },
        {
          icon: 'ri-briefcase-line',
          text: 'Upgrade to Wholesaler',
          to: '/upgrade-wholesaler',
        },
        {
          icon: 'ri-lock-line',
          text: 'Change Password',
          to: '/change-password',
        },
        {
          icon: 'ri-logout-circle-line',
          text: 'Logout',
          to: '/logout',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  mounted() {
    this.getUserOrders()
  },
  methods: {
    async getUserOrders() {
      await this.$store
        .dispatch('order/userpendingorders')
        .then((response) => {
          if (response.data) {
            this.orders = response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    makePaymentCallback(response) {
      console.log('Payment callback updated', response)

      if (
        response.status == 'successful' &&
        response.charge_response_code == '00'
      ) {
        if (!this.use_wallet_card) {
          this.makeOrder()
        } else {
          this.makeOrder2()
        }
      }
    },
    callback: function (response) {
      if (!this.use_wallet_card) {
        this.makeOrder()
      } else {
        this.makeOrder2()
      }
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
    async deleteWishlist(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to cancel this order?') &&
        (await this.$store
          .dispatch('order/cancelorder', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getUserOrders()
          }))
    },
    async checkout(item) {
      const data = {
        id: item.id,
      }
      // console.log(item)

      this.myCheckoutOrder = item
      this.subtotal = item.total
      this.reference = item.order_number
      this.paymentMethodDialog = true
    },
    async makeOrder() {
      this.loading = true
      const data = {
        order_id: this.order.id,
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
          window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: self.order.order_number, // Transaction ID. Required
              affiliation: 'Online Store', // default value is Online Store
              value: self.subtotal, // Total transaction value (does not include tax and shipping)
              tax: '0.00',
              shipping: '0.00',
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
              items: this.myCheckoutOrder.product.filter(
                (item) => item.stock_status != 'outofstock'
              ),
            },
          })
          // setTimeout(() => {
          this.$toast.success(response.message)
          this.loading = this.confirmDialog = false
          this.getProfile()
          this.getUser()
          this.$router.push('/my-orders')
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
      if (this.use_wallet_card && this.completepaymentoption == '2') {
        _channel = 'wallet_poaris'
      } else if (this.use_wallet_card && this.completepaymentoption == '0') {
        _channel = 'wallet_card'
      }

      const data = {
        order_id: this.order.id,
        reference: this.reference,
        amount: this.order.order_balance,
        channel: _channel,
        total_product: this.subtotal,
      }
      const self = this
      await this.$store
        .dispatch('products/storeorder', data)
        .then((response) => {
          window.dataLayer.push({
            event: 'purchase',
            ecommerce: {
              transaction_id: self.order.order_number, // Transaction ID. Required
              affiliation: 'Online Store', // default value is Online Store
              value: self.subtotal, // Total transaction value (does not include tax and shipping)
              tax: '0.00',
              shipping: '0.00',
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
              items: this.myCheckoutOrder.product,
            },
          })
          // setTimeout(() => {
          this.$toast.success(response.message)
          this.loading = this.confirmDialog = false
          this.getProfile()
          this.getUser()
          this.$router.push('/my-orders')
          // },3000)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          console.log(error)
        })
    },
    async createOrder2() {
      if (this.completepaymentoption == '1') {
          this.clickFlutterwave()
        } else {
          this.clickPaystack()
        }
    },
    async createOrder() {
      // console.log(this.user)
      this.order = this.myCheckoutOrder
      if (this.paymentoption == '0') {
        this.order = {
          ...this.order,
          order_balance: this.order.total,
        }
        this.clickPaystack()
        return
      }
      if (this.paymentoption == '2') {
        this.order = {
          ...this.order,
          order_balance: this.order.total,
        }
        this.clickFlutterwave()
        return
      }
      if (this.paymentoption == '1') {
        this.paymentMethodDialog = false
        this.walletDialog = true

        this.order = {
          ...this.order,
          order_balance: this.order.total - parseInt(this.user.balance),
        }
      }

      this.loading = false

      const self = this
      if (this.order.order_balance > 0) {
        ///use paystack to pay for the excess amount on that the wallet can not handle
        this.use_wallet_card = true

        // if (this.completepaymentoption == '1') {
        //   this.clickFlutterwave()
        // } else {
        //   this.clickPaystack()
        // }
      } else {
        /// Complete payment with only wallet
        // this.loading = true
        this.use_wallet_card = false
        // console.log('order value', self.order)
        const data = {
          order_id: self.order.id,
          reference: 'null',
          amount: self.order.total,
          channel: 'wallet',
        }
        await this.$store
          .dispatch('products/storeorderwallet', data)
          .then((response) => {
            window.dataLayer.push({
              event: 'purchase',
              ecommerce: {
                transaction_id: self.order.order_number, // Transaction ID. Required
                affiliation: 'Online Store', // default value is Online Store
                value: self.subtotal, // Total transaction value (does not include tax and shipping)
                tax: '0.00',
                shipping: '0.00',
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
                items: this.myCheckoutOrder.product,
              },
            })
            setTimeout(() => {
              this.getProfile()
              this.getUser()
              this.$router.push('/my-orders')
            }, 3000)
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            console.log(error)
          })
      }
    },
    clickPaystack() {
      document.getElementById('paystack').click()
    },
    clickFlutterwave() {
      document.getElementById('flutterwave').click()
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
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  background: transparent !important;
  .v-list-item:not(:first-child) {
    border-top: 1px solid #ddd;
  }
}
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

.pointer {
  cursor: pointer;
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
