<template>
  <div>
    <v-app-bar app id="navbar" flat class="white elevation-0 search-bar" :class="{
      'mt-12': $vuetify.breakpoint.mdAndUp,
      'px-4': $vuetify.breakpoint.mdAndUp,
    }" height="72px">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="toggleMenu" />
      <div style="width: 45%" class="mt-3 hidden-sm-and-down">
        <search-products />
      </div>
      <v-spacer class="hidden-md-and-up" />

      <nuxt-link to="/">
        <img src="../../static/assets/Paxo logo Size G.png" width="107" alt="" />
      </nuxt-link>

      <v-spacer />
      <!-- <nuxt-link
          class="nav-btn-small hidden-sm-and-down mx-3"
          to="/paxo-reward"
          >Paxo Reward</nuxt-link
        > -->
      <!-- <nuxt-link class="nav-btn-small hidden-sm-and-down mx-3" to="/offers"
          >Offers</nuxt-link
        > -->

      <!-- <nuxt-link class="nav-btn-small hidden-sm-and-down mx-3" to="/stories"
          >Blog</nuxt-link
        > -->
      <!-- <nuxt-link
          to="/skin-expert"
          class="nav-btn-small hidden-sm-and-down mx-3"
          >Skin Expert</nuxt-link
        > -->
      <!-- <nuxt-link
          to="/track-order"
          class="nav-btn-small hidden-sm-and-down mx-3"
          >Track Order</nuxt-link
        > -->

      <div v-if="!isAuthenticated" class="hidden-sm-and-down mr-3 mt-1">
        <a @click="loginDialog = true" class="nav-btn-small mx-3 sign-in" style="text-decoration: none">Sign In</a>

        |
        <a @click="registerDialog = true" class="nav-btn-small mx-3 sign-up" style="text-decoration: none">Sign Up</a>
      </div>

      <!-- <v-menu
          bottom
          left
          offset-y
          max-width="350"
          max-height="300"
          origin="top right"
          transition="scale-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" icon class="ml-5"
              ><v-icon>more_horiz</v-icon></v-btn
            >
          </template>

<v-list class="py-0">
  <v-list-item @click="newDialog = true" class="py-0 my-0">
    <v-list-item-content class="py-0 my-0">
      <v-list-item-title>
        <img src="~/static/assets/edit-alt.png" alt="" /> Edit
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item @click="deleteDialog = true" class="py-0 my-0">
    <v-list-item-content class="py-0 my-0">
      <v-list-item-title>
        <img src="~/static/assets/delete-alt.png" alt="" /> Delete
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</v-list>
</v-menu> -->
      <v-menu v-if="isAuthenticated" bottom left class="hidden-sm-and-down" offset-y origin="top right"
        transition="scale-transition">
        <template v-slot:activator="{ attrs, on }">
          <!-- <v-overlay
          :z-index="0"
          :opacity="0"
          style="height: 10px"
          class="mt-2 justify-end pr-16 mr-6"
          ><v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon style="height: 10px"
                ><v-chip
                  style="border-radius: 3px; height: 4px"
                  dark
                  color="error"
                  class="pa-2"
                  small
                  id="WalletPrice"
                  >&#8358;{{ user.balance | formatPrice }}</v-chip
                >
              </v-btn>
            </template>
  <span>Wallet Balance</span>
  </v-tooltip>
  </v-overlay> -->

          <!-- <v-btn v-bind="attrs" v-on="on" class="ml-4" icon depressed>
          <v-icon>mdi-account-circle-outline</v-icon></v-btn
        > -->
          <a class="shopping-icon hidden-sm-and-down mr-4 mt-1" :href="isAuthenticated ? '/dashboard' : '/login'">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5.78766 15.474C8.92495 15.0157 11.0851 15.0551 14.2265 15.4901C14.454 15.523 14.6619 15.6372 14.8118 15.8115C14.9616 15.9858 15.0434 16.2085 15.0419 16.4384C15.0419 16.6584 14.9662 16.8719 14.8297 17.0388C14.5916 17.3296 14.3477 17.6157 14.0982 17.8968H15.3086C15.3847 17.806 15.4612 17.7134 15.5387 17.6195C15.8106 17.2861 15.9589 16.869 15.9585 16.4388C15.9585 15.5107 15.2811 14.7109 14.3521 14.5826C11.1364 14.1375 8.88874 14.0949 5.6552 14.5674C4.71654 14.7045 4.04187 15.5166 4.04187 16.4512C4.04187 16.866 4.17708 17.2762 4.43329 17.6085C4.50891 17.7066 4.58362 17.8028 4.65787 17.8972H5.83899C5.60681 17.6193 5.38035 17.3366 5.15975 17.0493C5.02864 16.8774 4.95792 16.667 4.95854 16.4507C4.95854 15.9571 5.31329 15.5432 5.78766 15.474ZM10.0002 11.0218C10.3613 11.0218 10.7189 10.9506 11.0526 10.8124C11.3862 10.6742 11.6894 10.4717 11.9447 10.2163C12.2001 9.96095 12.4027 9.65779 12.5409 9.32415C12.6791 8.9905 12.7502 8.6329 12.7502 8.27177C12.7502 7.91063 12.6791 7.55304 12.5409 7.21939C12.4027 6.88574 12.2001 6.58259 11.9447 6.32723C11.6894 6.07186 11.3862 5.8693 11.0526 5.7311C10.7189 5.5929 10.3613 5.52177 10.0002 5.52177C9.27086 5.52177 8.57138 5.8115 8.05566 6.32723C7.53993 6.84295 7.2502 7.54242 7.2502 8.27177C7.2502 9.00111 7.53993 9.70059 8.05566 10.2163C8.57138 10.732 9.27086 11.0218 10.0002 11.0218ZM10.0002 11.9384C10.9727 11.9384 11.9053 11.5521 12.5929 10.8645C13.2806 10.1769 13.6669 9.24423 13.6669 8.27177C13.6669 7.29931 13.2806 6.36668 12.5929 5.67904C11.9053 4.99141 10.9727 4.6051 10.0002 4.6051C9.02774 4.6051 8.09511 4.99141 7.40748 5.67904C6.71984 6.36668 6.33354 7.29931 6.33354 8.27177C6.33354 9.24423 6.71984 10.1769 7.40748 10.8645C8.09511 11.5521 9.02774 11.9384 10.0002 11.9384Z"
                fill="currentColor" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10 18.8135C14.5563 18.8135 18.25 15.1198 18.25 10.5635C18.25 6.00723 14.5563 2.31352 10 2.31352C5.44375 2.31352 1.75004 6.00723 1.75004 10.5635C1.75004 15.1198 5.44375 18.8135 10 18.8135ZM10 19.7302C15.0628 19.7302 19.1667 15.6263 19.1667 10.5635C19.1667 5.50077 15.0628 1.39685 10 1.39685C4.93729 1.39685 0.833374 5.50077 0.833374 10.5635C0.833374 15.6263 4.93729 19.7302 10 19.7302Z"
                fill="currentColor" />
            </svg>
          </a>

        </template>

        <!-- <v-list dense width="250px" class="py-0">
        <v-list-item dense to="/dashboard" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right"
              >Account Information</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/my-orders" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right">My Orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/my-wishlist" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right"
              >My Wishlist</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/upgrade-wholesaler" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right"
              >Upgrade to Wholesaler</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/become-affiliate" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right"
              >Become an Affiliate</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item dense to="/change-password" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title class="text-right">Change Password </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-divider></v-divider>
        <v-list-item dense to="/logout">
          <v-list-item-content>
            <v-list-item-title class="text-right red--text"
              >Log Out</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>-->
      </v-menu>

      <v-badge :color="cartItem ? 'error' : 'transparent'" :content="cartItem" overlap>
        <a class="shopping-icon" @click="goToCart">
          <!-- <v-icon color="">mdi-shopping-outline</v-icon> -->
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 7.40674V6.90674C0.860302 6.90674 0.726974 6.96518 0.632308 7.06791C0.537641 7.17065 0.49027 7.3083 0.501667 7.44753L1 7.40674ZM17.2 7.40674L17.6983 7.44753C17.7097 7.3083 17.6624 7.17065 17.5677 7.06791C17.473 6.96518 17.3397 6.90674 17.2 6.90674V7.40674ZM16.3546 17.7354L15.8562 17.6946L15.8562 17.6946L16.3546 17.7354ZM14.3387 19.7817V20.2817H14.3389L14.3387 19.7817ZM3.86133 19.7817L3.86111 20.2817H3.86133V19.7817ZM1.84544 17.7354L2.34377 17.6946L2.34377 17.6946L1.84544 17.7354ZM4.55 9.65674C4.55 9.93288 4.77386 10.1567 5.05 10.1567C5.32614 10.1567 5.55 9.93288 5.55 9.65674H4.55ZM9.1 1.78174V1.28174V1.78174ZM13.15 6.28174H13.65H13.15ZM12.65 9.65674C12.65 9.93288 12.8739 10.1567 13.15 10.1567C13.4261 10.1567 13.65 9.93288 13.65 9.65674H12.65ZM1 7.90674H17.2V6.90674H1V7.90674ZM16.7017 7.36595L15.8562 17.6946L16.8529 17.7762L17.6983 7.44753L16.7017 7.36595ZM15.8562 17.6946C15.8195 18.1438 15.6334 18.5517 15.3475 18.842L16.0599 19.5438C16.52 19.0767 16.7982 18.445 16.8529 17.7761L15.8562 17.6946ZM15.3475 18.842C15.063 19.1308 14.7023 19.2816 14.3385 19.2817L14.3389 20.2817C14.9855 20.2815 15.5985 20.0122 16.0599 19.5438L15.3475 18.842ZM14.3387 19.2817H3.86133V20.2817H14.3387V19.2817ZM3.86155 19.2817C3.49774 19.2816 3.13697 19.1308 2.85247 18.842L2.14007 19.5438C2.60153 20.0122 3.21451 20.2815 3.86111 20.2817L3.86155 19.2817ZM2.85247 18.842C2.56656 18.5517 2.38051 18.1438 2.34377 17.6946L1.3471 17.7761C1.40181 18.445 1.68002 19.0767 2.14007 19.5438L2.85247 18.842ZM2.34377 17.6946L1.49833 7.36595L0.501667 7.44753L1.3471 17.7762L2.34377 17.6946ZM5.55 9.65674V6.28174H4.55V9.65674H5.55ZM5.55 6.28174C5.55 5.20486 5.93549 4.18132 6.60786 3.43424L5.86457 2.76528C5.0179 3.70602 4.55 4.97166 4.55 6.28174H5.55ZM6.60786 3.43424C7.27868 2.68889 8.1765 2.28174 9.1 2.28174V1.28174C7.87525 1.28174 6.7128 1.82279 5.86457 2.76528L6.60786 3.43424ZM9.1 2.28174C10.0235 2.28174 10.9213 2.68889 11.5921 3.43424L12.3354 2.76528C11.4872 1.82279 10.3248 1.28174 9.1 1.28174V2.28174ZM11.5921 3.43424C12.2645 4.18132 12.65 5.20486 12.65 6.28174H13.65C13.65 4.97166 13.1821 3.70602 12.3354 2.76528L11.5921 3.43424ZM12.65 6.28174V9.65674H13.65V6.28174H12.65Z"
              fill="currentColor" />
          </svg>
        </a>
      </v-badge>
      <!-- <v-row class="ml-5 hidden-sm-and-down" style="">
          <v-col class="py-0 ma-0">
             <v-btn text class="mt-2">Skin Expert</v-btn>
             <v-btn text>Login</v-btn>

          </v-col>
          <v-col class="pa-0 ma-0">
            <v-badge color="error" content="0" overlap>
              <v-btn icon class="primary--text" outlined depressed>
                <v-icon color="">ri-heart-fill</v-icon>
              </v-btn>
            </v-badge>
          </v-col>
          <v-col class="pa-0 ma-0">
            <v-badge
              :color="cartItem ? 'error' : 'transparent'"
              :content="cartItem"
              overlap
            >
              <v-btn
                to="/shopping-cart"
                icon
                class="primary--text"
                outlined
                depressed
              >
                <v-icon color="">ri-shopping-cart-2-fill</v-icon>
              </v-btn>
            </v-badge>
          </v-col>
          <v-col class="pa-0 ma-0" v-if="isAuthenticated">
            <v-menu
              bottom
              left
              offset-y
              origin="top right"
              transition="scale-transition"
            >
              <template v-slot:activator="{ attrs, on }">
              
                <v-btn v-bind="attrs" v-on="on" icon outlined>
                  <v-icon>ri-user-line</v-icon></v-btn
                >
              </template>

              <v-list dense width="150px" class="py-0">
                <v-list-item dense to="/profile" class="py-0 my-0">
                  <v-list-item-content class="py-0 my-0">
                    <v-list-item-title>My Account </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item dense to="/logout">
                  <v-list-item-content>
                    <v-list-item-title>Logout </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col class="pa-0 ma-0" v-else>
            <nuxt-link class="auth-btn" to="/login">Login</nuxt-link> <br />
            <nuxt-link class="auth-btn" to="/register">Register</nuxt-link>
          </v-col>
        </v-row> -->
      <!-- tested -->
    </v-app-bar>
    <v-dialog v-model="loginDialog" width="600px">
      <Login :clickRegister="clickRegister" :closeAllPopUp="closeAllPopUp" />
    </v-dialog>
    <v-dialog v-model="registerDialog" width="900px">
      <Register :clickLogin="clickLogin" :closeAllPopUp="closeAllPopUp" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShoppingBag from '../../static/assets/svg/shopping-bag.svg'
import Login from './menu/login.vue'
import Register from './menu/register.vue'
export default {
  props: ['toggleMenu'],
  components: {
    ShoppingBag,
    Login,
    Register,
  },
  data() {
    return {
      loginDialog: false,
      registerDialog: false,
    }
  },
  methods: {
    goToCart() {
      if (this.isAuthenticated) {
        window.location = '/shopping-cart';
      }
      else {
        this.clickLogin();
      }
    },
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
  },
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated ? null : window.location.reload()
    },
  },
  onIdle() { },
  onActive() { },
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),

    // brandlength() {
    //   return Math.ceil(this.brands.length / 7)
    // },
  },
  mounted() { },

  beforeMount() { },
  created() { },
}
</script>
<style lang="scss">
.v-dialog {
  background-color: transparent !important;
  box-shadow: none !important;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
<style lang="scss" scoped>
a.sign-in,
a.sign-up,
a.shopping-icon {
  cursor: pointer;
  color: black !important;
  font-size: 16px !important;

  &:hover {
    color: #36bdb4 !important;
    font-size: 17px !important;
  }
}

.btn-active {
  background-color: white !important;
}



@media only screen and (min-width: 768px) {
  .search-bar {
    padding-left: 5% !important;
    padding-right: 5% !important;
  }
}
</style>

