<template>
  <div>
    <v-list class="mt-7 py-0">
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          :to="item.to"
          v-for="(item, i) in menus"
          :key="i"
          active-class="sidebar-active"
          outlinedk
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-title
              ><span class="text-caption">{{
                item.subtitle
              }}</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn
      outlined
      block
      color="primary"
      class="br-all-5 primary-text mt-5"
      to="/logout"
    >
      <v-icon small>ri-logout-circle-line</v-icon>
      &nbsp;&nbsp;Logout</v-btn
    >
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  middleware: 'authenticated',
  data() {
    return {
      menus: [
        {
          icon: 'ri-user-line',
          text: 'Account Information',
          subtitle: 'Payments, contact info, addresses',
          to: '/dashboard',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'Pending Orders',
          subtitle: 'View pending orders',
          to: '/my-pending-orders',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'Orders',
          subtitle: 'View & track your online and pickup orders',
          to: '/my-orders',
        },
        {
          icon: 'ri-heart-line',
          text: 'Wishlist',
          subtitle: 'View items you liked and add them to cart',
          to: '/my-wishlist',
        },
        {
          icon: 'ri-honour-line',
          text: 'Become an Affiliate',
          subtitle: 'Earn on referral purchases',
          to: '/become-affiliate',
        },
        {
          icon: 'ri-briefcase-line',
          text: 'Upgrade to Wholesaler',
          subtitle: 'Buy in bulk at wholesale prices for your stores',
          to: '/upgrade-wholesaler',
        },
        // {
        //   icon: 'ri-logout-circle-line',
        //   text: 'Logout',
        //   to: '/logout',
        // },
      ],
    }
  },
  async mounted() {},
  methods: {},
  computed: {
    ...mapGetters('auth', ['user']),
  },
}
</script>
<style lang="scss">
.theme--light.v-list-item--active:hover::before,
.theme--light.v-list-item--active::before {
  opacity: 0;
}
</style>
<style lang="scss" scoped>
.sidebar {
  background: transparent !important;
  .v-list-item:not(:first-child) {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}

.sidebar-active {
  // background: white !important;
  background: transparent !important;
  background-color: white !important;
  // color: white !important;
  border: 1px solid #14adac99;
  border-radius: 5px;
}
</style>
./UserSideBar.vue
