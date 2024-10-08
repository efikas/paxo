<template>
  <div>
    <v-list class="mt-7 py-0">
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item :to="item.to" v-for="(item, i) in menus" :key="i" active-class="sidebar-active" outlinedk>
          <v-list-item-icon>
            <template>
              <component :is="item.icon"></component>
            </template>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
            <v-list-item-title><span class="text-caption">{{
              item.subtitle
                }}</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-hover v-slot="{ hover }">
    <v-btn :outlined="!hover" block :color="(hover) ? 'error' :'primary'" class="br-all-5 primary-text mt-5" to="/logout">
      <v-icon small>mdi-logout</v-icon>
      &nbsp;&nbsp;Logout</v-btn>
    </v-hover>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AccountInfoIcon from './icons/account_info.vue'
import PendingOrdersIcon from './icons/pending_order.vue'
import OrdersIcon from './icons/orders.vue'
import WishlistIcon from './icons/wishlist.vue'
import AffilateIcon from './icons/affiliate.vue'
import WholesalerIcon from './icons/wholesaler.vue'
export default {
  middleware: 'authenticated',
  components: { AccountInfoIcon, WholesalerIcon, AffilateIcon, WishlistIcon, OrdersIcon, PendingOrdersIcon },
  data() {
    return {
      menus: [
        {
          icon: AccountInfoIcon,
          text: 'Account Information',
          subtitle: 'Payments, contact info, addresses',
          to: '/dashboard',
        },
        {
          icon: PendingOrdersIcon,
          text: 'Pending Orders',
          subtitle: 'View pending orders',
          to: '/my-pending-orders',
        },
        {
          icon: OrdersIcon,
          text: 'Orders',
          subtitle: 'View & track your online and pickup orders',
          to: '/my-orders',
        },
        {
          icon: WishlistIcon,
          text: 'Wishlist',
          subtitle: 'View items you liked and add them to cart',
          to: '/my-wishlist',
        },
        {
          icon: AffilateIcon,
          text: 'Become an Affiliate',
          subtitle: 'Earn on referral purchases',
          to: '/become-affiliate',
        },
        {
          icon: WholesalerIcon,
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
  async mounted() { },
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
