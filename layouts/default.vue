<template>
  <v-app dark>
    <v-container fill-height v-if="pageloading">
      <v-layout row wrap align-center justify-center>
        <v-flex md6 text-center>
          <!-- <img src="../static/assets/google-play.gif" width="100%" alt=""> -->
          <v-progress-circular indeterminate size="50" width="8" color="primary">
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-responsive v-else>
      <v-navigation-drawer fixed v-model="drawer" dark class="hidden-md-and-up side-nav"
        style="background-color: white">
        <div class="d-flex flex-column justify-space-between" style="height: 100%">
          <div class="">
            <div class="primary" style="height: 80px"></div>
            <v-list class="py-0">
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router :class="(isAuthenticated && item.title == 'Sign in') ||
                (isAuthenticated && item.title == 'Sign Up')
                ? 'hidden-sm-and-down'
                : null
                " exact>
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                  <v-list-item-subtitle v-text="item.subtitle" style="font-size: 0.6rem" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider class="primary mt-5 mb-5"></v-divider>
            <v-list width="250px" class="py-0" v-if="!isAuthenticated">
              <v-list-item to="/contact-us" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>mdi-whatsapp</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Customer Support
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/privacy-policy" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>mdi-security</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Privacy Policy
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/terms-condition" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>mdi-file-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Terms & Conditions
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/about-us" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>mdi-information-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>About Us
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-list width="250px" class="py-0" v-if="isAuthenticated">
              <v-list-item to="/dashboard" class="py-0 my-0">
                <v-list-item-action>
                  <AccountInfoIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Account Information
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/my-pending-orders" class="py-0 my-0">
                <v-list-item-action>
                  <PendingOrdersIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>My Orders
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/my-orders" class="py-0 my-0">
                <v-list-item-action>
                  <OrdersIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>My Orders
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/my-wishlist" class="py-0 my-0">
                <v-list-item-action>
                  <WishlistIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>My Wishlist </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/become-affiliate" class="py-0 my-0">
                <v-list-item-action>
                  <AffilateIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Become an Affiliate </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/upgrade-wholesaler" class="py-0 my-0">
                <v-list-item-action>
                  <WholesalerIcon style="color: black" />
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Upgrade to Wholesaler </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/change-password" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>password</v-icon>
                </v-list-item-action>

                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Change Password </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/logout">
                <v-list-item-action>
                  <v-icon>logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Logout </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider class="primary mt-5 mb-5"></v-divider>
            <div class="px-3">
              <h5 class="mt-3" style="font-size: 1rem">Follow us</h5>
              <v-btn icon href="https://facebook.com/paxobeauty" target="_blank">
                <v-icon color="black">ri-facebook-fill</v-icon>
              </v-btn>
              <v-btn icon href="https://instagram.com/paxobeauty" target="_blank">
                <v-icon color="black">ri-instagram-fill</v-icon>
              </v-btn>
              <v-btn icon href="https://api.whatsapp.com/send/?phone=2348146907099&text&app_absent=0" target="_blank">
                <v-icon color="black">ri-whatsapp-fill</v-icon>
              </v-btn>
              <v-btn icon href="https://www.youtube.com/channel/UCoK_tl8YDxh-JDBfeO9RTuQ" target="_blank">
                <v-icon color="white">ri-youtube-fill</v-icon>
              </v-btn>

            </div>

          </div>
          <div class="primary" style="height: 80px" v-if="!isAuthenticated">
            <v-list width="250px" class="py-0 mt-5">
              <v-list-item to="/login" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon style="color: white !important;">person</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title style="color: white !important;">Sign in / Sign up
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-navigation-drawer>

      <!-- Discount bar -->
      <DiscountMenu />
      <!-- Search Menu -->
      <SearchMenu :toggleMenu=toggleMenu />

      <!-- Divider -->
      <v-divider light class="black mt-12 hidden-sm-and-down"></v-divider>

      <!-- Main menu -->
      <MainMenu />

      <!-- App bar for medium screens -->
      <v-app-bar height="70" fixed :class="{
        'second-nav': $vuetify.breakpoint.mdAndUp,
        'second-nav-sm': $vuetify.breakpoint.smAndDown,
      }" class="white px-3 hidden-md-and-up pt-2"
        style="top: -50px; border-top: 2px solid rgba(16, 2, 2, 0.1) !important">

        <v-row class="pt-0 mt-0">
          <!-- <v-col cols="3">
            <v-btn
              class="nav-btn font-weight-medium px-3 pb-0"
              to="/"
              block
              text
            >
              Home</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              class="nav-btn font-weight-medium px-3"
              to="/shop"
              block
              text
            >
              Shop</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              class="nav-btn font-weight-medium px-3"
              to="/stories"
              block
              text
            >
              Blog</v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              class="nav-btn font-weight-medium px-3"
              to="/deals"
              block
              text
            >
              Deals</v-btn
            >
          </v-col> -->
          <v-col cols="12" style="margin-top: -30px">
            <search-products />
          </v-col>
        </v-row>

      </v-app-bar>

      <BottomNav />
      <!-- Floating whatsapp for mobile Only -->
      <!-- <v-btn
        fab
        href="https://api.whatsapp.com/send/?phone=2348146907099&text&app_absent=0"
        target="_blank"
        bottom
        right
        dark
        :small="$vuetify.breakpoint.xsOnly"
        :class="{
          'ma-12': $vuetify.breakpoint.mdAndUp,
          'white--text whatsapp-fab': $vuetify.breakpoint.lgAndDown,
          'ma-4': $vuetify.breakpoint.smAndDown,
          'pa-4': $vuetify.breakpoint.smAndDown,
        }"
        color="#000"
      >
        <v-icon
          :x-large="$vuetify.breakpoint.mdAndUp"
          :large="$vuetify.breakpoint.smAndDown"
          >ri-whatsapp-line</v-icon
        >
      </v-btn> -->

      <!-- <v-btn
        fab
        bottom
        right
        v-if="fab"
        :small="$vuetify.breakpoint.xsOnly"
        :class="{
          primary: $vuetify.breakpoint.lgAndDown,
          'ma-12': $vuetify.breakpoint.mdAndUp,
          'white--text back-to-top': $vuetify.breakpoint.lgAndDown,
          'ma-4': $vuetify.breakpoint.smAndDown,
        }"
        v-scroll-to="'#banner'"
        color="#000"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn> -->

      <!-- News Letter -->
      <v-main class="pt-0" :class="$route.name == 'login'
        ? 'dark-bg'
        : $route.name == 'register'
          ? 'dark-bg'
          : ''
        ">
        <v-container fluid px-0 :pa-0="$vuetify.breakpoint.mdAndUp" 
          :pt-180="$vuetify.breakpoint.xlAndUp"
          :pt-120="$vuetify.breakpoint.lgAndDown" 
          :pt-100="$vuetify.breakpoint.smAndDown">
          <!-- :pt-120="$vuetify.breakpoint.mdAndUp" -->
          <nuxt />
        </v-container>

        <div class="newsletter mt-8 pt-2">
          <v-row :class="{
            'px-8': $vuetify.breakpoint.mdAndUp,
            'px-4': $vuetify.breakpoint.smAndDown,
          }" justify="center" align="center">
            <v-col cols="12" md="7" v-if="showGetGlowing">
              <h2>Get Glowing with Our Beauty Newsletter</h2>
            </v-col>
            <v-col cols="12" md="7" v-else>
              <h3>Newsletter</h3>
              <p>Subcribe to get information about products and coupons</p>
            </v-col>
            <v-col cols="12" md="5">
              <v-form lazy-validation ref="form" v-model="valid">
                <v-row class="mt-2">
                  <v-col cols="8" class="pr-0">
                    <v-text-field placeholder="Email address" outlined dense v-model="form.email" required
                      :rules="emailRules" class="template-subscribe br-right">
                      <!-- <template v-slot:append>
                        <v-btn
                          class="primary br-all-10"
                          blockg
                          height="54"
                          @click="
                            $refs.form.validate() ? subscribeNewsletter() : null
                          "
                          darkg
                          :loading="loading"
                          text
                          style="
                            margin-top: 0.5px;
                            margin-top: 0.5px;
                            margin-right: 0.5px;
                          "
                          >Subscribe</v-btn
                        >
                      </template> -->
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="px-0">
                    <v-btn class="primary br-left" blockg height="40" width="120" @click="
                      $refs.form.validate() ? subscribeNewsletter() : null
                      " darkg :loading="loading" text>Subscribe</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </div>
        <div class="" v-if="showGetGlowing">
          <v-row class="py-7" :class="{
            'px-10 px-8': $vuetify.breakpoint.mdAndUp,
            'px-2': $vuetify.breakpoint.smAndDown,
          }">
            <v-col md="2" cols="6">
              <div class="d-flex flex-row flex-1-0 align-center justify-center">
                <img src="../static/assets/free_shipping.png" width="30" height="30" alt="" class="mr-2" />
                <div class="
                    d-flex
                    flex-column flex-1-0
                    align-items-center
                    justify-content-center
                  ">
                  <span class="f-10 text-body-2">Free Shipping</span>
                  <span class="f-10 text-caption">On orders above #500,000</span>
                </div>
              </div>
            </v-col>
            <v-col md="2" cols="6">
              <div class="d-flex flex-row flex-1-0 align-center justify-center">
                <img src="../static/assets/authentic.png" width="30" height="30" alt="" class="mr-2" />
                <div class="
                    d-flex
                    flex-column flex-1-0
                    align-items-center
                    justify-content-center
                  ">
                  <span class="f-10 text-body-2">Authentic Products</span>
                  <span class="f-10 text-caption">Sourced directly from brands</span>
                </div>
              </div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="d-flex flex-row flex-1-0 align-center justify-center">
                <img src="../static/assets/return_policy.png" width="30" height="30" alt="" class="mr-2" />
                <div class="
                    d-flex
                    flex-column flex-1-0
                    align-items-center
                    justify-content-center
                  ">
                  <span class="f-10 text-body-2">Return Policy</span>
                  <span class="f-10 text-caption">On only damaged goods</span>
                </div>
              </div>
            </v-col>
            <v-col cols="6" md="2">
              <div class="d-flex flex-row flex-1-0 align-center justify-center">
                <img src="../static/assets/brands-100.png" width="30" height="30" alt="" class="mr-2" />
                <div class="
                    d-flex
                    flex-column flex-1-0
                    align-items-center
                    justify-content-center
                  ">
                  <span class="f-10 text-body-2">100+ Brands</span>
                  <span class="f-10 text-caption">Over 1,000 Genuine Products</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4"> </v-col>
          </v-row>
        </div>
      </v-main>

      <!-- Footer -->
      <div height="400" class="white--text footer pt-8">
        <v-row dense :class="{
          'px-6': $vuetify.breakpoint.mdAndUp,
          'px-2': $vuetify.breakpoint.smAndDown,
        }">
          <v-col md="2" cols="12">
            <h4 class="mb-4">Information</h4>
            <nuxt-link to="/about-us">
              <p>About Us</p>
            </nuxt-link>
            <!-- <p>Affiliate</p> -->
            <!-- <p>Career</p> -->
            <nuxt-link to="/contact-us">
              <p>Contact Us</p>
            </nuxt-link>
          </v-col>
          <v-col md="2" cols="12">
            <h4 class="mb-4">Our Services</h4>
            <nuxt-link to="/paxo-reward">
              <p>Paxo Rewards</p>
            </nuxt-link>
            <nuxt-link to="/skin-expert">
              <p>Skin Expert</p>
            </nuxt-link>
            <nuxt-link to="/next-champ">
              <p>Next Champ</p>
            </nuxt-link>
            <!-- <nuxt-link to="/stories">
              <p>Blog</p>
            </nuxt-link>-->
            <!-- <p>FAQs</p> -->
          </v-col>

          <v-col md="2" cols="12">
            <h4 class="mb-4">My Account</h4>
            <nuxt-link to="/upgrade-wholesaler">
              <p>Upgrade to Wholesaler</p>
            </nuxt-link>
            <nuxt-link to="/track-order">
              <p>Track Order</p>
            </nuxt-link>
            <nuxt-link to="/my-wishlist">
              <p>My Wishlist</p>
            </nuxt-link>
          </v-col>
          <v-col cols="12" md="3">
            <h4 class="mb-4">Contact Us</h4>
            <p>Call us 24/7</p>
            <a href="tel:02018891758" class="mb-3">
              <h5 class="black--text" style="font-size: 1.2rem; font-weight: 500">
                02018891758
              </h5>
            </a>
            <p class="mt-3">
              <a href="mailto:info@paxo.com.ng" style="color: white">info@paxo.com.ng</a>
            </p>

            <p class="mb-12 mt-1">No 3, Billings Way, Oregun Ikeja, Lagos</p>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <h4 class="mb-4">Payment methods</h4>
            <div class="d-flex">
              <img src="../static/assets/visa.png" width="50" alt="" /> &nbsp;
              <img src="../static/assets/mastercard2.png" width="50" alt="" />&nbsp;
              <img src="../static/assets/bank_transfer.png" width="50" alt="" />&nbsp;
              <img src="../static/assets/paystack.png" width="50" alt="" />&nbsp;
              <img src="../static/assets/credpal.png" width="50" alt="" />
            </div>
            <h5 class="mt-3" style="font-size: 1rem">Follow us</h5>
            <v-btn icon href="https://facebook.com/paxobeauty" target="_blank">
              <v-icon color="white">ri-facebook-fill</v-icon>
            </v-btn>
            <v-btn icon href="https://instagram.com/paxobeauty" target="_blank">
              <v-icon color="white">ri-instagram-fill</v-icon>
            </v-btn>
            <v-btn icon href="https://api.whatsapp.com/send/?phone=2348146907099&text&app_absent=0" target="_blank">
              <v-icon color="white">ri-whatsapp-fill</v-icon>
            </v-btn>
            <v-btn icon href="https://www.youtube.com/channel/UCoK_tl8YDxh-JDBfeO9RTuQ" target="_blank">
              <v-icon color="white">ri-youtube-fill</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div style="clear: both"></div>
        <div>
          <v-divider class="mt-5"></v-divider>
        </div>
        <div class="
            footer-bottom
            text-center
            px-6
            pt-6
            flex
            align-center
            justify-space-between
          " :class="{
            'flex-row': $vuetify.breakpoint.mdAndUp,
            'flex-column': $vuetify.breakpoint.smAndDown,
          }">
          <nuxt-link to="/my-wishlist">
            <p>
              © Paxo Beauty {{ new Date().getFullYear() }}. All Rights Reserved
            </p>
          </nuxt-link>
          <v-spacer />

          <div class="d-flex flex-row">
            <nuxt-link to="/privacy-policy" style="margin-right: 20px">
              <p>Privacy</p>
            </nuxt-link>
            <nuxt-link to="/terms-condition">
              <p>Terms & Conditions</p>
            </nuxt-link>
          </div>
        </div>
      </div>

      <!-- Dialogs -->
      <v-dialog width="470" v-model="paymentMethodDialog" overlay-color="#36bdb4" overlay-opacity="0.9">
        <v-card class="pa-6 text-center">
          <p class="mt-3">
            You have been idle for 60 seconds. Do you want to continue shopping?
          </p>

          <v-btn outlined text @click="paymentMethodDialog = false">Cancel</v-btn>
        </v-card>
      </v-dialog>
      <v-dialog width="470" v-model="open1MinuteDialog" overlay-color="#36bdb4" overlay-opacity="0.9">
        <v-card class="pa-6 text-center">
          <p class="mt-3">
            You have been idle for 60 seconds. Do you want to continue shopping?
          </p>

          <v-btn outlined text @click="close1MinuteDialog()">Cancel</v-btn>
        </v-card>
      </v-dialog>
    </v-responsive>
  </v-app>
</template>

<script>
import mixpanel from "mixpanel-browser";
import { mapGetters } from 'vuex'
import SearchProducts from '~/components/SearchProducts.vue'
import DiscountMenu from './components/discountmenu.vue'
import SearchMenu from './components/searchmenu.vue'
import MainMenu from './components/mainmenu.vue'
import BottomNav from './components/bottomnav.vue'
import AccountInfoIcon from '../components/icons/account_info.vue'
import PendingOrdersIcon from '../components/icons/pending_order.vue'
import OrdersIcon from '../components/icons/orders.vue'
import WishlistIcon from '../components/icons/wishlist.vue'
import AffilateIcon from '../components/icons/affiliate.vue'
import WholesalerIcon from '../components/icons/wholesaler.vue'
export default {
  components: { SearchProducts, DiscountMenu, SearchMenu, MainMenu, BottomNav, AccountInfoIcon, WholesalerIcon, AffilateIcon, WishlistIcon, OrdersIcon, PendingOrdersIcon },
  data() {
    return {
      showGetGlowing: false,
      selectedTab: "Home",
      paymentMethodDialog: false,
      open1MinuteDialog: false,
      is1MinuteDue: false,
      showBrand: false,
      fab: false,
      drawer: false,
      fixed: false,
      sticky: false,
      searchDialog: null,
      pageloading: true,
      orderedBrands: [],
      brands: [],
      brandsize: 7,
      sections: [],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      form: {},
      valid: true,
      loading: false,
      items: [
        {
          icon: 'mdi-package-variant-closed',
          title: 'Shop All',
          subtitle: 'The best of products just for you.',
          to: '/',
        },
        {
          icon: 'mdi-handshake-outline',
          title: 'Deals',
          subtitle: 'Explore various discounts and promos.',
          to: '/deals',
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'New',
          subtitle: 'Explore our new products.',
          to: '/new',
        },

        {
          icon: 'mdi-star-outline',
          title: 'Paxo Beauty Rewards',
          subtitle: 'Paxo reward program. Shop and win.',
          to: '/paxo-reward',
        },
        {
          icon: 'mdi-professional-hexagon',
          title: 'Skin Expert',
          subtitle: 'Radiant results for glowing outcomes.',
          to: '/skin-expert',
        },
        // {
        //   icon: 'spa',
        //   title: 'About Us',
        //   to: '/about-us',
        // },
        // {
        //   icon: 'contact_support',
        //   title: 'Contact Us',
        //   to: '/contact-us',
        // },
      ],

    }
  },
  methods: {
    toggleMenu(){
      this.drawer = !this.drawer
    },
    manageTemplateComponent() {
      let newPages = [
        '/',
        '/single-product',
        '/shopping-cart',
        '/checkout',
        '/shipping',
      ]
      const currentUrl = new URL(window.location.href)

      if (newPages.includes(currentUrl.pathname)) {
        this.showGetGlowing = true
      } else {
        this.showGetGlowing = false
      }
    },
    close1MinuteDialog() {
      this.is1MinuteDue = false
      this.open1MinuteDialog = false
      this.paymentMethodDialog = false
    },
    scroller() {
      if (window.scrollY > 500) {
        this.fab = true
      } else {
        this.fab = false
      }
    },
    stickyNav() {
      var position = document.documentElement.scrollTop

      document.addEventListener('scroll', function () {
        var scroll = document.documentElement.scrollTop
        // console.log(this.sticky)

        if (window.scrollY > 100) {
          this.sticky = true
        } else {
          this.sticky = false
        }
      })
    },
    async subscribeNewsletter() {
      this.loading = true
      await this.$store
        .dispatch('auth/subscribenewsletter', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    async getCategories() {
      await this.$store.dispatch('category').then((respnose) => {
        // this.categories =
      })
    },
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
        // this.pageloading = false
        this.orderedBrands = _.orderBy(this.brands, 'name')
      })
    },
    async getSections() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
        this.pageloading = false
      })
    },
    getApp() {
      if (navigator.userAgent.match(/Android/i)) {
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.paxo.shop'
      } else if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i)
      ) {
        window.location.href =
          'https://apps.apple.com/ng/app/paxo-beauty/id1534936621'
      }
    },
    sortBrands(alpha) {
      // this.orderedBrands = this.orderedBrands.filter((brand) => brand.name.startsWith(alpha))
      // console.log(this.orderedBrands)
      let startsWithN = this.brands.filter(function (brand) {
        return brand.name[0].toLowerCase() === alpha
      })
      this.orderedBrands = startsWithN
      console.log(startsWithN)
    },
  },
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated ? null : window.location.reload()
    },
    $route: function () {
      this.manageTemplateComponent()
    },
  },
  onIdle() {
    // this.paymentMethodDialog = true
    // this.open1MinuteDialog = false
    // this.is1MinuteDue = true
  },
  onActive() {
    // this.paymentMethodDialog = false
    // if (this.is1MinuteDue) {
    //   let self = this
    //   setTimeout(function () {
    //     self.open1MinuteDialog = true
    //   }, 10000)
    // }
  },
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),

    // orderedBrands: {
    //   get: function () {
    //     return _.orderBy(this.brands, 'name')
    //   },
    //   set: function (newValue) {
    //     return newValue
    //   }
    // },
    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },

    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },
  },

  mounted() {
    this.manageTemplateComponent()
    mixpanel.init("e8933091d8272d61b9c4c16a619ab0e2", { track_pageview: true });
    // this.stickyNav()
  },

  beforeMount() {
    this.getbrands()
    this.getSections()
  },
  created() {
    var date = new Date().toISOString().substr(0, 10)
    window.addEventListener('scroll', this.scroller)
  },
}
</script>
<style lang="scss">
.v-text-field--outlined fieldset {
  border-radius: 10px !important;
  /* border-bottom-left-radius: inherit; */
}

.br-right fieldset {
  border-radius: 10px 0px 0px 10px !important;
}

.br-left {
  border-radius: 0px 10px 10px 0px !important;
}

.template-subscribe .v-input__slot {
  padding-right: 0px !important;
}

.template-subscribe .v-input__append-inner {
  margin-top: 0px !important;
}

.br-all-10 {
  border-radius: 10px !important;
}

.p5p {
  padding: 0px 5% !important;
}

.m5m {
  margin: 0px 5% !important;
}


.font-weight-500 {
  font-weight: 500 !important;
}

// .side-nav > .v-list-item__content {
.side-nav {
  i.v-icon {
    color: black !important;
  }

  .v-list-item__title {
    color: black !important;
  }

  .v-list-item__subtitle {
    color: black !important;
  }
}

.custom5cols {
  width: 20% !important;
  max-width: 20% !important;
  flex-basis: 20% !important;
}
</style>
<style lang="scss">
body {
  font-family: 'Rubik';
}

.p3p {
  padding: 0px 3% !important;
}

.p10p {
  padding: 0px 10% !important;
}

.br-all-5 {
  border-radius: 5px !important;
}

.text-black {
  color: black !important;
}

.text-base-color {
  color: #36bdb4 !important;
}

.v-btn--active {
  border-bottom: 3px solid #36bdb4 !important;
  color: #36bdb4 !important;
  background: white !important;
}

a.nav-btn.v-btn--active {
  color: #000;
  background: none !important;
}
</style>

<style lang="scss" scoped>
// .v-list-item{
//   &:hover{
//     color: #fff !important;
//     background: #ff4e50;
//   }
// }
.search-btn {
  border-radius: 0 4px 4px 0;
  margin-top: -25.5px !important;
}

.auth-btn {
  color: #000;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: #ff4e50;
  }
}

a {
  text-decoration: none;
}

.nav-btn {
  color: #000;
  background: none;
  display: block;
  font-size: 13px;
  cursor: pointer;
  font-weight: 400;
  border-radius: 0;

  &-brand {
    border: 1px solid #000;
  }

  .v-btn--active {
    border-bottom: 3px solid #36bdb4;
    color: #36bdb4;
    background: none !important;
  }

  &:hover {
    border-bottom: 3px solid #36bdb4;
    color: #36bdb4;
  }

  &:hover::before {
    background: transparent !important;
  }
}

.nav-btn-small {
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #ff4e50;
  }
}

.newsletter {
  // background: #444;
  padding: 0px 3%;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;

  h3 {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 24px;
  }

  p {
    font-size: 14px;
    line-height: 1.6em;
    // color: #666;
    color: black;
  }
}

.footer {
  background-color: #8c8d94;
  padding: 20px 3% !important;

  h4 {
    font-size: 16px;
    margin-bottom: 30px;
    color: #fff;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    line-height: 1.6em;
    color: #fff;
  }

  h3 {
    // color: #fcb800;
    font-size: 24px;
  }
}

.pt-120 {
  padding-top: 120px !important;
}

.pt-100 {
  padding-top: 170px !important;
}

.footer-bottom {
  display: flex;
  justify-content: center;
}

.dark-bg {
  background-color: #f1f1f1 !important;
}

.second-nav {
  margin-top: 69.5px !important;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 10%) !important;
}

.second-nav-sm {
  margin-top: 119px !important;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 10%) !important;
}

@media only screen and (max-width: 768px) {
  .second-nav {
    margin-top: 71px !important;
  }

  a.nav-btn {
    padding-bottom: 0 !important;
    height: 30px !important;
  }
}

.v-btn--active {
  border-bottom: 3px solid #36bdb4;
  color: #36bdb4;

  &:before {
    background: transparent !important;
  }
}

a {
  padding-bottom: 0 !important;
}

.logo-size-md {
  width: 130px;
}

.logo-size-sm {
  width: 100px;
}

.back-to-top {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999999;
  border-radius: 50px !important;
}

.whatsapp-fab {
  background: #00e676 !important;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999999;
  border-radius: 50px !important;
}

.back-to-top:hover {
  background: #ff4e50 !important;
  color: #000 !important;
}
</style>
