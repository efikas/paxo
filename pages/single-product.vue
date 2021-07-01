<template>
  <div>
    <v-breadcrumbs class="pt-0 breadcrumb" :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          class="pa-0 pt-4"
          :href="item.href"
          :disabled="item.disabled"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-row :class="{'px-4' : $vuetify.breakpoint.smAndDown}">
      <v-col md="4" cols="12">
        <img :src="product.avatar" width="100%" alt="" />
      </v-col>
      <v-col md="5">
        <div class="product-details">
          <h2>{{product.name}}</h2>
          <p style="display: flex">
            Brand: {{product.brand}} |
            <v-rating color="orange" dense small :value="5"></v-rating> (1
            review)
          </p>
          <v-divider></v-divider>
          <div class="price mt-5">
            <del>&#8358;{{(parseInt(product.price) + 0.15 * parseInt(product.price)) || 0 | formatPrice}}</del>
            <p class="ml-5 sale-price">&#8358;{{product.price || 0 | formatPrice}}</p>
          </div>
          <p>Sold by: <span class="font-weight-bold"> {{product.brand}}</span></p>
          <p>{{product.short_description}}</p>
          <div v-html="product.description">

          </div>
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
              <v-btn x-large text class="accent" @click="addToCart()">Add to Cart</v-btn>
              <v-btn to="shopping-cart" x-large text class="accent font-weight-bold"
                >Buy Now</v-btn
              >
              <v-btn icon><v-icon>ri-heart-line</v-icon></v-btn>

            </v-col>
          </v-row>
          <v-divider></v-divider>
          <p class="mt-6" style="text-decoration: underline">Report Abuse</p>
          <p>SKU: SF1133569600-1</p>
          <p>Categories: Consumer Electronics Refrigerator Babies & Moms</p>
          <p>Tags: sofa technologies wireless</p>
        </div>
      </v-col>
      <v-col class="hidden-sm-and-down">
        <div class="features-widget">
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
        </div>
        <p>Sell on Paxo? <nuxt-link to="/register">Register now</nuxt-link></p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-8" :class="{'px-8':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}" md="10">
        <v-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab>Description</v-tab>
          <!-- <v-tab>Specification</v-tab> -->
          <v-tab>Reviews</v-tab>

          <v-tab-item class="pa-6">
            <div v-html="product.description">

            </div>
          </v-tab-item>
          <!-- <v-tab-item class="pa-6">
            <v-simple-table>
              <tbody>
                <tr>
                  <td class="font-weight-bold">Color</td>
                  <td>Black Gray</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Style</td>
                  <td>Hear Hook</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Wireless</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Dimensions</td>
                  <td>Black Gray</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-tab-item> -->
          <v-tab-item class="pa-6">
            <v-row class="reviews">
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

                <div class="d-flex ">
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
              <v-col >
                <h5>SUBMIT YOUR REVIEW</h5>
                <p>
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <p class="font-weight-bold d-flex" >Your rating of this product <v-rating :value="5" class="ml-4" color="orange" small dense></v-rating></p>
                <v-form>
                  <v-textarea placeholder="Write your review here" outlined></v-textarea>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field placeholder="Your name" outlined>

                      </v-text-field>
                    </v-col>
                    <v-col md="6">
                      <v-text-field placeholder="Your email" outlined>

                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-btn class="secondary" block text x-large>Submit Review</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  transition: 'default',
  data() {
    return {
      product: [],
      quantity: 1,
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
  created() {
    this.getSingleProduct()
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    async getSingleProduct () {
      const data = {
        id: this.$route.query.product_id
      }
      await this.$store.dispatch('products/single', data).then(response => {
        this.product = response.data[0]
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

   async addToCart(){
      this.product.quantity = this.quantity
      this.$store.dispatch('products/addToCart', this.product)
      this.$toast.success('Product added to cart successfully!')
      this.dialog = false
       if(this.isAuthenticated){
        await this.$store.dispatch('products/savecart').then(response => {
          this.$toast.success(response.success.message)
        }).catch(error => {
          // this.$toast.error(error.response.data.error.message)
        })
      }
    }
  }
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
