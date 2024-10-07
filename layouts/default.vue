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
                  <v-icon>person</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Account Information
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/my-orders" class="py-0 my-0">
                <v-list-item-action>
                  <v-icon>favorite_border</v-icon>
                </v-list-item-action>
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>My Orders
                  </v-list-item-title>
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
      <SearchMenu />

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

      <v-bottom-navigation fixed color="#36bdb4" :value="selectedTab" grow>
        <v-btn color="#36bdb4 accent-4" text value="Home"  to="/">
          <span>Home</span>

          <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.25 24.0625C2.49375 24.0625 1.84658 23.7935 1.3085 23.2554C0.7695 22.7164 0.5 22.0688 0.5 21.3125V8.9375C0.5 8.50208 0.597625 8.08958 0.792875 7.7C0.987208 7.31042 1.25625 6.98958 1.6 6.7375L9.85 0.55C10.1021 0.366667 10.3656 0.229167 10.6406 0.1375C10.9156 0.0458332 11.2021 0 11.5 0C11.7979 0 12.0844 0.0458332 12.3594 0.1375C12.6344 0.229167 12.8979 0.366667 13.15 0.55L21.4 6.7375C21.7438 6.98958 22.0133 7.31042 22.2085 7.7C22.4028 8.08958 22.5 8.50208 22.5 8.9375V21.3125C22.5 22.0688 22.231 22.7164 21.6929 23.2554C21.1539 23.7935 20.5063 24.0625 19.75 24.0625H14.25V14.4375H8.75V24.0625H3.25Z"
              fill="currentColor" />
          </svg>
        </v-btn>
        <v-btn color="#36bdb4 accent-4" text to="/category">
          <span>Categories</span>

          <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.168 9.33301C20.3771 9.33301 22.168 7.54215 22.168 5.33301C22.168 3.12387 20.3771 1.33301 18.168 1.33301C15.9588 1.33301 14.168 3.12387 14.168 5.33301C14.168 7.54215 15.9588 9.33301 18.168 9.33301Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M4.83398 22.666C7.04312 22.666 8.83398 20.8752 8.83398 18.666C8.83398 16.4569 7.04312 14.666 4.83398 14.666C2.62485 14.666 0.833984 16.4569 0.833984 18.666C0.833984 20.8752 2.62485 22.666 4.83398 22.666Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M14.1673 14.6663H22.1673V21.333C22.1673 21.6866 22.0268 22.0258 21.7768 22.2758C21.5267 22.5259 21.1876 22.6663 20.834 22.6663H15.5007C15.147 22.6663 14.8079 22.5259 14.5578 22.2758C14.3078 22.0258 14.1673 21.6866 14.1673 21.333V14.6663ZM0.833984 1.33301H8.83398V7.99967C8.83398 8.3533 8.69351 8.69243 8.44346 8.94248C8.19341 9.19253 7.85427 9.33301 7.50065 9.33301H2.16732C1.8137 9.33301 1.47456 9.19253 1.22451 8.94248C0.97446 8.69243 0.833984 8.3533 0.833984 7.99967V1.33301Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </v-btn>
        <v-btn color="#36bdb4 accent-4" text to="/all-brands">
          <span>Brands</span>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23 10.8937V3.42136C23 2.77918 22.7449 2.16329 22.2908 1.7092C21.8367 1.25511 21.2208 1 20.5786 1H13.1063C12.4642 1.00014 11.8484 1.25533 11.3944 1.70946L1.70894 11.3949C1.25501 11.849 1 12.4648 1 13.1068C1 13.7489 1.25501 14.3647 1.70894 14.8187L9.18127 22.2911C9.63535 22.745 10.2511 23 10.8932 23C11.5352 23 12.151 22.745 12.6051 22.2911L22.2905 12.6056C22.7447 12.1516 22.9999 11.5358 23 10.8937Z"
              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="1.105" cy="1.105" r="1.48" transform="matrix(-1 0 0 1 18.7617 5.2373)" stroke="currentColor"
              stroke-width="0.75" />
          </svg>

        </v-btn>

        <v-btn color="#36bdb4 accent-4" text to="/my-wishlist">
          <span>Wishlist</span>

          <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.2455 18.7752L10.2448 18.7746C7.40244 16.1409 5.08316 13.9912 3.46847 11.974C1.85982 9.96443 1 8.14545 1 6.18188C1 2.98595 3.44825 0.5 6.55 0.5C8.30853 0.5 10.0073 1.33896 11.1159 2.66922L11.5 3.1301L11.8841 2.66922C12.9927 1.33896 14.6915 0.5 16.45 0.5C19.5517 0.5 22 2.98595 22 6.18188C22 8.14545 21.1402 9.96445 19.5314 11.9756C17.9199 13.9901 15.6067 16.1381 12.7721 18.7701L12.7558 18.7852L12.7548 18.7862L11.5013 19.9433L10.2455 18.7752Z"
              stroke="currentColor" />
          </svg>

        </v-btn>

        <v-btn color="#36bdb4 accent-4" text to="/dashboard">
          <span>My Profile</span>

          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M6.44456 16.8923C10.2093 16.3423 12.8015 16.3896 16.5712 16.9116C16.8442 16.9511 17.0936 17.0882 17.2735 17.2973C17.4533 17.5065 17.5514 17.7737 17.5496 18.0495C17.5496 18.3135 17.4589 18.5698 17.295 18.77C17.0093 19.1191 16.7166 19.4623 16.4172 19.7996H17.8697C17.961 19.6907 18.0529 19.5796 18.1458 19.4669C18.472 19.0668 18.65 18.5663 18.6496 18.0501C18.6496 16.9363 17.8367 15.9766 16.7219 15.8226C12.8631 15.2885 10.1659 15.2374 6.28561 15.8044C5.15921 15.9689 4.34961 16.9435 4.34961 18.0649C4.34961 18.5627 4.51186 19.0549 4.81931 19.4537C4.91006 19.5714 4.99971 19.6869 5.08881 19.8002H6.50616C6.22754 19.4666 5.95579 19.1274 5.69106 18.7827C5.53374 18.5763 5.44887 18.3238 5.44961 18.0644C5.44961 17.472 5.87531 16.9754 6.44456 16.8923ZM11.4996 11.5496C11.933 11.5496 12.3621 11.4643 12.7625 11.2984C13.1628 11.1326 13.5266 10.8895 13.8331 10.5831C14.1395 10.2766 14.3826 9.91284 14.5484 9.51247C14.7143 9.11209 14.7996 8.68297 14.7996 8.24961C14.7996 7.81625 14.7143 7.38713 14.5484 6.98675C14.3826 6.58638 14.1395 6.22259 13.8331 5.91616C13.5266 5.60972 13.1628 5.36665 12.7625 5.20081C12.3621 5.03497 11.933 4.94961 11.4996 4.94961C10.6244 4.94961 9.78503 5.29729 9.16616 5.91616C8.54729 6.53503 8.19961 7.3744 8.19961 8.24961C8.19961 9.12482 8.54729 9.96419 9.16616 10.5831C9.78503 11.2019 10.6244 11.5496 11.4996 11.5496ZM11.4996 12.6496C12.6666 12.6496 13.7857 12.186 14.6109 11.3609C15.436 10.5357 15.8996 9.41656 15.8996 8.24961C15.8996 7.08266 15.436 5.9635 14.6109 5.13834C13.7857 4.31318 12.6666 3.84961 11.4996 3.84961C10.3327 3.84961 9.2135 4.31318 8.38834 5.13834C7.56318 5.9635 7.09961 7.08266 7.09961 8.24961C7.09961 9.41656 7.56318 10.5357 8.38834 11.3609C9.2135 12.186 10.3327 12.6496 11.4996 12.6496Z"
              fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.5 20.9C16.9676 20.9 21.4 16.4676 21.4 11C21.4 5.53245 16.9676 1.1 11.5 1.1C6.03245 1.1 1.6 5.53245 1.6 11C1.6 16.4676 6.03245 20.9 11.5 20.9ZM11.5 22C17.5753 22 22.5 17.0753 22.5 11C22.5 4.9247 17.5753 0 11.5 0C5.4247 0 0.5 4.9247 0.5 11C0.5 17.0753 5.4247 22 11.5 22Z"
              fill="currentColor" />
          </svg>

        </v-btn>
      </v-bottom-navigation>


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
        <v-container fluid px-0 :pa-0="$vuetify.breakpoint.mdAndUp" :pt-0="$vuetify.breakpoint.xlAndUp"
          :pt-120="$vuetify.breakpoint.lgAndDown" :pt-80="$vuetify.breakpoint.smAndDown">
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
                    <v-btn class="primary br-left" blockg height="40" width="150" @click="
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
            <a href="tel:2348146907099" class="mb-3">
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
export default {
  components: { SearchProducts, DiscountMenu, SearchMenu, MainMenu },
  data() {
    return {
      showGetGlowing: false,
      selectedTab: "Home",
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
