<template>

  <div>
    <p class="py-2 pl-3">
      <nuxt-link to="/"> Home </nuxt-link> /
      <nuxt-link
        v-if="product.brand"
        :to="`/brands/${product.brand.name}?brandId=${product.brand.id}`"
      >
        {{ product.brand ? product.brand.name : null }}
      </nuxt-link>
      /
      {{ product.name }}
    </p>
    <v-container v-if="loading">
      <v-overlay color="white" :opacity="1" :value="loading">
        <v-progress-circular color="primary" indeterminate size="50" width="8">
        </v-progress-circular>
      </v-overlay>
    </v-container>
    <v-container v-else>
      <v-row :class="{ 'px-4': $vuetify.breakpoint.smAndDown }">
        <v-col md="4" cols="12">
        
          <v-img :src="product.avatar" 
          width="100%" style="cursor: zoom-in;" alt="" @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660831137/Icon_1b_f5502u.png" ></v-img>
         
          
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
              <del v-if="product.onsale == '1'"
                >&#8358;{{ product.regular_price || 0 | formatPrice }}</del
              >
              <p
                class="sale-price"
                :class="product.onsale == '1' ? 'ml-5' : null"
              >
                &#8358;{{
                  (isAuthenticated
                    ? user.role == 'wholesaler' || user.role == 'next_champ'
                      ? product.wholesale_price
                      : product.price
                    : product.price) || 0 | formatPrice
                }}
              </p>
              
            </div>
            <!-- <p>Sold by: <span class="font-weight-bold"> {{product.brand}}</span></p> -->
            <p>{{ product.short_description }}
             
            
            
            
            </p>
            <!-- <div v-html="product.description">

            </div> -->
            
         
          <v-btn
            
            :loading="loading"
            @click="isAuthenticated ? copyLink() : (loginDialog = true)"
            x-small
            text
            class="primary mb-2" 
          
            >Refer this product</v-btn>
            
          
            <v-divider></v-divider>
            <v-row class="my-3  " justify="end" align="end">
              <v-col md="2" cols="6">
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
              <v-col  class="12">
              <div style="padding-left: 22px" class="text-left">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="
                        isAuthenticated ? addToWishList() : (loginDialog = true)
                      "
                      v-bind="attrs"
                      v-on="on"
                      icon
                      ><v-icon>ri-heart-line</v-icon></v-btn
                    >
                  </template>
                  <span>Add to Wishlist</span>
                </v-tooltip>
                
                
               <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="
                         ShareDialog = true
                      "
                      v-bind="attrs"
                      v-on="on"
                      icon
                      
                      ><v-icon>ri-share-line</v-icon></v-btn
                    >
                  </template>
                  <span>Share</span>
                </v-tooltip>
              </div>
              
              </v-col>
              
            </v-row>
            <v-row class="pb-6 ">
            <v-col class="12" >
                <!-- {{product.stock_status}} -->
                <v-chip
                  color="error"
                  large
                  v-if="product.stock_status == 'outofstock'"
                  >Out of Stock</v-chip
                >
                <div v-else>
                  <v-btn x-large text class="accent px-2 mt-1 " @click="addToCart()"
                    >Add to Cart</v-btn
                  >
                  <v-btn
                    @click="buyNow()"
                    x-large
                    text
                    class="accent font-weight-bold px-4 mt-1"
                    >Buy Now</v-btn
                  >
                  
                </div>
             
              </v-col>
            
            </v-row>
            <v-divider></v-divider>
            
<div >
               <v-expansion-panels focusable flat>
    <v-expansion-panel  
    >
      <v-expansion-panel-header>Description</v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <div v-html="product.description || ''"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel   
    >
      <v-expansion-panel-header>How To Use</v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <div v-html="product.how_to_use || ''"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel  
    >
      <v-expansion-panel-header>Ingredients</v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <div v-html="product.ingridient || ''"></div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  
  </v-expansion-panels>
</div>



 
          </div>

        

      <v-tabs class="pa-6">
              <v-tabs-slider></v-tabs-slider>
              
              
              <v-tab >Recent Reviews</v-tab>

             

              <v-tab-item >
                
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
          cols="6"
        >
          <product-display
            :vendor="i.product.brand ? i.product.brand.name : null"
            :product_name="i.product.name"
            rating="5"
            :price="i.product.price"
            :image="i.product.avatar "  
            :badge="i.product.stock_status"
            :description="i.product.description"
            :short_description="i.product.short_description"
            :product_object="i.product"
            :regular_price="i.product.regular_price"
            :product_id="i.product.id"
           
          />
        </v-col>

           

      </v-row>
    </v-container>
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
    <v-dialog v-model="ShareDialog" width="450px">
      <v-card class="pa-8">
        
        <v-divider></v-divider>
        <v-form lazy-validation v-model="valid" ref="login">
          <v-row>

          <v-col>
          
          <v-text-field
            v-model="firstUrl"
            outlined
            readonly
            placeholder="Share Product Link"
            v-on:focus="$event.target.select()" 
            ref="clone"
             hide-details
          ></v-text-field>
          </v-col>
          </v-row>
          <v-row>

          <v-col>
          
          <v-btn
            block
            :loading="loading"
            @click="copyUrl"
            large
            text
            class="primary mb-4"
            v-clipboard:copy="firstUrl"
            >Copy</v-btn>
          
          </v-col>
        
          
          </v-row>
          
          <v-row align="center"
      justify="center" >
          <h2 class="text-center">Share this product</h2>
          
          </v-row>
          <v-row 
          
          >
          <v-col align="center"
      justify="center" >
          
          <v-btn
            fab
            
            :loading="loading"
            @click="TwitterLink()"
            large
            text
            class="primary mb-2 rounded-circle "
            ><v-icon large >ri-twitter-fill</v-icon>
          </v-btn>
          
          </v-col>

          <v-col
          align="center"
      justify="center"
          >
          
          <v-btn
            fab
            
            :loading="loading"
            @click="FacebookLink()"
            large
            text
            class="primary mb-2  rounded-circle"
            ><v-icon large >ri-facebook-fill</v-icon>
          </v-btn>

          </v-col>
          

          <v-col
          align="center"
      justify="center"
          >
          <v-btn
          fab
            
            :loading="loading"
            @click="WhatsappLink()"
            large
            text
            class="primary mb-2  rounded-circle"
            ><v-icon large >ri-whatsapp-fill</v-icon>
          </v-btn>
          
          
          </v-col>
          </v-row>
        
          
          
          
         
        </v-form>
      </v-card>
    </v-dialog>
  </div>


  
</template>
<div id="fb-root"></div>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v14.0" nonce="GTfjsWYx"></script>
<script>
import { mapGetters } from 'vuex'
import { VueImageZoomer } from 'vue-image-zoomer'


export default {
  transition: 'default',
   metaInfo() {
        return {
            title: `test name`,
            meta: [
              {
            hid: 'description',
            name: 'description',
            content: 'Home page description'
          },
                // {name: 'description', content: this.product.name },
                {property: 'og:title', content: ''},
                {property: 'og:site_name', content: ''},
                {property: 'og:description', content: this.product.name },
                {property: 'og:type', content: ''},
                {property: 'og:url', content: '' },
                {property: 'og:image', content: this.product.avatar }    
            ]
        }
    },
    head() {
      return {
        title: `other namesnnnnnn`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.product.name
          },
          // {name: 'description', content: this.product.name },
          {property: 'og:title', content: ''},
          {property: 'og:site_name', content: ''},
          {property: 'og:description', content: this.product.name },
          {property: 'og:type', content: ''},
          {property: 'og:url', content: '' },
          {property: 'og:image', content: this.product.avatar }   
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
        (v) => v.length >= 8 || 'Password must be at least eight characters',
      ],
      panel: {},
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
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    encodedURL() {
      return encodeURIComponent(
        `${window.location.host}/single-product?product_id=${this.$route.query.product_id}&ref=${this.user.referer_id}`
      )
    },
    encodedText() {
      return encodeURIComponent('Paxo.com.ng')
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
      this.addToCart()
      if (this.isAuthenticated) {
       this.$router.push('/shopping-cart')
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
        this.$router.push('/login')
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
a {
  text-decoration: none;
}
.v-expansion-panel-header {
  
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