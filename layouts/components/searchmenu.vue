<template>
  <v-app-bar
    app
    id="navbar"
    flat
    class="white elevation-0 mt-12 search-bar"
    :class="{
      'mt-12': $vuetify.breakpoint.mdAndUp,
      'px-4': $vuetify.breakpoint.mdAndUp,
    }"
    height="72px"
  >
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    />
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

    <div v-if="!isAuthenticated" class="hidden-sm-and-down mr-5">
      <nuxt-link to="/login" class="nav-btn-small mx-3" style="text-decoration: none; color: black">Sign In</nuxt-link>
      |
      <nuxt-link to="/register" class="nav-btn-small mx-3" style="text-decoration: none; color: black">Sign Up</nuxt-link>
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
    <v-menu
      v-if="isAuthenticated"
      bottom
      left
      class=""
      offset-y
      origin="top right"
      transition="scale-transition"
    >
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

        <v-btn v-bind="attrs" v-on="on" class="ml-4" icon depressed>
          <v-icon>mdi-account-circle-outline</v-icon></v-btn
        >
      </template>

      <v-list dense width="250px" class="py-0">
        <v-list-item dense to="/dashboard" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>Account Informations </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/my-orders" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>My Orders </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/my-wishlist" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>My Wishlist </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/become-affiliate" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>Become an Affiliate </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/upgrade-wholesaler" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>Upgrade to Wholesaler </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/change-password" class="py-0 my-0">
          <v-list-item-content class="py-0 my-0">
            <v-list-item-title>Change Password </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense to="/logout">
          <v-list-item-content>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-badge
      :color="cartItem ? 'error' : 'transparent'"
      :content="cartItem"
      overlap
    >
      
      <a :href="(isAuthenticated) ? '/shopping-cart' : '/login'">
        <v-icon color="">mdi-shopping-outline</v-icon>
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {},
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated ? null : window.location.reload()
    },
  },
  onIdle() {},
  onActive() {},
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),

    // brandlength() {
    //   return Math.ceil(this.brands.length / 7)
    // },
  },
  mounted() {},

  beforeMount() {},
  created() {},
}
</script>
<style lang="scss" scoped>
.btn-active{
  background-color: white !important;
}
@media only screen and (min-width: 768px) {
  .search-bar {
    padding-left: 3% !important;
    padding-right: 3% !important;
  }
}
</style>
