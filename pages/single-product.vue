<template>

  <div>
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container v-else>

      <v-row :class="{ 'px-1': $vuetify.breakpoint.smAndDown, 'page-body': $vuetify.breakpoint.mdAndUp }">
        <v-col cols="12" offset-md="1" md="10">
          <div :class="{ 'page-bodyk': $vuetify.breakpoint.mdAndUp }">
            <p class="py-2">
              <nuxt-link to="/"> Home </nuxt-link> &nbsp;>&nbsp;
              <nuxt-link v-if="product.brand" :to="`/brands/${product.brand.name}?brandId=${product.brand.id}`">
                {{ product.brand ? product.brand.name : null }}
              </nuxt-link>
              &nbsp;>&nbsp;
              {{ product.name }}
            </p>
          </div>

          <v-row>
            <v-col md="5" cols="12">
              <div class="d-flex flex-row-reverse">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="#36bdb4" class="" v-bind="attrs" v-on="on" @click="
                      isAuthenticated ? addToWishList() : (loginDialog = true)
                      ">
                      <v-icon>ri-heart-line</v-icon>
                    </v-btn>
                  </template>
                  <span>Add to Wishlist</span>
                </v-tooltip>
              </div>

              <v-img :src="product.avatar" width="100%" style="cursor: zoom-in;" alt=""
                @error="$event.target.src = '../static/assets/paxo_icon_logo.png'"
                lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660831137/Icon_1b_f5502u.png"></v-img>

              <div class="d-flex flex-row py-3 px-3 policy mt-3">
                <div class="d-flex flex-row flex-1-0 align-center justify-center">
                  <img src="../static/assets/tabler_award.png" width="20" height="20" alt="" class="mr-2" />
                  <div class="d-flex flex-column flex-1-0 align-items-center justify-content-center">
                    <span class="f-10">Authentic Products</span>
                    <span class="f-10">Sourced directly from brands</span>
                  </div>
                </div>
                <v-divider vertical thickness="4" class="mx-2"></v-divider>
                <div class="d-flex flex-row flex-1-0 align-center justify-center">
                  <img src="../static/assets/prime_box.png" width="20" height="20" alt="" class="mr-2" />
                  <div class="d-flex flex-column flex-1-0 align-items-center justify-content-center">
                    <span class="f-10">Return Policy</span>
                    <span class="f-10">On only damaged goods</span>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col md="7">
              <div class="product-details">
                <p style="display: flex">
                  Brand: {{ product.brand ? product.brand.name : null }}</p>
                <h3 class="primary--text">{{ product.name }}</h3>
                <p style="display: flex" class="mt-2">
                  <v-rating color="orange" dense small :value="5"></v-rating> &nbsp;&nbsp; 38 ratings & 1
                  review
                </p>

                <p> <v-btn outlined small :color="(product.stock_status != 'outofstock') ? 'primary' : 'error'"
                    :class="(product.stock_status != 'outofstock') ? 'primary-text' : 'error-text'"
                    class="mb-2 br-all-5 text-caption">
                    <v-icon small> {{ (product.stock_status != 'outofstock') ? 'mdi-check-circle-outline' :
                      'mdi-close-circle-outline' }} </v-icon>
                    &nbsp;&nbsp;{{ (product.stock_status != 'outofstock') ? 'In Stock' : 'Out of Stock' }}</v-btn>
                </p>
                <v-btn :loading="loading" @click="isAuthenticated ? copyLink() : (loginDialog = true)" outlined small
                  color="primary" class="mb-1 br-all-5">
                  <v-icon small>mdi-share-variant</v-icon>
                  &nbsp;
                  <span style="color:black" class="text-caption">Refer this product</span></v-btn>
                <!-- <v-divider></v-divider> -->
                <div class="price mt-3">
                  <p class="sale-price">
                    &#8358;{{
                      (isAuthenticated
                        ? user.role == 'wholesaler' || user.role == 'next_champ'
                          ? product.wholesale_price
                          : product.price
                        : product.price) || 0 | formatPrice
                    }}
                  </p>
                  <del v-if="product.onsale == '1'" :class="product.onsale == '1' ? 'ml-5' : null">&#8358;{{
                    product.regular_price || 0 | formatPrice }}</del>
                </div>
                <div class="text-caption">inclusive of all taxes</div>
                <div class="mt-3 text-caption paxo-gift px-4 py-2">Get a Free Gift on All Orders for New customers to
                  Paxo Beauty!</div>

                <div class="my-3 d-flex">
                  <div class="qty-box pa-2 br-all-5">
                    <v-btn @click="decreaseQuantity()" icon small color="bg-grey-darken-2"
                      :class="(quantity > 1) ? 'primary' : 'grey'"><v-icon
                        style="color:white">ri-subtract-fill</v-icon></v-btn>
                    <p class="ma-0 mt-1">{{ quantity }}</p>
                    <v-btn class="primary text-white" icon small @click="increaseQuantity()"><v-icon
                        style="color:white">ri-add-fill</v-icon></v-btn>
                  </div>

                  <v-btn v-if="product.stock_status != 'outofstock'" @click="addToCart()" color="primary"
                    class="primary br-all-5 ml-5" style="width: 70%; height: 45px">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 7.40674V6.90674C0.860302 6.90674 0.726974 6.96518 0.632308 7.06791C0.537641 7.17065 0.49027 7.3083 0.501667 7.44753L1 7.40674ZM17.2 7.40674L17.6983 7.44753C17.7097 7.3083 17.6624 7.17065 17.5677 7.06791C17.473 6.96518 17.3397 6.90674 17.2 6.90674V7.40674ZM16.3546 17.7354L15.8562 17.6946L15.8562 17.6946L16.3546 17.7354ZM14.3387 19.7817V20.2817H14.3389L14.3387 19.7817ZM3.86133 19.7817L3.86111 20.2817H3.86133V19.7817ZM1.84544 17.7354L2.34377 17.6946L2.34377 17.6946L1.84544 17.7354ZM4.55 9.65674C4.55 9.93288 4.77386 10.1567 5.05 10.1567C5.32614 10.1567 5.55 9.93288 5.55 9.65674H4.55ZM9.1 1.78174V1.28174V1.78174ZM13.15 6.28174H13.65H13.15ZM12.65 9.65674C12.65 9.93288 12.8739 10.1567 13.15 10.1567C13.4261 10.1567 13.65 9.93288 13.65 9.65674H12.65ZM1 7.90674H17.2V6.90674H1V7.90674ZM16.7017 7.36595L15.8562 17.6946L16.8529 17.7762L17.6983 7.44753L16.7017 7.36595ZM15.8562 17.6946C15.8195 18.1438 15.6334 18.5517 15.3475 18.842L16.0599 19.5438C16.52 19.0767 16.7982 18.445 16.8529 17.7761L15.8562 17.6946ZM15.3475 18.842C15.063 19.1308 14.7023 19.2816 14.3385 19.2817L14.3389 20.2817C14.9855 20.2815 15.5985 20.0122 16.0599 19.5438L15.3475 18.842ZM14.3387 19.2817H3.86133V20.2817H14.3387V19.2817ZM3.86155 19.2817C3.49774 19.2816 3.13697 19.1308 2.85247 18.842L2.14007 19.5438C2.60153 20.0122 3.21451 20.2815 3.86111 20.2817L3.86155 19.2817ZM2.85247 18.842C2.56656 18.5517 2.38051 18.1438 2.34377 17.6946L1.3471 17.7761C1.40181 18.445 1.68002 19.0767 2.14007 19.5438L2.85247 18.842ZM2.34377 17.6946L1.49833 7.36595L0.501667 7.44753L1.3471 17.7762L2.34377 17.6946ZM5.55 9.65674V6.28174H4.55V9.65674H5.55ZM5.55 6.28174C5.55 5.20486 5.93549 4.18132 6.60786 3.43424L5.86457 2.76528C5.0179 3.70602 4.55 4.97166 4.55 6.28174H5.55ZM6.60786 3.43424C7.27868 2.68889 8.1765 2.28174 9.1 2.28174V1.28174C7.87525 1.28174 6.7128 1.82279 5.86457 2.76528L6.60786 3.43424ZM9.1 2.28174C10.0235 2.28174 10.9213 2.68889 11.5921 3.43424L12.3354 2.76528C11.4872 1.82279 10.3248 1.28174 9.1 1.28174V2.28174ZM11.5921 3.43424C12.2645 4.18132 12.65 5.20486 12.65 6.28174H13.65C13.65 4.97166 13.1821 3.70602 12.3354 2.76528L11.5921 3.43424ZM12.65 6.28174V9.65674H13.65V6.28174H12.65Z"
                        fill="currentColor" />
                    </svg>
                    &nbsp;
                    <span style="color:white" class="text-caption"> &nbsp; Add to Cart &nbsp; &nbsp;</span></v-btn>
                
                </div>
              </div>
            </v-col>



            <v-col sm="8">
              <div class="product-detailsf">
                <div>
                  <v-expansion-panels flat multiple v-model="panels">
                    <v-expansion-panel>
                      <v-expansion-panel-header style="font-size: 16px;">Product Description</v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <div v-html="product.description || ''" style="font-size: 12px;"></div>
                      </v-expansion-panel-content>
                      <v-divider color="primary"></v-divider>
                    </v-expansion-panel>
                    <v-divider></v-divider>
                    <v-expansion-panel>
                      <v-expansion-panel-header style="font-size: 16px;">How To Use</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div v-html="product.how_to_use || ''" style="font-size: 12px;"></div>
                      </v-expansion-panel-content>
                      <v-divider color="primary"></v-divider>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header style="font-size: 16px;">Ingredients</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div v-html="product.ingridient || ''" style="font-size: 12px;"></div>
                      </v-expansion-panel-content>
                      <v-divider color="primary"></v-divider>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header style="font-size: 16px;">Reviews ({{ (product.reviews != undefinded) ?
                        product.reviews.length : 0
                        }})</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div v-for="(i, index) in product.reviews" :key="index" style="border-bottom: 1px solid #ddd"
                          class="py-4">
                          <p>{{ i.name }} - <i>{{ i.created_at }}</i></p>
                          <p>{{ i.content }}</p>
                        </div>
                        <v-row class="reviews mt-10 pa-0">
                          <!-- <v-col md="5" cols="12">
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
                          <p class="pa-0 ma-0">5<i class="ri-star-line"></i></p>
                          <v-progress-linear
                            class="mt-2 mx-3"
                            style="max-width: 260px"
                            height="8"
                          ></v-progress-linear>
                          <p>100%</p>
                        </div>

                        <div class="d-flex">
                          <p class="pa-0 ma-0">4<i class="ri-star-line"></i></p>
                          <v-progress-linear
                            class="mt-2 mx-3"
                            style="max-width: 260px"
                            height="8"
                          ></v-progress-linear>
                          <p>0</p>
                        </div>
                        <div class="d-flex">
                          <p class="pa-0 ma-0">3<i class="ri-star-line"></i></p>
                          <v-progress-linear
                            class="mt-2 mx-3"
                            style="max-width: 260px"
                            height="8"
                          ></v-progress-linear>
                          <p>0</p>
                        </div>
                        <div class="d-flex">
                          <p class="pa-0 ma-0">2<i class="ri-star-line"></i></p>
                          <v-progress-linear
                            class="mt-2 mx-3"
                            style="max-width: 260px"
                            height="8"
                          ></v-progress-linear>
                          <p>0</p>
                        </div>
                        <div class="d-flex">
                          <p class="pa-0 ma-0">1<i class="ri-star-line"></i></p>
                          <v-progress-linear
                            class="mt-2 mx-3"
                            style="max-width: 260px"
                            height="8"
                          ></v-progress-linear>
                          <p>0</p>
                        </div>
                      </v-col> -->
                          <v-col class="pa-0">
                            <h5>WRITE YOUR REVIEW</h5>
                            <p>
                              Required fields are marked *
                            </p>
                            <p class="font-weight-bold d-flex">
                              Overall Rating *
                              <v-rating :value="5" class="ml-4" color="orange" small dense></v-rating>
                            </p>

                            <v-form v-model="valid" ref="form" lazy-validation>
                              <!-- <v-container> -->
                              <v-textarea v-model="form.content" required
                                :rules="[(v) => !!v || 'This field is required']" placeholder="Write your review here"
                                outlined rounded></v-textarea>
                              <v-row>
                                <v-col cols="12" md="6">
                                  <v-text-field v-model="form.name" required
                                    :rules="[(v) => !!v || 'This field is required']" placeholder="Nickname"
                                    label="Nickname *" outlined>
                                  </v-text-field>
                                </v-col>
                                <v-col md="6">
                                  <v-text-field v-model="form.email" required
                                    :rules="[(v) => !!v || 'This field is required']" placeholder="Email"
                                    label="Email *" class="br-all-5" outlined rounded>
                                  </v-text-field>
                                </v-col>
                              </v-row>
                              <v-btn class="primary br-all-5" rounded :loading="loading"
                                @click="$refs.form.validate() ? submitReview() : null" text x-large>Submit
                                Review</v-btn>
                              <!-- </v-container> -->
                            </v-form>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                      <v-divider color="primary-color" class="mt-4"></v-divider>
                    </v-expansion-panel>

                  </v-expansion-panels>
                </div>
              </div>
            </v-col>
            <!-- <v-col class="hidden-sm-and-down"> -->
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
            <!-- </v-col> -->
          </v-row>
        </v-col>
      </v-row>

      <!-- <v-col class="hidden-sm-and-down"> -->
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
      <!-- </v-col> -->
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12">
          <h3>Related Products</h3>
          <v-divider></v-divider>
        </v-col>
        <v-col v-for="(i, index) in relatedproduct.slice(0, ($vuetify.breakpoint.smAndDown) ? 6 : 5)" :key="index"
          class="pa-8" :class="{
            'px-2 custom5cols': $vuetify.breakpoint.mdAndUp,
            'px-4': $vuetify.breakpoint.smAndDown,
          }" md="auto" cols="6">
          <product-display :vendor="i.product.brand ? i.product.brand.name : null" :product_name="i.product.name"
            rating="5" :price="i.product.price" :wholesale_price="i.product.wholesale_price" :image="i.product.avatar"
            :badge="i.product.stock_status" :description="i.product.description"
            :short_description="i.product.short_description" :product_object="i.product"
            :regular_price="i.product.regular_price" :product_id="i.product.id" />
        </v-col>



      </v-row>
    </v-container>

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

    <v-dialog v-model="ShareDialog" width="450px">
      <v-card class="pa-8">

        <v-divider></v-divider>
        <v-form lazy-validation v-model="valid" ref="login">
          <v-row>

            <v-col>

              <v-text-field v-model="firstUrl" outlined readonly placeholder="Share Product Link"
                v-on:focus="$event.target.select()" ref="clone" hide-details></v-text-field>
            </v-col>
          </v-row>
          <v-row>

            <v-col>

              <v-btn block :loading="loading" @click="copyUrl" large text class="primary mb-4"
                v-clipboard:copy="firstUrl">Copy</v-btn>

            </v-col>


          </v-row>

          <v-row align="center" justify="center">
            <h2 class="text-center">Share this product</h2>

          </v-row>
          <v-row>
            <v-col align="center" justify="center">

              <v-btn fab :loading="loading" @click="TwitterLink()" large text
                class="primary mb-2 rounded-circle "><v-icon large>ri-twitter-fill</v-icon>
              </v-btn>

            </v-col>

            <v-col align="center" justify="center">

              <v-btn fab :loading="loading" @click="FacebookLink()" large text
                class="primary mb-2  rounded-circle"><v-icon large>ri-facebook-fill</v-icon>
              </v-btn>

            </v-col>


            <v-col align="center" justify="center">
              <v-btn fab :loading="loading" @click="WhatsappLink()" large text
                class="primary mb-2  rounded-circle"><v-icon large>ri-whatsapp-fill</v-icon>
              </v-btn>


            </v-col>
          </v-row>





        </v-form>
      </v-card>
    </v-dialog>
  </div>



</template>
<div id="fb-root"></div>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v14.0"
  nonce="GTfjsWYx"></script>
<script>
import { mapGetters } from 'vuex'
import { VueImageZoomer } from 'vue-image-zoomer'
import mixpanel from 'mixpanel-browser';
import Login from '../layouts/components/menu/login.vue'
import Register from '../layouts/components/menu/register.vue'

export default {
  transition: 'default',
  components: {
        Login,
        Register,
    },
  //  metaInfo() {
  //       return {
  //           title: `test name`,
  //           meta: [
  //             {
  //           hid: 'description',
  //           name: 'description',
  //           content: 'Home page description'
  //         },
  //               // {name: 'description', content: this.product.name },
  //               {property: 'og:title', content: ''},
  //               {property: 'og:site_name', content: ''},
  //               {property: 'og:description', content: this.product.name },
  //               {property: 'og:type', content: ''},
  //               {property: 'og:url', content: '' },
  //               {property: 'og:image', content: this.product.avatar }    
  //           ]
  //       }
  //   },
    head() {
      return {
        // title: `other namesnnnnnn`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.product.name
          },
          {property: 'og:title', content: this.product.name},
          {property: 'og:site_name', content: 'paxo'},
          {property: 'og:description', content: this.product.description },
          {property: 'og:url', content: window.location.href },
          {property: 'og:image', content: this.product.avatar },
          {property: 'product:brand', content: this.product.name } ,  
          {property: 'product:availability', content: this.product.stock_status } ,  
          {property: 'product:condition', content: "new" } ,  
          {property: 'product:price:amount', content: this.product.regular_price } ,  
          {property: 'product:price:currency', content: "NGN" } ,  
          {property: 'product:item_group_id', content: this.product.id } ,  
          {property: 'product:retailer_item_id', content: this.product.id } ,  
        ]
      }
    },
  data() {
    return {
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) => (v != undefined && v.length >= 8) || 'Password must be at least eight characters',
      ],
      panel: {},
      panels: [0, 1, 2, 3],
      product: [],
      relatedproduct: [],
      AccItems: [
                {
                    title: "Description",
                    
                    
                },
                {
                    title: "How To Use",
                    
                },
                {
                  title: "Ingredients",
                  
                },
            ],
      quantity: 1,
      valid: true,
      loading: false,
      firstUrl: encodeURI(document.location.href),
      loginDialog: false,
      registerDialog: false,
      ShareDialog: false,
      facebookURL:
        'http://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(
          `${window.location.host}/single-product?product_id=${this.$route.query.product_id}`
        ) +
        '&title=view this product on Paxo website',
      twitterURL:
        'https://twitter.com/intent/tweet?text=view this product on Paxo website' +
        '&url=' +
        encodeURIComponent(
          `${window.location.host}/single-product?product_id=${this.$route.query.product_id}`
        ),
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
    if (this.$route.query.ref) {
      this.$store.commit('products/SAVE_REFERAL', this.$route.query.ref)
    }
    this.getSingleProduct()
    this.getRelatedProduct()
    mixpanel.init("e8933091d8272d61b9c4c16a619ab0e2", {track_pageview: true});
    mixpanel.track("Product view", {
      product_id: this.$route.query.product_id,
      location: "",
    });
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    encodedURL() {
      return encodeURIComponent(
        `${window.location.host}/single-product?product_id=${this.$route.query.product_id}&ref=${this.user.referer_id}`
      )
    },
    encodedText() {
      return encodeURIComponent('paxobeauty.com')
    },
  },
  watch: {
    '$route.query.product_id': function () {
      this.getSingleProduct()
    },
    function () {
        this.firstUrl = encodeURI(document.location.href)
    }
  },
  methods: {
   clickLogin: function () {
            this.registerDialog = false;
            this.loginDialog = true;
        },
        clickRegister: function () {
            this.loginDialog = false;
            this.registerDialog = true;
        },
        closeAllPopUp: function () {
            this.loginDialog = false;
            this.registerDialog = false;
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
    copyLink() {
      this.$clipboard(
        `${window.location.host}/single-product?product_id=${this.$route.query.product_id}&ref=${this.user.referer_id}`
      )
      this.$toast.success('Referral Link Copied', 'Success')
    },
    copyUrl(){
      
     this.$refs.clone.focus();
      document.execCommand('copy');
      this.$toast.success('Link Copied', 'Success')
    },
    TwitterLink(){
     let postUrl = encodeURI(document.location.href)
     let postTitle = encodeURI("Hi everyone, please check this out: ")
     let locationUrl = `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
     window.open(locationUrl)
    
    },
    FacebookLink(){
     let postUrl = encodeURI(document.location.href)
     let postTitle = encodeURI("Hi everyone, please check this out: ")
     let locationUrl  = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`
     window.open(locationUrl)
    },
    WhatsappLink(){
    
    let postUrl = encodeURI(document.location.href)
    let postTitle = encodeURI("Hi everyone, please check this out: ")
    let locationUrl  = `https://api.whatsapp.com/send?text=${postUrl}`
    window.open(locationUrl)
    },
    CopyToClipBoard(){
    
     alert("Copied")
    },
    async addToWishList() {
      const data = {
        product_id: this.product.id,
      }
      await this.$store
        .dispatch('products/addtowishlist', data)
        .then((response) => {
          this.$toast.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
    },
    async getSingleProduct() {
      this.loading = true
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
      // console.log(this.product)
      if (this.quantity + 1 > this.product.stock_quantity) {
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
    async buyNow() {
     
      if (this.isAuthenticated) {
        this.addToCart()
       this.$router.push('/shopping-cart')
      }
      else {
        this.loginDialog = true
      }
    },
    async addToCart() {
      // this.product.quantity = this.quantity
      // this.$store.dispatch('products/addToCart', this.product)
      // this.$toast.success('Product added to cart successfully!')
      // this.dialog = false
      // if (this.isAuthenticated) {
      //   await this.$store
      //     .dispatch('products/savecart')
      //     .then((response) => {
      //       this.$toast.success(response.success.message)
      //     })
      //     .catch((error) => {
      //       // this.$toast.error(error.response.data.error.message)
      //     })
      // }

      this.product.quantity = this.quantity
      // this.dialog = false
      if (this.isAuthenticated) {
        const data = {
          product: { ...this.product, cart_id: null },
        }
        await this.$store
          .dispatch('products/savecart', data)
          .then((response) => {
            if(response.status == true){
              this.$store.dispatch('products/addToCart', this.product)
              this.$toast.success('Product added to cart successfully!')
              // this.$toast.success(response.success.message)
            }
            
          })
          .catch((error) => {
            // this.$toast.error(error.response.data.error.message)
          })
      }
      else {
        this.loginDialog = true
      }
    },
  },
}

</script>
<style lang="scss" scoped>
.policy {
  background-color: #6666661A;
  border-radius: 10px;
}

.paxo-gift {
  background-color: #6666661A;
  margin-top: 15px;
}

.primary-color {
  color: #00C3B7;
}

.f-10 {
  font-size: 0.5rem;
}

.grey {
  background-color: grey !important;
}

.page-body {
  padding: 0px 10% !important;
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
  border: 0.5px solid #00C3B7;
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

a {
  text-decoration: none;
}

.v-expansion-panel.v-expansion-panel--active.v-expansion-panel--next-active.v-item--active {
  z-index: "" !important;
}

.v-expansion-panel-header {
  // font-weight: bold;
  font-size: 1.2rem;
}
</style>

/*
Social Share Links:
WhatsApp:
https://wa.me/?text=[post-title] [post-url]
Facebook:
https://www.facebook.com/sharer.php?u=[post-url]
Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]
Pinterest:
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]
LinkedIn:
https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]
*/