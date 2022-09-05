<template>
  <v-container>
    <div class="text-center pb-16">
      <h1>Checkout Information</h1>
    </div>
    <v-row>
      <v-col md="8" cols="12">
        <h3>Contact Information</h3>
        <v-form v-model="valid" lazy-validation ref="form">
          <v-row>
            <v-col>
              <p class="mb-0">Email address *</p>
              <v-text-field
                outlined
                v-model="userDetail.email"
                @change="updateUserDetail('email', userDetail.email)"
                required
                :rules="[(v) => !!v || 'This field is required']"
                placeholder="Email"
              ></v-text-field>
              <v-checkbox
                class="my-0"
                label="Keep me up to date on news and exclusive offers?"
              ></v-checkbox>
            </v-col>
            <v-col>
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
            label="Date of Birth"
           
            type="date"
            required
            :rules="[(v) => !!v || 'This field is required']"
            outlined
          >
          </v-text-field>
          <p class="mb-0 ">Order Notes (Optional)</p>
          <v-textarea
            v-model="userDetail.description"
            @change="updateUserDetail('description', userDetail.description)"
            placeholder="Order Note"
            outlined
          ></v-textarea>

          <h3 class="mt-8">Delivery Information</h3>
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
              label="Local Pickup (3 Billings Way, Oregun, Ikeja beside Fan Milk)"
            ></v-radio>
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
            <p class="mb-0">Address</p>
            <v-text-field
              placeholder="Address"
              v-model="userDetail.address"
              @change="updateUserDetail('address', userDetail.address)"
              required
              :rules="[(v) => !!v || 'This field is required']"
              outlined
            ></v-text-field>
            <p class="mb-0">Apartment</p>
            <v-text-field
              placeholder="Apartment, Suite, etc (optional)"
              @change="updateUserDetail('apartment', userDetail.apartment)"
              v-model="userDetail.apartment"
              outlined
            ></v-text-field>
            <v-row>
              <v-col>
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

              <v-col>
                <p class="mb-0">Post Code</p>
                <v-text-field
                  placeholder="Postal Code"
                  v-model="userDetail.post_code"
                  @change="updateUserDetail('post_code', userDetail.post_code)"
                  outlined
                >
                </v-text-field>

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
          </div>
          <!-- <v-checkbox
            class="my-0"
            label="Save this information for next time"
          ></v-checkbox> -->
          <v-row class="mt-16">
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
          </v-row>
        </v-form>
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
                  ? userDetail.role == 'wholesaler' || userDetail.role == 'next_champ'
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
          </div>
          <h3>Shipping</h3>
          <p>Calculated at next step</p>
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
      for (var i = 0; i < this.StoreCart.length; i++) {
        this.subtotal +=
          parseInt(this.StoreCart[i].quantity) *
          parseInt(
            this.isAuthenticated
              ? this.user.role == 'wholesaler' || this.user.role == 'next_champ'
                ? this.StoreCart[i].wholesale_price
                : this.StoreCart[i].price
              : this.StoreCart[i].price
          )

        this.totalweight +=
          this.StoreCart[i].weight * this.StoreCart[i].quantity
      }
      if (parseInt(this.user.balance) < parseInt(this.subtotal)) {
          this.$toast.error("Please add sufficient balance to wallet")
      }else{
        this.$toast.success("Wallet balance is sufficient")
      }
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
          console.log(response)
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
