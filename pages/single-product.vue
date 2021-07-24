<template>
  <div>
    <p class="py-2 pl-3">
      Home / {{ product.brand ? product.brand.name : null }} /
      {{ product.name }}
    </p>
    <v-container v-if="loading">
      <v-overlay color="primary"  :opacity="1" :value="loading">
        <v-progress-circular indeterminate size="64">
          Loading...
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container v-else>
      <v-row :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
        <v-col md="4" cols="12">
          <img :src="product.avatar" width="100%" alt="" />
        </v-col>
        <v-col md="8">
          <div class="product-details">
            <h2>{{ product.name }}</h2>
            <p style="display: flex">
              Brand: {{ product.brand ? product.brand.name : null }} |
              <v-rating color="orange" dense small :value="5"></v-rating> (1
              review)
            </p>
            <v-divider></v-divider>
            <div class="price mt-5">
              <del v-if="product.onsale == '1'">&#8358;{{ product.regular_price || 0 | formatPrice }}</del>
              <p class=" sale-price" :class="product.onsale == '1' ? 'ml-5' : null">
                &#8358;{{
                  (isAuthenticated
                    ? user.role == 'wholesaler'
                      ? product.wholesale_price
                      : product.price
                    : product.price) || 0 | formatPrice
                }}
              </p>
            </div>
            <!-- <p>Sold by: <span class="font-weight-bold"> {{product.brand}}</span></p> -->
            <p>{{ product.short_description }}</p>
            <!-- <div v-html="product.description">

            </div> -->
            <v-divider></v-divider>
            <v-row class="my-3" justify="end" align="end">
              <v-col md="3" cols="12">
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
              <v-col class="12">
                <v-btn x-large text class="accent" @click="addToCart()"
                  >Add to Cart</v-btn
                >
                <v-btn
                  @click="addToCart(), $router.push('/shopping-cart')"
                  x-large
                  text
                  class="accent font-weight-bold"
                  >Buy Now</v-btn
                >
                <!-- <v-btn icon><v-icon>ri-heart-line</v-icon></v-btn> -->
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-tabs>
              <v-tabs-slider></v-tabs-slider>
              <v-tab>Description</v-tab>
              <!-- <v-tab>Specification</v-tab> -->
              <v-tab>How To Use</v-tab>
              <v-tab>Ingredients</v-tab>
              <v-tab>Reviews</v-tab>

              <v-tab-item class="pa-6">
                <div v-html="product.description || ''"></div>
              </v-tab-item>
              <v-tab-item class="pa-6">
                <div v-html="product.how_to_use || ''"></div>
              </v-tab-item>
              <v-tab-item class="pa-6">
                <div v-html="product.ingridient || ''"></div>
              </v-tab-item>

              <v-tab-item class="pa-6">
                <h3>Recent Reviews</h3>
                <v-divider class="mb-6"></v-divider>
                <div
                  v-for="(i, index) in product.reviews"
                  :key="index"
                  style="border-bottom: 1px solid #ddd"
                  class="py-4"
                >
                  <h4 class="font-weight-bold">"{{ i.content }}"</h4>
                  <p>-- {{ i.name }}</p>
                </div>
                <v-row class="reviews mt-10">
                  <v-col md="5" cols="12">
                    <h1>4.00</h1>
                    <v-rating
                      dense
                      small
                      color="orange"
                      :value="4"
                      readonly
                    ></v-rating>
                    <p class="mb-6">1 review</p>

                    <div class="d-flex">
                      <p class="pa-0 ma-0">5 star</p>
                      <v-progress-linear
                        class="mt-2 mx-3"
                        style="max-width: 260px"
                        height="8"
                      ></v-progress-linear>
                      <p>100%</p>
                    </div>

                    <div class="d-flex">
                      <p class="pa-0 ma-0">4 star</p>
                      <v-progress-linear
                        class="mt-2 mx-3"
                        style="max-width: 260px"
                        height="8"
                      ></v-progress-linear>
                      <p>0</p>
                    </div>
                    <div class="d-flex">
                      <p class="pa-0 ma-0">3 star</p>
                      <v-progress-linear
                        class="mt-2 mx-3"
                        style="max-width: 260px"
                        height="8"
                      ></v-progress-linear>
                      <p>0</p>
                    </div>
                    <div class="d-flex">
                      <p class="pa-0 ma-0">2 star</p>
                      <v-progress-linear
                        class="mt-2 mx-3"
                        style="max-width: 260px"
                        height="8"
                      ></v-progress-linear>
                      <p>0</p>
                    </div>
                    <div class="d-flex">
                      <p class="pa-0 ma-0">1 star</p>
                      <v-progress-linear
                        class="mt-2 mx-3"
                        style="max-width: 260px"
                        height="8"
                      ></v-progress-linear>
                      <p>0</p>
                    </div>
                  </v-col>
                  <v-col>
                    <h5>SUBMIT YOUR REVIEW</h5>
                    <p>
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    <p class="font-weight-bold d-flex">
                      Your rating of this product
                      <v-rating
                        :value="5"
                        class="ml-4"
                        color="orange"
                        small
                        dense
                      ></v-rating>
                    </p>
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-textarea
                        v-model="form.content"
                        required
                        :rules="[(v) => !!v || 'This field is required']"
                        placeholder="Write your review here"
                        outlined
                      ></v-textarea>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.name"
                            required
                            :rules="[(v) => !!v || 'This field is required']"
                            placeholder="Your name"
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                        <v-col md="6">
                          <v-text-field
                            v-model="form.email"
                            required
                            :rules="[(v) => !!v || 'This field is required']"
                            placeholder="Your email"
                            outlined
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-btn
                        class="secondary"
                        :loading="loading"
                        @click="$refs.form.validate() ? submitReview() : null"
                        block
                        text
                        x-large
                        >Submit Review</v-btn
                      >
                    </v-form>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col class="hidden-sm-and-down">
          <!-- <div class="features-widget">
            <p>
              <v-icon size="30" class="mr-4">ri-global-line</v-icon> Shipping
              worldwide
            </p>
            <p>
              <v-icon size="30" class="mr-4">ri-truck-line</v-icon> Free 7-day
              return if eligible, so easy
            </p>
            <p>
              <v-icon size="30" class="mr-4">ri-bill-line</v-icon>Supplier give
              bills for this product.
            </p>
            <p>
              <v-icon size="30" class="mr-4">ri-bank-card-line</v-icon>Pay online
              or when receiving goods
            </p>
          </div> -->
          <!-- <p>Sell on Paxo? <nuxt-link to="/register">Register now</nuxt-link></p> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h1>Related Products</h1>
          <v-divider></v-divider>
        </v-col>
        <v-col
          v-for="i in relatedproduct"
          :key="i"
          class="pa-8"
          :class="{
            'px-8': $vuetify.breakpoint.mdAndUp,
            'px-4': $vuetify.breakpoint.smAndDown,
          }"
          md="3"
        >
          <product-display
            :vendor="i.brand ? i.brand.name : null"
            :product_name="i.name"
            rating="5"
            :price="i.price"
            :image="i.avatar"
            :badge="i.stock_status"
            :description="i.description"
            :short_description="i.short_description"
            :product_object="i"
            :product_id="i.id"
          />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  transition: 'default',
  data() {
    return {
      product: [],
      relatedproduct: [],
      quantity: 1,
      valid: true,
      loading: false,
      form: {},
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '#',
        },
        {
          text: 'Shop',
          disabled: false,
          to: '#',
        },
        {
          text: this.product ? this.product.name : '',
          disabled: true,
          href: '#',
        },
      ],
    }
  },
  mounted() {
    this.getSingleProduct()
    this.getRelatedProduct()
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  watch: {
    '$route.query.product_id': function () {
      this.getSingleProduct()
    },
  },
  methods: {
    async getSingleProduct() {
      this.loading =true
      const data = {
        id: this.$route.query.product_id,
      }
      await this.$store.dispatch('products/single', data).then((response) => {
        this.product = response.data[0]
        this.loading = false
      })
    },
    async getRelatedProduct() {
      const data = {
        id: this.$route.query.product_id,
      }
      await this.$store
        .dispatch('products/relatedproduct', data)
        .then((response) => {
          this.relatedproduct = response.data
        })
    },
    increaseQuantity() {
      this.quantity += 1
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    async submitReview() {
      this.loading = true
      this.form.product_id = this.$route.query.product_id
      await this.$store
        .dispatch('products/addreview', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
          this.getSingleProduct()
          this.$refs.form.reset()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
          this.loading
        })
    },
    async addToCart() {
      this.product.quantity = this.quantity
      this.$store.dispatch('products/addToCart', this.product)
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

.features-widget {
  margin-bottom: 30px;
  background-color: #f1f1f1;
  padding: 20px;
  p {
    position: relative;
    margin-bottom: 20px;

    color: #000;
    line-height: 1.4em;
    font-size: 14px;
  }
}

.reviews {
  h1 {
    font-size: 58px;
    font-weight: 500;
    color: #690;
    line-height: 1;
  }
}
</style>
