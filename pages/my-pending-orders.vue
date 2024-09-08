<template>
  <v-container pt-16>
    <v-row :class="{
              'p5p': $vuetify.breakpoint.mdAndUp,
              'px-4': $vuetify.breakpoint.smAndDown,
  }">
      <v-col md="4">
        <UserSideBar />
      </v-col>
      <v-col md="8">
        <h3 class="font-weight-bold">Pending Orders</h3>
        <v-divider color="#14ADAC99"></v-divider>
        <div
          class="mt-5"
          id="shopTable"
        >
          <v-row class="body-2">
            <v-col md="6">Product</v-col>
            <v-col md="2">Delivery Address</v-col>
            <v-col md="2">Total</v-col>
            <v-col md="2">Status</v-col>
          </v-row>
          <!-- <v-divider></v-divider> -->

          <v-row v-if="orders.length == 0">
            <v-col md="12" class="d-flex align-center text-center pa-10">
              <p>Your pending order is empty!</p>
            </v-col>
          </v-row>

          <div v-for="(i, index) in orders" :key="index" class="d-flex">
            <div style="width: 100%">
              <v-row class="table-row">
                <v-col md="6" class="py-3">
                  <div
                    class="d-flex align-center"
                    v-if="(i.product ?? []).length > 0"
                  >
                    <img
                      :src="i.product[0].avatar"
                      width="100px"
                      alt=""
                      class="br-all-5"
                    />
                    <div class="ml-8 ">
                    <nuxt-link
                      :to="'/single-product?product_id=' + i.product[0].id"
                    >
                      <p class="body-2" style="color: black">{{ i.product[0].name }}</p>
                    </nuxt-link>

                    <v-btn
                      v-if="isOutOfStock(i.product[0]) == 'outofstock'"
                      outlined
                      small
                      color="error"
                      class="br-all-5 text-caption error-text"
                    >
                    </v-btn>
                    <v-btn
                      v-else
                      outlined
                      small
                      color="primary"
                      class="br-all-5 text-caption primary-text"
                    >
                      <v-icon small> mdi-check-circle-outline</v-icon>
                      &nbsp;&nbsp;In Stock</v-btn
                    >
                  </div>
                  </div>
                </v-col>
                <v-col md="2" class="d-flex align-center body-2">
                  {{ i.address }}, {{ i.city }}, {{ i.state }}
                </v-col>
                <v-col
                  md="2"
                  class="d-flex align-center body-2 font-weight-bold"
                >
                  &#8358;{{ i.total | formatPrice }}
                </v-col>
                <v-col md="2" class="d-flex align-center body-2">
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
                </v-col>
              </v-row>
            </div>
            <div class="ml-3 d-flex align-center body-2">
              <v-icon
                color="error"
                @click="deletePendingOrder(i.id)"
                >mdi-delete-outline</v-icon
              >
            </div>
          </div>
        </div>

        <!-- <v-simple-table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>DELIVERY ADDRESS</th>
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
                  @click="deletePendingOrder(i.id)"
                  :class="'error--text pointer'"
                >
                  Delete</span
                >
                <span @click="checkout(i)" class="pointer"> Checkout</span>
              </td>
            </tr>
            <tr v-if="orders.length == 0">
              <td colspan="5" class="text-center pa-10">
                <p>No recent orders found!</p>
              </td>
            </tr>
          </tbody>
        </v-simple-table> -->
      </v-col>
    </v-row>
    <paystack
      :amount="subtotal * 100"
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
                <!-- <v-radio
                  label="Pay with your wallet"
                  :disabled="user.balance == '0'"
                  value="1"
                ></v-radio>
                <p class="ml-8">
                  Your Wallet Balance: &#8358;{{ user.balance | formatPrice }}
                </p> -->
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
import UserSideBar from '~/components/UserSideBar.vue'
import paystack from 'vue-paystack'
import { FlutterwavePayButton } from 'flutterwave-vue-v3'
export default {
  components: {
    paystack,
    FlutterwavePayButton,
    UserSideBar,
  },
  data() {
    return {
      loading: false,
      loadingRecord: false,
      confirmDialog: false,
      walletDialog: false,
      paymentMethodDialog: false,
      selectedItem: '',
      subtotal: 0,
      paymentoption: '0',
      completepaymentoption: '0',
      orders: [],
      states: [],
      order: { order_balance: 0 },
      myCheckoutOrder: {},
      paystackkey: 'pk_live_7c02e6083d7879d591e497d97392bf4a3e4697f5',
      // paystackkey: 'pk_test_e88a1928368226327d9382a6c67c82749f30ec13',
      reference: '',
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      code: '',
     
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  async mounted() {
    this.getUserOrders()
    await this.getStates()
  },
  methods: {
    isOutOfStock(item) {
      if (item.stock_status == 'outofstock') {
        return 'outofstock'
      }

      if (item.stock_quantity < item.quantity) {
        return 'outofstock'
      }

      return ''
    },
    getPaymentData() {
      return {
        tx_ref: this.reference,
        amount: this.subtotal,
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
    async deletePendingOrder(id) {
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

      console.log(item)

      this.getUpdatedProductsrecord(item)
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
      if (this.use_wallet_card && this.completepaymentoption == '1') {
        _channel = 'wallet_polaris'
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
    async getStates() {
      await this.$store.dispatch('states/states').then((response) => {
        this.states = response.data
      })
    },
    async getUpdatedProductsrecord(order) {
      this.loadingRecord = true
      console.log(order.product)
      if (order.product.length > 0) {
        let ids = order.product.map((item) => item.id)
        const self = this
        await this.$store
          .dispatch('products/getorderproducts', { product_id: ids })
          .then(async (response) => {
            this.loadingRecord = false
            // console.log(response)
            this.calculateSubtotal(order, response)
          })
          .catch((error) => {
            // this.loadingRecord = false;
            this.$toast.error(error.response.data.message)
            console.log(error)
          })
      }
    },
    async createOrder2() {
      if (this.completepaymentoption == '1') {
        this.clickFlutterwave()
      } else {
        this.clickPaystack()
      }
    },
    async calculateSubtotal(order, products) {
      let subtotal = 0
      let deliveryfee = 0
      let checkoutItems = order.product
      if (products == null || products == undefined) {
        return
      }

      // console.log(order.delivery_method)

      if (order.delivery_method == '1') {
        // get delivery price
        let lga = ''
        let state = this.states.filter((item) => item.name == order.state)
        if (state.length > 0) {
          state = state[0]
          if (state.lga.length > 0 && order.lga != '') {
            let _lga = state.lga.filter((item) => item.name == order.lga)
            if (_lga.length > 0) {
              lga = _lga[0]
            }
          }

          const data = {
            state_id: state.id,
            lga_id: lga.id ?? '',
            weight: order.weight,
          }
          await this.$store
            .dispatch('delivery/deliveryfee', data)
            .then((response) => {
              deliveryfee = parseInt(response.data.delivery_fee.toString())
            })
            .catch((error) => {
              this.$toast.error(error.response.data.message)
            })
        }
      }

      for (var i = 0; i < checkoutItems.length; i++) {
        let _product = products.filter(
          (_item) => _item.id === checkoutItems[i].id
        )

        if (_product.length > 0) {
          subtotal +=
            parseInt(checkoutItems[i].quantity) *
            parseInt(
              this.isAuthenticated
                ? this.user.role == 'wholesaler' ||
                  this.user.role == 'next_champ'
                  ? _product[0].wholesale_price
                  : _product[0].price
                : _product[0].price
            )
        }
      }

      if (subtotal > 0) {
        // console.log('subtotal = ' + (subtotal + deliveryfee))
        // console.log('deliveryfee = ' + parseInt(deliveryfee))
       
        this.order = Object.assign({}, this.order, {
          ...this.order,
          order_balance: subtotal + deliveryfee,
        });

        this.subtotal = subtotal + deliveryfee;

        // this.$set(this.order, 'order_balance', subtotal + deliveryfee + 5000)
        // console.log('deliveryfee = ' + this.order.order_balance)
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
      this.$payWithFlutterwave(this.getPaymentData())
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

.table-row {
  border: 2px solid #66666633 !important;
  margin-top: 20px !important;
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
