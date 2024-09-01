<template>
  <v-container>
    <h4 class="font-weight-medium mt-8">
      Checkout
    </h4>
    <v-divider color="#00C3B7"></v-divider>
    <v-row class="mt-4 mb-10"  :class="{ 'px-4': $vuetify.breakpoint.smAndDown, 'p10p': $vuetify.breakpoint.mdAndUp }">
      <v-col md="6" cols="12">
        <h4>Your Information</h4>
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row class="mt-4">
            <v-col cols="12">
              <p class="mb-0">Full name *</p>
              <v-text-field
                outlined
                v-model="userDetail.fullname"
                @change="updateUserDetail('fullname', userDetail.fullname)"
                required
                :rules="[(v) => !!v || 'This field is required']"
                placeholder="Full name"
              ></v-text-field>
              <p class="mb-0">Email address *</p>
              <v-text-field
                outlined
                v-model="userDetail.email"
                @change="updateUserDetail('email', userDetail.email)"
                required
                :rules="[(v) => !!v || 'This field is required']"
                placeholder="Email"
              ></v-text-field>
              <!-- <v-checkbox
                class="my-0"
                label="Keep me up to date on news and exclusive offers?"
              ></v-checkbox> -->
              <p class="mb-0">Phone number *</p>
              <v-text-field
                outlined
                v-model="userDetail.mobile"
                @change="updateUserDetail('mobile', userDetail.mobile)"
                required
                :rules="[(v) => !!v || 'This field is required']"
                placeholder="Phone number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-if="user.dob == '' || user.dob == undefined"
            label="Date of Birth"
            type="date"
            v-model="userDetail.dob"
            @change="updateUserDetail('dob', userDetail.dob)"
            :rules="[(v) => !!v || 'This field is required']"
            outlined
          >
          </v-text-field>
          <!-- <p class="mb-0">Order Notes (Optional)</p>
          <v-textarea
            v-model="userDetail.description"
            @change="updateUserDetail('description', userDetail.description)"
            placeholder="Order Note"
            outlined
          ></v-textarea> -->

          <h3 class="mt-4">Delivery Information</h3>
          <p>Please select your preferred delivery method</p>
          <v-radio-group
            v-model="userDetail.deliveryMethod"
            @change="
              updateUserDetail('deliveryMethod', userDetail.deliveryMethod)
            "
            required
            :rules="[(v) => !!v || 'This field is required']"
          >
            <v-radio
              value="0"
              label=""
            >
            <template v-slot:label>
              <div>Local Pickup  <div class="text--disabled text-caption">(3 Billings Way, Oregun, Ikeja beside Fan Milk)</div></div>
            </template>
          </v-radio>
            <v-radio value="1" label="Home Delivery"></v-radio>
          </v-radio-group>
          <div v-if="userDetail.deliveryMethod == '1'">
            <h3 class="mt-8">Shipping Address</h3>
            <v-row>
              <v-col>
                <p class="mb-0">First name</p>
                <v-text-field
                  v-model="userDetail.first_name"
                  @change="
                    updateUserDetail('first_name', userDetail.first_name)
                  "
                  placeholder="First name"
                  required
                  :rules="[(v) => !!v || 'This field is required']"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col>
                <p class="mb-0">Last name</p>
                <v-text-field
                  placeholder="Last name"
                  v-model="userDetail.last_name"
                  @change="updateUserDetail('last_name', userDetail.last_name)"
                  required
                  :rules="[(v) => !!v || 'This field is required']"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
            <p class="mb-0">Full Address</p>
            <v-text-field
              placeholder="Street number, name ..."
              v-model="userDetail.address"
              @change="updateUserDetail('address', userDetail.address)"
              required
              :rules="[(v) => !!v || 'This field is required']"
              outlined
            ></v-text-field>
            <!-- <p class="mb-0">Apartment</p>
            <v-text-field
              placeholder="Apartment, Suite, etc (optional)"
              @change="updateUserDetail('apartment', userDetail.apartment)"
              v-model="userDetail.apartment"
              outlined
            ></v-text-field> -->
            <v-row>
              <v-col :cols="(lgas.length > 0) ? '6' : '12'" class="mb-0 mt-0">
                <p class="mb-0">State</p>
                <v-select
                  placeholder="State"
                  item-text="name"
                  item-value="id"
                  @change="getlga(userDetail.state), (userDetail.lga = '')"
                  :items="states"
                  v-model="userDetail.state"
                  required
                  :rules="[(v) => !!v || 'This field is required']"
                  outlined
                >
                </v-select>
              </v-col>
              <v-col cols="6" class="mb-0 mt-0">
                <p class="mb-0" v-if="lgas.length > 0">Local Government</p>
                <v-select
                  placeholder="LGA"
                  item-text="name"
                  v-if="lgas.length > 0"
                  item-value="id"
                  :items="lgas"
                  v-model="userDetail.lga"
                  @change="updateUserDetail('lga', userDetail.lga)"
                  required
                  :rules="[(v) => !!v || 'This field is required']"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row class="mb-0 mt-0">
              <v-col class="mb-0 mt-0">
                 <p class="mb-0">City</p>
                <v-text-field
                  placeholder="City"
                  v-model="userDetail.city"
                  @change="updateUserDetail('city', userDetail.city)"
                  required
                  :rules="[(v) => !!v || 'This field is required']"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col>
                <p class="mb-0">Nearest Bus-stop</p>
                <v-text-field
                  placeholder="Nearest Bus-stop"
                  v-model="userDetail.post_code"
                  @change="updateUserDetail('post_code', userDetail.post_code)"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>
          </div>
          <!-- <v-checkbox
            class="my-0"
            label="Save this information for next time"
          ></v-checkbox> -->
          <!-- <v-row class="mt-16">
            <v-col>
              <nuxt-link to="shopping-cart">
                <v-icon>ri-arrow-left-line</v-icon> Return to shopping cart
              </nuxt-link>
            </v-col>
            <v-col md="4">
              <v-btn
                class="primary font-weight-bold"
                @click="
                  $refs.form.validate()
                    ? userDetail.deliveryMethod == '1'
                      ? computeDeliveryFee()
                      : ((userDetail.deliveryfee = 0),
                        updateUserDetail('deliveryfee', 0),
                        $router.push('/shipping'))
                    : null
                "
                block
                :loading="loading"
                large
                text
                >Continue to shipping</v-btn
              >
            </v-col>
          </v-row> -->
        </v-form>
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
                  <div class="header">
                    <p>Discount on coupon code</p>
                    <p>0%</p>
                  </div>
                  <v-divider class="mb-6"></v-divider>
                  <div class="header mb-6">
                    <p class="font-weight-bold">Total</p>
                    <p class="font-weight-bold">&#8358;{{ subtotal | formatPrice }}</p>
                  </div>
                  <v-btn class="primary black--text br-all-5" large block text
                  @click="
                  $refs.form.validate()
                    ? userDetail.deliveryMethod == '1'
                      ? computeDeliveryFee()
                      : ((userDetail.deliveryfee = 0),
                        updateUserDetail('deliveryfee', 0),
                        $router.push('/shipping'))
                    : null
                "
                  ><span style="color: white">Proceed to Shipping</span></v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  transition: 'default',
  middleware: 'authenticated',
  data() {
    return {
      subtotal: 0,
      totalweight: 0,
      valid: true,
      loading: false,
      states: [],
      lgas: [],
      deliveryMethod: '',
      userDetail: '',
    }
  },
  async mounted() {
    this.calculateSubtotal()
    await this.getStates()
    this.userDetail = JSON.parse(JSON.stringify(this.user))
    this.userDetail.state = ''
    // console.log(this.StoreCart)
    // if(this.user.state){
    //   this.getlga(this.user.state)
    // }
  },
  methods: {
    ...mapMutations({ updateUser: 'auth/UPDATE_USER' }),
    updateUserDetail(key, value) {
      this.updateUser({ key, value })
    },
    async getStates() {
      await this.$store.dispatch('states/states').then((response) => {
        this.states = response.data
      })
    },
    getlga(name) {
      let obj = this.states.filter((item) => item.id === name)
      this.lgas = obj[0].lga
    },
    calculateSubtotal() {
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

        this.totalweight +=
          inStoreCartItems[i].weight * inStoreCartItems[i].quantity
      }
      // if (parseInt(this.user.balance) < parseInt(this.subtotal)) {
      //     this.$toast.error("Please add sufficient balance to wallet")
      // }else{
      //   this.$toast.success("Wallet balance is sufficient")
      // }
    },

    async computeDeliveryFee() {
      this.loading = true
      const data = {
        state_id: this.userDetail.state,
        lga_id: this.userDetail.lga,
        weight: this.totalweight,
      }
      await this.$store
        .dispatch('delivery/deliveryfee', data)
        .then((response) => {
          // console.log(response)
          this.user.deliveryfee = response.data.delivery_fee
          this.user.shipping_id = response.data.id
          this.loading = false
          this.$router.push('/shipping')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
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
.product-item {
  background-color: #F2F2F266;
  padding: 10px 10px;
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
