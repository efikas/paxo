<template>
  <div>
    <v-hover v-slot="{ hover }">
      <div class="product-box">
        <nuxt-link :to="'/single-product?product_id=' + product_id">
          <v-img :src="image" width="100%">
            <v-chip
              v-if="badge"
              :class="badge == 'instock' ? 'primary' : 'error'"
              style="float: right; border-radius: 0"
              small
              >{{ badge == 'instock' ? 'Instock' : 'Out of stock' }}</v-chip
            >
          </v-img>
        </nuxt-link>
        <v-expand-transition>
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
                  @click="addToCart()"
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
                <v-btn icon small v-bind="attrs" v-on="on"
                  ><v-icon small>ri-user-shared-line</v-icon></v-btn
                >
              </template>
              <span>Refer Product</span>
            </v-tooltip>
            <!-- <v-btn icon small
              ><v-icon small>ri-exchange-funds-line</v-icon></v-btn
            > -->
          </v-card>
        </v-expand-transition>
        <div class="vendor">{{ vendor }}</div>
        <div class="product-title">
          <nuxt-link :to="'/single-product?product_id=' + product_id">
            {{ product_name }}
          </nuxt-link>
        </div>
        <v-rating
          dense
          small
          color="orange"
          :value="parseInt(rating)"
        ></v-rating>
        <div class="product-price d-flex justify-space-between text-right">
          <del
            v-if="product_object.onsale == '1'"
            style="color: #bbb; font-size"
            >&#8358;{{ regular_price | formatPrice }}</del
          >
          <p v-else></p>
          &#8358;{{
            (isAuthenticated
              ? user.role == 'wholesaler'
                ? wholesale_price
                : price
              : price) | formatPrice
          }}
        </div>
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
                      ? user.role == 'wholesaler'
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
                    @click="addToCart(), $router.push('/shopping-cart')"
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
    <v-dialog v-model="loginDialog" width="450px">
      <v-card class="pa-8">
        <h2 class="text-center mb-8">Login to Continue</h2>
        <v-divider></v-divider>
        <v-form lazy-validation v-model="valid" ref="login">
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
          <v-btn
            block
            :loading="loading"
            @click="$refs.login.validate() ? login() : null"
            large
            text
            class="primary mb-4"
            >Login</v-btn
          >
          <div class="text-center">
            No account yet? <nuxt-link to="/register">Register here</nuxt-link
            ><br />
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
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
      loading: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  mounted() {
    console.log(this.$route.fullPath)
  },
  methods: {
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
    async addToCart() {
      this.product_object.quantity = this.quantity
      this.$store.dispatch('products/addToCart', this.product_object)
      this.$toast.success('Product added to cart successfully!')
      this.dialog = false
      if (this.isAuthenticated) {
        await this.$store
          .dispatch('products/savecart')
          .then((response) => {
            this.$toast.success(response.success.message)
          })
          .catch((error) => {
            // this.$toast.error(error.response.data.error.message)
          })
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
  padding: 20px 20px 0;

  max-width: 250px;
  &:hover {
    border: 1px solid #d9d9d9;
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
</style>
