<template>
  <div>
    <v-hover v-slot="{ hover }">
      <div class="product-box">
        <nuxt-link :to="'/single-product?product_id=' + product_id">
          <v-img
            :src="image"
            class="product-image"
            width="100%"
            lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660831137/Icon_1b_f5502u.png"
          >
            <v-chip
              v-if="badge"
              :class="badge == 'instock' ? 'primary' : 'error'"
              style="float: right; border-radius: 0"
              small
              >{{ badge == 'instock' ? 'Instock' : 'Out of stock' }}</v-chip
            >
          </v-img>
        </nuxt-link>
        <!-- <v-expand-transition>
          <v-card
            flat
            class="
              py-2
              text-center
              white
              transition-slow-in-slow-out
              white--text
            "
            style="margin-top: -0px; width: 100%"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  :disabled="badge == 'instock' ? false : true"
                  @click="isAuthenticated ? addToCart() : (loginDialog = true)"
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon small>ri-shopping-cart-2-line</v-icon></v-btn
                >
              </template>
              <span>Add to Cart</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  @click="dialog = true"
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon small>ri-eye-line</v-icon></v-btn
                >
              </template>
              <span>View product</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    isAuthenticated ? addToWishList() : (loginDialog = true)
                  "
                  ><v-icon small>ri-heart-line</v-icon></v-btn
                >
              </template>
              <span>Add to Wishlist</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    isAuthenticated
                      ? copyLink(product_id)
                      : (loginDialog = true)
                  "
                  ><v-icon small>ri-user-shared-line</v-icon></v-btn
                >
              </template>
              <span>Refer Product</span>
            </v-tooltip>
          </v-card>
        </v-expand-transition> -->
        <!-- <div class="vendor">{{ vendor }}</div> -->
        <div class="product-title mt-3">
          <nuxt-link :to="'/single-product?product_id=' + product_id" class="primary--text" style="font-size: 16px">
            {{ product_name }}
          </nuxt-link>
        </div>
        <div class="product-price d-flex text-right mt-3">
          &#8358;{{
            (isAuthenticated
              ? user.role == 'wholesaler' || user.role == 'next_champ'
                ? wholesale_price
                : price
              : price) | formatPrice
          }}
          <del
            v-if="product_object.onsale == '1'"
            style="color: #bbb; font-size: 0.8rem;  margin-top: 1px;"
            class="ml-3"
            >&#8358;{{ regular_price | formatPrice }}</del
          >
          <p v-else></p>
        </div>
        <div class="d-flex">
          <v-rating dense small color="orange" :value="parseInt(rating)">
            {{ rating }}</v-rating
          >
          <span style="margin-left: 1px; margin-top: 3.5px; font-size: 0.8rem"
            >({{ rating }})</span
          >
        </div>
        <transition name="fade" mode="out-in">
          <div class="d-flex justify-space-between mt-3 pr-1"  v-if="($vuetify.breakpoint.mdAndUp)? hover: true">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="#36bdb4"
                  class="mr-2 mt-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    isAuthenticated ? addToWishList() : (loginDialog = true)
                  "
                  >
                  <v-icon>ri-heart-line</v-icon>
                  </v-btn
                >
              </template>
              <span>Add to Wishlist</span>
            </v-tooltip>
            <v-btn
              :disabled="badge == 'instock' ? false : true"
              @click="isAuthenticated ? addToCart() : (loginDialog = true)"
              width="80%"
              height="50px"
              color="#36bdb4"
              class="mb-1 br-all-10"
            >
              <!-- <v-icon style="color: white" small>mdi-shopping-outline</v-icon> -->
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7.40674V6.90674C0.860302 6.90674 0.726974 6.96518 0.632308 7.06791C0.537641 7.17065 0.49027 7.3083 0.501667 7.44753L1 7.40674ZM17.2 7.40674L17.6983 7.44753C17.7097 7.3083 17.6624 7.17065 17.5677 7.06791C17.473 6.96518 17.3397 6.90674 17.2 6.90674V7.40674ZM16.3546 17.7354L15.8562 17.6946L15.8562 17.6946L16.3546 17.7354ZM14.3387 19.7817V20.2817H14.3389L14.3387 19.7817ZM3.86133 19.7817L3.86111 20.2817H3.86133V19.7817ZM1.84544 17.7354L2.34377 17.6946L2.34377 17.6946L1.84544 17.7354ZM4.55 9.65674C4.55 9.93288 4.77386 10.1567 5.05 10.1567C5.32614 10.1567 5.55 9.93288 5.55 9.65674H4.55ZM9.1 1.78174V1.28174V1.78174ZM13.15 6.28174H13.65H13.15ZM12.65 9.65674C12.65 9.93288 12.8739 10.1567 13.15 10.1567C13.4261 10.1567 13.65 9.93288 13.65 9.65674H12.65ZM1 7.90674H17.2V6.90674H1V7.90674ZM16.7017 7.36595L15.8562 17.6946L16.8529 17.7762L17.6983 7.44753L16.7017 7.36595ZM15.8562 17.6946C15.8195 18.1438 15.6334 18.5517 15.3475 18.842L16.0599 19.5438C16.52 19.0767 16.7982 18.445 16.8529 17.7761L15.8562 17.6946ZM15.3475 18.842C15.063 19.1308 14.7023 19.2816 14.3385 19.2817L14.3389 20.2817C14.9855 20.2815 15.5985 20.0122 16.0599 19.5438L15.3475 18.842ZM14.3387 19.2817H3.86133V20.2817H14.3387V19.2817ZM3.86155 19.2817C3.49774 19.2816 3.13697 19.1308 2.85247 18.842L2.14007 19.5438C2.60153 20.0122 3.21451 20.2815 3.86111 20.2817L3.86155 19.2817ZM2.85247 18.842C2.56656 18.5517 2.38051 18.1438 2.34377 17.6946L1.3471 17.7761C1.40181 18.445 1.68002 19.0767 2.14007 19.5438L2.85247 18.842ZM2.34377 17.6946L1.49833 7.36595L0.501667 7.44753L1.3471 17.7762L2.34377 17.6946ZM5.55 9.65674V6.28174H4.55V9.65674H5.55ZM5.55 6.28174C5.55 5.20486 5.93549 4.18132 6.60786 3.43424L5.86457 2.76528C5.0179 3.70602 4.55 4.97166 4.55 6.28174H5.55ZM6.60786 3.43424C7.27868 2.68889 8.1765 2.28174 9.1 2.28174V1.28174C7.87525 1.28174 6.7128 1.82279 5.86457 2.76528L6.60786 3.43424ZM9.1 2.28174C10.0235 2.28174 10.9213 2.68889 11.5921 3.43424L12.3354 2.76528C11.4872 1.82279 10.3248 1.28174 9.1 1.28174V2.28174ZM11.5921 3.43424C12.2645 4.18132 12.65 5.20486 12.65 6.28174H13.65C13.65 4.97166 13.1821 3.70602 12.3354 2.76528L11.5921 3.43424ZM12.65 6.28174V9.65674H13.65V6.28174H12.65Z"
                  fill="white"
                />
              </svg>
              &nbsp;
              <span style="color: white"
                >Add to cart</span
              ></v-btn
            >
          </div>
        </transition>
      </div>
    </v-hover>
    <v-dialog v-model="dialog" width="1200">
      <v-card class="pa-6">
        <v-row>
          <v-col md="5">
            <img :src="image" width="100%" alt="" />
          </v-col>
          <v-col md="7">
            <div class="product-details">
              <h2>{{ product_name }}</h2>
              <p style="display: flex">
                Brand: {{ brand }} |
                <v-rating color="orange" dense small :value="5"></v-rating> (1
                review)
              </p>
              <v-divider></v-divider>
              <div class="price mt-5">
                <del v-if="product_object.onsale == '1'"
                  >&#8358;{{ regular_price | formatPrice }}</del
                >
                <p
                  class="sale-price"
                  :class="product_object.onsale == '1' ? 'ml-5' : null"
                >
                  &#8358;{{
                    (isAuthenticated
                      ? user.role == 'wholesaler' || user.role == 'next_champ'
                        ? wholesale_price
                        : price
                      : price) | formatPrice
                  }}
                </p>
              </div>
              <!-- <p>
                Sold by: <span class="font-weight-bold"> {{ brand }}</span>
              </p> -->
              <p>{{ short_description }}</p>
              <!-- <div v-html="description || ''"></div> -->
              <v-divider></v-divider>
              <v-row class="my-3" justify="end" align="end">
                <v-col md="3">
                  <p>Quantity</p>
                  <div class="qty-box pa-2">
                    <v-btn @click="decreaseQuantity()" icon small
                      ><v-icon>ri-subtract-fill</v-icon></v-btn
                    >
                    <p class="ma-0">{{ quantity }}</p>
                    <v-btn icon small @click="increaseQuantity()"
                      ><v-icon>ri-add-fill</v-icon></v-btn
                    >
                  </div>
                </v-col>
                <v-col>
                  <v-btn
                    x-large
                    :disabled="badge == 'instock' ? false : true"
                    text
                    class="accent"
                    @click="addToCart()"
                    >Add to Cart</v-btn
                  >
                  <v-btn
                    x-large
                    :disabled="badge == 'instock' ? false : true"
                    text
                    @click="buyNow()"
                    class="accent font-weight-bold"
                    >Buy Now</v-btn
                  >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        @click="
                          isAuthenticated
                            ? addToWishList()
                            : (loginDialog = true)
                        "
                        v-on="on"
                        icon
                        ><v-icon>ri-heart-line</v-icon></v-btn
                      >
                    </template>
                    <span>Add to Wishlist</span>
                  </v-tooltip>
                  <!-- <v-btn icon><v-icon>ri-exchange-funds-line</v-icon></v-btn> -->
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="loginDialog" width="500px">
      <v-card>
        <h3 class="text-center py-4" style="background-color: #14adac33">
          Login to Continue
        </h3>
        <v-form lazy-validation v-model="valid" ref="login" class="py-8 px-10">
          <v-text-field
            v-model="form.email"
            outlined
            @keypress.native.enter="$refs.login.validate() ? login() : null"
            required
            :rules="emailRules"
            placeholder="Username or email"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="form.password"
            @keypress.native.enter="$refs.login.validate() ? login() : null"
            required
            :rules="passwordRules"
            placeholder="Please enter your password"
            outlined
          ></v-text-field>
          <v-checkbox label="Remember me" class="my-0"></v-checkbox>
          <div class="text-center px-12 text-caption">
            <v-btn
              block
              :loading="loading"
              @click="$refs.login.validate() ? login() : null"
              large
              text
              class="primary mb-4 br-all-5"
              >Log In</v-btn
            >
          </div>

          <div class="text-center px-4 text-caption">
            By Clicking “Sign in” you certify that you agree to Paxo Beauty’s
            <span class="font-weight-bold">Terms and Conditions</span> and
            <span class="font-weight-bold">Privacy Policy.</span>
          </div>
        </v-form>
        <div class="text-center py-4" style="background-color: #14adac33">
          Don't have an account?
          <nuxt-link to="/register"
            ><span class="font-weight-bold" style="color: black"
              >Sign Up</span
            ></nuxt-link
          ><br />
        </div>
      </v-card>
    </v-dialog> -->
    <v-dialog v-model="loginDialog" width="500px">
      <v-card>
        <Login :clickRegister="clickRegister" :closeAllPopUp="closeAllPopUp" />
      </v-card>
  </v-dialog>
  <v-dialog v-model="registerDialog" width="800px">
      <v-card>
        <Register :clickLogin="clickLogin" :closeAllPopUp="closeAllPopUp" />
      </v-card>
  </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Login from '../layouts/components/menu/login.vue'
import Register from '../layouts/components/menu/register.vue'
export default {
  components: {
    Login,
    Register,
  },
  props: [
    'vendor',
    'product_name',
    'price',
    'regular_price',
    'wholesale_price',
    'rating',
    'badge',
    'image',
    'description',
    'short_description',
    'product_object',
    'brand',
    'product_id',
  ],
  data() {
    return {
      dialog: false,
      quantity: 1,
      form: {},
      valid: true,
      loginDialog: false,
      registerDialog: false,
      loading: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) =>
          (v != undefined && v.length >= 8) ||
          'Password must be at least eight characters',
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  methods: {
    clickLogin: function(){
      this.registerDialog = false;
      this.loginDialog = true;
    },
    clickRegister: function(){
      this.loginDialog = false;
      this.registerDialog = true;
    },
    closeAllPopUp: function(){
      this.loginDialog = false;
      this.registerDialog = false;
    },
    copyLink(id) {
      this.$clipboard(
        `${window.location.host}/single-product?product_id=${id}&ref=${this.user.referer_id}`
      )
      this.$toast.success('Referral Link Copied', 'Success')
    },
    async login() {
      this.loading = true
      await this.$store
        .dispatch('auth/login', this.form)
        .then((response) => {
          // this.$toast.success(response.message)
          this.loading = false
          this.loginDialog = false

          this.e1 = 2
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    increaseQuantity() {
      if (this.quantity + 1 > this.product_object.stock_quantity) {
        this.$toast.error('Out of stock')
      } else {
        this.quantity += 1
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    async addToWishList() {
      const data = {
        product_id: this.product_object.id,
      }
      await this.$store
        .dispatch('products/addtowishlist', data)
        .then((response) => {
          this.$toast.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
        })
    },
    async buyNow() {
      this.addToCart()

      if (this.isAuthenticated) {
        this.$router.push('/shopping-cart')
      }
    },
    async addToCart() {
      this.product_object.quantity = this.quantity
      // this.dialog = false
      if (this.isAuthenticated) {
        const data = {
          product: { ...this.product_object, cart_id: null },
        }
        await this.$store
          .dispatch('products/savecart', data)
          .then((response) => {
            if (response.status == true) {
              this.$store.dispatch('products/addToCart', this.product_object)
              this.$toast.success('Product added to cart successfully!')
              // this.$toast.success(response.success.message)
            }
          })
          .catch((error) => {
            // this.$toast.error(error.response.data.error.message)
          })
      } else {
        this.$router.push('/login')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
.product-box {
  position: relative;
  padding: 5px 5px 0;
  border-radius: 10px 10px;

  max-width: 250px;
  &:hover {
    border: 1px dotted #36bdb4;
    max-width: 270px;
  }
  .product-image {
    border-radius: 10px 10px;
  }
  .vendor {
    display: block;
    padding-bottom: 8px;
    margin-bottom: 13px;
    line-height: 1.2;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    border-bottom: 1px solid #e1e1e1;
  }
  .product-title {
    margin: 0;
    display: block;
    font-size: 14px;
    line-height: 1.2em;
    padding-bottom: 5px;
    padding-left: 0;
    color: #06c;
    --max-lines: 2;
    max-height: calc(1.2em * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem;
  }
  .product-price {
    font-size: 16px;
    color: #000;
  }
}

h5 {
  font-size: 16px;
  font-weight: 600;
}

h2 {
  margin-bottom: 10px;
  font-size: 24px;
  color: #000;
  font-weight: 400;
  line-height: 1.2;
}
li,
p {
  margin-bottom: 0.6rem;
  color: #666 !important;
  font-size: 14px;
  color: #000;
  line-height: 20px;
}
.price {
  display: flex;
  del {
    margin-right: 0;
    font-size: 16px;
    font-weight: 500;
    color: #666;
  }
  p.sale-price {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    color: #ec0101 !important;
  }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
  transform: translateY(1)
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(1)
}

@media only screen and (max-width: 768px) {
  .product-box {
    // max-width: 350px;
  }
}
</style>
