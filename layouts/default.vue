<template>
  <v-app dark>
    <v-container fill-height v-if="pageloading" >
      <v-layout row wrap align-center justify-center >
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
          <v-list-item to="/change-password" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>password</v-icon>
            </v-list-item-action>

            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>Change Password </v-list-item-title>
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
          <v-list-item to="/become-affiliate" class="py-0 my-0">
            <v-list-item-action>
              <v-icon>group_work</v-icon>
            </v-list-item-action>
            <v-list-item-content class="py-0 my-0">
              <v-list-item-title>Become an Affiliate </v-list-item-title>
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

      <v-app-bar app color="" style="" class="top-top" id="banner">
        <p style="font-size: 12px">
          Win a FREE gift on your first order.<br />
          <span class="hidden-md-and-up">Use Code: <b>FIRSTGIFT</b></span>
        </p>
        <div
          style="
            background: white;
            border: 2px dashed #000;
            font-size: 12px;
            margin-top: -15px;
          "
          class="pa-0 hidden-sm-and-down px-1 ml-3"
          :class="{ 'mx-3': $vuetify.breakpoint.smAndDown }"
        >
          Use Code: <b>FIRSTGIFT</b>
        </div>
        <v-spacer></v-spacer>
        <!-- <v-btn
          class="secondary hidden-sm-and-down"
          v-scroll-to="'#download'"
          small
          text
          style="margin-top: -15px"
        >
          <v-icon size="18">smartphone</v-icon>
          DOWNLOAD APP</v-btn
        > -->
  <p class="hidden-sm-and-down">
    <!-- <v-btn class="secondary" small text>DOWNLOAD</v-btn> -->
    DOWNLOAD APP:&emsp; <a style="color: #333;" href="https://apps.apple.com/ng/app/paxo-beauty/id1534936621" target="_blank">IOS</a> &emsp; <a style="color: #333;" href="https://play.google.com/store/apps/details?id=com.paxo.shop" target="_blank">ANDROID</a>
  </p>

        <v-btn
          class="secondary hidden-md-and-up"
          @click="getApp()"
          small
          text
          style="margin-top: -15px"
        >
          <v-icon size="18">smartphone</v-icon>
          GET APP</v-btn
        >
        <!-- <v-fab-transition>
            <v-btn color="primary" dark absolute bottom right fab>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition> -->
      </v-app-bar>
      <v-app-bar
        app
        id="navbar"
        flat
        class="white elevation-1 mt-12"
        :class="{
          'mt-12': $vuetify.breakpoint.mdAndUp,
          'px-4': $vuetify.breakpoint.mdAndUp,
        }"
        style="border-bottom: 1px solid #000"
        height="70px"
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
          <img src="../static/assets/Paxo Logo Green.png" width="" alt="" />
        </nuxt-link>

        <v-spacer />
        <nuxt-link class="nav-btn-small hidden-sm-and-down mx-3" to="/paxo-reward"
          >Paxo Reward</nuxt-link
        >
        <!-- <nuxt-link class="nav-btn-small hidden-sm-and-down mx-3" to="/stories"
          >Blog</nuxt-link
        > -->
        <nuxt-link
          to="/skin-expert"
          class="nav-btn-small hidden-sm-and-down mx-3"
          >Skin Expert</nuxt-link
        >
        <!-- <nuxt-link
          to="/track-order"
          class="nav-btn-small hidden-sm-and-down mx-3"
          >Track Order</nuxt-link
        > -->

        <div v-if="!isAuthenticated" class="hidden-sm-and-down">
          <nuxt-link to="/login" class="nav-btn-small mx-3">Sign in</nuxt-link>
          |
          <nuxt-link to="/register" class="nav-btn-small mx-3"
            >Sign up</nuxt-link
          >
        </div>

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
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="ml-4 hidden-sm-and-down"
              icon
              outlined
            >
              <v-icon>ri-user-line</v-icon></v-btn
            >
          </template>

          <v-list dense width="250px" class="py-0">
            <v-list-item dense to="/dashboard" class="py-0 my-0">
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Account Information </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/change-password" class="py-0 my-0">
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Change Password </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/upgrade-wholesaler" class="py-0 my-0">
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Upgrade to Wholesaler </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item dense to="/become-affiliate" class="py-0 my-0">
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Become an Affiliate </v-list-item-title>
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

            <v-list-item dense to="/logout">
              <v-list-item-content>
                <v-list-item-title>Logout </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
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
      <v-divider light class="black mt-12"></v-divider>
      <div
        fixed
        style="height: 50px; position: fixed; z-index: 1; width: 100%"
        flat
        class="white px-3 d-lg-flex d-md-flex justify-space-between align-center second-nav hidden-sm-and-down"
      >
        <v-menu
          open-on-hover
          bottom
          offset-y :close-on-content-click="false"
          origin="top left"
          open-delay="500"
          max-width="100vw"
          class="elevation-0"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="nav-btn-brand px-3" v-bind="attrs" v-on="on" text>
              Brands</v-btn
            >
          </template>

          <v-list
            dense
            flat
            style="width: 100vw"
            min-height="400px"
            max-height="400px"
            class="py-0 elevation-0"
          >
            <v-row>
              <v-col cols="12" class="pa-8 ">
                <div class="d-flex justify-space-between">
                  <v-btn icon small>All</v-btn>
                  <v-btn icon small>#</v-btn>
                  <v-btn icon small>A</v-btn>
                  <v-btn icon small>B</v-btn>
                  <v-btn icon small>C</v-btn>
                  <v-btn icon small>D</v-btn>
                  <v-btn icon small>E</v-btn>
                  <v-btn icon small>F</v-btn>
                  <v-btn icon small>G</v-btn>
                  <v-btn icon small>H</v-btn>
                  <v-btn icon small>I</v-btn>
                  <v-btn icon small>J</v-btn>
                  <v-btn icon small>K</v-btn>
                  <v-btn icon small>L</v-btn>
                  <v-btn icon small>M</v-btn>
                  <v-btn icon small>N</v-btn>
                  <v-btn icon small>O</v-btn>
                  <v-btn icon small>P</v-btn>
                  <v-btn icon small>Q</v-btn>
                  <v-btn icon small>R</v-btn>
                  <v-btn icon small>S</v-btn>
                  <v-btn icon small>T</v-btn>
                  <v-btn icon small>U</v-btn>
                  <v-btn icon small>V</v-btn>
                  <v-btn icon small>W</v-btn>
                  <v-btn icon small>X</v-btn>
                  <v-btn icon small>Y</v-btn>
                  <v-btn icon small>Z</v-btn>
                </div>
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <div class="d-flex justify-space-between pa-10 pt-0">
              <div v-for="(i,index) in 4" :key="index">
                <nuxt-link
                  v-for="j in orderedBrands.slice(index,index + 7)"
                  :key="j.id"
                  :to="'/category/' + j.name + '?categoryId=' + j.id"
                  style="text-decoration: none; margin-bottom: 0 !important"
                >
                  <p
                    class="primary--text font-weight-bold"
                    style="font-size: 13px"
                  >
                    {{ j.name }}
                  </p></nuxt-link
                >

              </div>
            </div>
          </v-list>
        </v-menu>
        <v-menu
          v-for="(i, index) in sections.slice(0, 12)"
          :key="index"
          open-on-hover
          bottom
          offset-y
          origin="top left"
          open-delay="500"
          max-width="100vw"
          class="elevation-0"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="nav-btn px-3" v-bind="attrs" v-on="on" text>
              {{ i.name }}</v-btn
            >
          </template>

          <v-list
            dense
            flat
            style="width: 100vw"
            min-height="400px"
            class="py-0 elevation-0"
          >
            <v-row>
              <v-col
                md="2"
                v-for="(j, index) in i.category"
                :key="index"
                class="pa-8"
              >
                <p v-if="i.category.length == 0">No categories found</p>
                <nuxt-link
                  :to="'/category/' + j.name + '?categoryId=' + j.id"
                  style="text-decoration: none; margin-bottom: 0 !important"
                >
                  <p
                    class="primary--text font-weight-bold"
                    style="font-size: 13px"
                  >
                    {{ j.name }}
                  </p></nuxt-link
                >
                <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
                  <nuxt-link
                    :to="'/category/' + k.name + '?categoryId=' + k.id"
                    >{{ k.name }}</nuxt-link
                  >
                </div>
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </div>
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
            <v-btn  class="nav-btn font-weight-medium px-3" to="/paxo-reward" block text>
              Offers</v-btn
            >
          </v-col>
          <v-col cols="12" style="margin-top: -30px">
            <search-products />
          </v-col>
        </v-row>
      </v-app-bar>
      <v-btn fab bottom right v-if="fab"

      :small="$vuetify.breakpoint.xsOnly"
      :class="{
        'primary': $vuetify.breakpoint.lgAndDown,
        'ma-12': $vuetify.breakpoint.mdAndUp,
        'white--text back-to-top': $vuetify.breakpoint.lgAndDown,
        'ma-4': $vuetify.breakpoint.smAndDown
      }"

      v-scroll-to="'#banner'"
      color="#000"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
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
      <div height="400" class="white--text footer pt-8">
        <v-row
          dense
          :class="{
            'px-6': $vuetify.breakpoint.mdAndUp,
            'px-2': $vuetify.breakpoint.smAndDown,
          }"
        >
          <v-col cols="6" sm="3" md="4">
            <h4 class="mb-4">Contact Us</h4>
            <p>Call us 24/7</p>
            <h3 class="primary--text">234 814 690 7099</h3>
            <a href="mailto:info@paxo.com.ng">info@paxo.com.ng</a>

            <p class="mb-12">No 3, Billings Way, Oregun Ikeja, Lagos
</p>

          </v-col>
          <v-col md="3" sm="3" cols="6">
            <h4 class="mb-4">Quick Links</h4>
            <nuxt-link to="/paxo-rewards">
              <p>Paxo Rewards</p>
            </nuxt-link>
            <nuxt-link to="/stories">
              <p>Blog</p>
            </nuxt-link>
            <!-- <nuxt-link to="/login">
              <p>Sign In</p>
            </nuxt-link>
            <nuxt-link to="/register">
              <p>Sign Up</p>
            </nuxt-link> -->
            <nuxt-link to="/privacy-policy">
              <p>Privacy Policy</p>

            </nuxt-link>
            <nuxt-link to="/terms-condition">
            <p>Terms & Conditions</p>

            </nuxt-link>
            <!-- <p>FAQs</p> -->
          </v-col>
          <v-col md="3" sm="3" cols="6">
            <h4 class="mb-4">Company</h4>
            <nuxt-link to="/about-us">
              <p>About Us</p>

            </nuxt-link>
            <!-- <p>Affiliate</p> -->
            <!-- <p>Career</p> -->
            <nuxt-link to="/contact-us">
            <p>Contact Us</p>
            <h4 class="mt-8">Socials</h4>
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
            <v-btn icon>
              <v-icon>ri-youtube-fill</v-icon>
            </v-btn>

            </nuxt-link>
          </v-col>
          <v-col md="2" sm="3" cols="6">
            <h4 class="mb-4">Business</h4>
            <!-- <p>Our Press</p>
            <p>Checkout</p> -->
            <nuxt-link to="/dashboard">
              <p>My account</p>
            </nuxt-link>
            <nuxt-link to="/offers">
              <p>Shop</p>

            </nuxt-link>
          </v-col>
        </v-row>
        <div style="clear: both"></div>
        <div>
          <v-divider class="mt-5"></v-divider>
        </div>
        <div class="footer-bottom text-center px-6">
          <div class="text-center">
            <p>© {{ new Date().getFullYear() }} Paxo. All Rights Reserved</p>
          </div>
          <div>
            <!-- <p>We Using Safe Payment For:</p> -->
          </div>
        </div>
      </div>
    </v-responsive>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchProducts from '~/components/SearchProducts.vue'
export default {
  components: { SearchProducts },
  data() {
    return {
      fab:false,
      drawer: null,
      fixed: false,
      sticky: false,
      searchDialog: null,
      pageloading: true,
      brands: [],
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
        ;('https://apps.apple.com/ng/app/paxo-beauty/id1534936621')
      }
    },
  },
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated']),
    orderedBrands() {
      return _.orderBy(this.brands, 'name')
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
a{
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
.sub-menu a {
  text-decoration: none;
  color: #000;
  font-size: 14px;
  &:hover {
    color: #ff4e50;
  }
}
.newsletter {
  // background: #444;
  padding: 65px 0;
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
    color: #666;
  }
}
.footer {
  background-color: #000;
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
.top-top {
  background-color: #36bdb4 !important;
  // opacity: 0.8;
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
.back-to-top:hover {
  background: #ff4e50 !important;
  color: #000 !important;
}
</style>
