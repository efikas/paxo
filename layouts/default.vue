<template>
  <v-app dark>
    <v-container fill-height v-if="pageloading">
      <v-layout row wrap align-center justify-center>
        <v-flex md6 text-center>
          <!-- <img src="../static/assets/google-play.gif" width="100%" alt=""> -->
          <v-progress-circular
            indeterminate
            size="50"
            width="8"
            color="primary"
          >
          </v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-responsive v-else>
      <v-navigation-drawer
        fixed
        v-model="drawer"
        dark
        class="primary hidden-md-and-up"
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            :class="
              (isAuthenticated && item.title == 'Sign in') ||
              (isAuthenticated && item.title == 'Sign Up')
                ? 'hidden-sm-and-down'
                : null
            "
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list width="250px" class="py-0" v-if="isAuthenticated">
          <v-list-item to="/dashboard" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>person</v-icon>
            </v-list-item-action>
            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>Account Information </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/my-orders" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>favorite_border</v-icon>
            </v-list-item-action>
            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>My Orders </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/my-wishlist" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>favorite_border</v-icon>
            </v-list-item-action>
            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>My Wishlist </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/become-affiliate" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>group_work</v-icon>
            </v-list-item-action>
            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>Become an Affiliate </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/upgrade-wholesaler" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>receipt</v-icon>
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
      </v-navigation-drawer>

      <!-- Discount bar -->
      <DiscountMenu />
      <!-- Search Menu -->
      <SearchMenu />

      <!-- Divider -->
      <v-divider light class="black mt-12"></v-divider>


      <!-- Main menu -->
      <MainMenu />


      <!-- App bar for medium screens -->
      <v-app-bar
        height="100"
        fixed
        :class="{
          'second-nav': $vuetify.breakpoint.mdAndUp,
          'second-nav-sm': $vuetify.breakpoint.smAndDown,
        }"
        flat
        class="white px-3 hidden-md-and-up"
      >
        <v-row class="pt-3 mt-">
          <v-col cols="3">
            <v-btn
              class="nav-btn font-weight-medium px-3 pb-0"
              to="/"
              block
              text
            >
              Home</v-btn
            >
            <!-- <nuxt-link to="/" class="nav-btn">Home</nuxt-link> -->
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
              to="/offers"
              block
              text
            >
              Offers</v-btn
            >
          </v-col>
          <v-col cols="12" style="margin-top: -30px">
            <search-products />
          </v-col>
        </v-row>
      </v-app-bar>
      
      <!-- Floating whatsapp for mobile Only -->
      <v-btn
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
      </v-btn>

      <v-btn
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
      </v-btn>
      
      <!-- News Letter -->
      <v-main
        class="pt-0"
        :class="
          $route.name == 'login'
            ? 'dark-bg'
            : $route.name == 'register'
            ? 'dark-bg'
            : ''
        "
      >
        <v-container
          fluid
          px-0
          :pa-0="$vuetify.breakpoint.mdAndUp"
          :pt-120="$vuetify.breakpoint.mdAndUp"
          :pt-100="$vuetify.breakpoint.smAndDown"
        >
          <nuxt />
        </v-container>
        <div class="newsletter mt-8">
          <v-row
            :class="{
              'px-8': $vuetify.breakpoint.mdAndUp,
              'px-4': $vuetify.breakpoint.smAndDown,
            }"
            justify="center"
            align="center"
          >
            <v-col cols="12" md="5">
              <h3>Newsletter</h3>
              <p>Subcribe to get information about products and coupons</p>
            </v-col>
            <v-col cols="12" md="7">
              <v-form lazy-validation ref="form" v-model="valid">
                <v-row>
                  <v-col cols="8" md="9" class="pr-0">
                    <v-text-field
                      placeholder="Email address"
                      outlined
                      v-model="form.email"
                      required
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" md="3" class="pl-0">
                    <v-btn
                      class="primary"
                      block
                      height="56"
                      @click="
                        $refs.form.validate() ? subscribeNewsletter() : null
                      "
                      dark
                      :loading="loading"
                      style="border-radius: 0 5px 5px 0"
                      text
                      >Subscribe</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </div>
      </v-main>

      <!-- Footer -->
      <div height="400" class="white--text footer pt-8">
        <v-row
          dense
          :class="{
            'px-6': $vuetify.breakpoint.mdAndUp,
            'px-2': $vuetify.breakpoint.smAndDown,
          }"
        >
        <v-col md="2" sm="4" cols="6">
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
        <v-col md="2" sm="4" cols="6">
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
          
          <v-col md="2" sm="4" cols="6">
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
          <v-col cols="6" sm="3" md="3">
            <h4 class="mb-4">Contact Us</h4>
            <p>Call us 24/7</p>
            <a href="tel:2348146907099" class="mb-3">
              <h5 class="primary--text" style="font-size: 1.2rem">234 814 690 7099</h5>
            </a>
            <p class="mt-3"><a href="mailto:info@paxo.com.ng" style="color: white">info@paxo.com.ng</a></p>

            <p class="mb-12 mt-1">No 3, Billings Way, Oregun Ikeja, Lagos</p>
          </v-col>
          <v-col cols="6" sm="3" md="3">
            <h4 class="mb-4">Payment methods</h4>
            <div>
              <img src="../static/assets/visa.png" width="50" alt="" />
              <img src="../static/assets/mastercard2.png" width="50" alt="" />
              <img src="../static/assets/bank_transfer.png" width="50" alt="" />
              <img src="../static/assets/paystack.png" width="50" alt="" />
              <img src="../static/assets/credpal.png" width="50" alt="" />
            </div>
            <h5 class="mt-3" style="font-size: 1.0rem">Follow us</h5>
            <v-btn icon href="https://facebook.com/paxobeauty" target="_blank">
              <v-icon color="white">ri-facebook-fill</v-icon>
            </v-btn>
            <v-btn icon href="https://instagram.com/paxobeauty" target="_blank">
              <v-icon color="white">ri-instagram-fill</v-icon>
            </v-btn>
            <v-btn
              icon
              href="https://api.whatsapp.com/send/?phone=2348146907099&text&app_absent=0"
              target="_blank"
            >
              <v-icon color="white">ri-whatsapp-fill</v-icon>
            </v-btn>
            <v-btn
              icon
              href="https://www.youtube.com/channel/UCoK_tl8YDxh-JDBfeO9RTuQ"
              target="_blank"
            >
              <v-icon color="white">ri-youtube-fill</v-icon>
            </v-btn>
          </v-col>
          
         
        </v-row>
        <div style="clear: both"></div>
        <div>
          <v-divider class="mt-5"></v-divider>
        </div>
        <div class="footer-bottom text-center px-6 pt-6 flex align-center justify-space-between">
          <nuxt-link to="/my-wishlist">
            <p>© Paxo Beauty {{ new Date().getFullYear() }}. All Rights Reserved</p>
            </nuxt-link>
            <v-spacer />
                <nuxt-link to="/privacy-policy" style="margin-right: 20px">
                  <p>Privacy</p>
                </nuxt-link>
                <nuxt-link to="/terms-condition">
                  <p>Terms & Conditions</p>
                </nuxt-link>
          <div>
            <!-- <p>We Using Safe Payment For:</p> -->
          </div>
        </div>
      </div>

      <!-- Dialogs -->
      <v-dialog
        width="470"
        v-model="paymentMethodDialog"
        overlay-color="#36bdb4"
        overlay-opacity="0.9"
      >
        <v-card class="pa-6 text-center">
          <p class="mt-3">
            You have been idle for 60 seconds. Do you want to continue shopping?
          </p>

          <v-btn outlined text @click="paymentMethodDialog = false"
            >Cancel</v-btn
          >
        </v-card>
      </v-dialog>
      <v-dialog
        width="470"
        v-model="open1MinuteDialog"
        overlay-color="#36bdb4"
        overlay-opacity="0.9"
      >
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
import { mapGetters } from 'vuex'
import SearchProducts from '~/components/SearchProducts.vue'
import DiscountMenu from './components/discountmenu.vue'
import SearchMenu from './components/searchmenu.vue'
import MainMenu from './components/mainmenu.vue'
export default {
  components: { SearchProducts, DiscountMenu, SearchMenu, MainMenu },
  data() {
    return {
      paymentMethodDialog: false,
      open1MinuteDialog: false,
      is1MinuteDue: false,
      showBrand: false,
      fab: false,
      drawer: null,
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
          icon: 'home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'login',
          title: 'Sign in',
          to: '/login',
        },
        {
          icon: 'app_registration',
          title: 'Sign Up',
          to: '/register',
        },

        {
          icon: 'medication',
          title: 'Skin Expert',
          to: '/skin-expert',
        },
        {
          icon: 'trending_up',
          title: 'Track Order',
          to: '/track-order',
        },
        {
          icon: 'spa',
          title: 'About Us',
          to: '/about-us',
        },
        {
          icon: 'contact_support',
          title: 'Contact Us',
          to: '/contact-us',
        },
      ],
    }
  },
  methods: {
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
  },
  mounted() {
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
  padding: 20px 3%;
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
  background-color: #8C8D94;
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
