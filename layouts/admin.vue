<template>
  <v-app>
    <v-app-bar class="white" app>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <h3>Hi {{ user.first_name }}!</h3>
      <v-spacer></v-spacer>
      <v-badge
        :color="widRequests > 0 ? 'error' : 'transparent'"
        :content="widRequests"
        style="margin-right: 30px; padding-right: 0px"
        overlap
      >
        <v-chip color="secondary" class="mx-0">{{
          user.role | capitalize
        }}</v-chip>
      </v-badge>
      <v-avatar>
        <img src="../static/assets/avatar.jpg" alt="" />
      </v-avatar>
      <v-btn icon to="/logout">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app class="primary">
      <nuxt-link to="/admin/dashboard">
        <img src="../static/assets/logo-white.png" width="150px" alt="" />
      </nuxt-link>
      <v-list>
        <v-list-item
          class="pl-6"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-badge
            v-if="item.title == 'Withdrawal Request'"
              :color="widRequests ? 'error' : 'transparent'"
              :content="widRequests"
              overlap
            >
              <v-icon>{{ item.icon }}</v-icon>
            </v-badge>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  data() {
    return {
      items: [
        {
          icon: 'ri-dashboard-line',
          title: 'Dashboard',
          to: '/admin/dashboard',
        },
        {
          icon: 'ri-product-hunt-line',
          title: 'Products',
          to: '/admin/products',
        },
        {
          icon: 'ri-product-hunt-line',
          title: 'Inventory',
          to: '/admin/inventory',
        },
        {
          icon: 'ri-creative-commons-nd-line',
          title: 'Product Categories',
          to: '/admin/categories',
        },
        {
          icon: 'ri-creative-commons-nd-line',
          title: 'Sub Categories',
          to: '/admin/sub-categories',
        },
        {
          icon: 'ri-projector-line',
          title: 'Brands',
          to: '/admin/brands',
        },
        {
          icon: 'ri-projector-line',
          title: 'Top Brands',
          to: '/admin/topbrands',
        },
        {
          icon: 'ri-projector-line',
          title: 'Section',
          to: '/admin/sections',
        },
        {
          icon: 'ri-shopping-cart-line',
          title: 'Orders',
          to: '/admin/orders',
        },
        {
          icon: 'ri-truck-line',
          title: 'Withdrawal Request',
          to: '/admin/wallet',
        },
        {
          icon: 'ri-user-line',
          title: 'Users',
          to: '/admin/users',
        },
        {
          icon: 'ri-user-line',
          title: 'Staff',
          to: '/admin/staff',
        },
        {
          icon: 'ri-flag-line',
          title: 'Banners',
          to: '/admin/banners',
        },
        {
          icon: 'ri-ticket-2-line',
          title: 'Coupon Creation',
          to: '/admin/coupons',
        },
        {
          icon: 'ri-building-line',
          title: 'States',
          to: '/admin/states',
        },
        {
          icon: 'ri-truck-line',
          title: 'Delivery Settings',
          to: '/admin/delivery',
        },

        {
          icon: 'ri-newspaper-line',
          title: 'Commmunity Posts',
          to: '/admin/community',
        },
        {
          icon: 'ri-newspaper-line',
          title: 'Blogs',
          to: '/admin/blog',
        },
        {
          icon: 'ri-newspaper-line',
          title: 'Recommendation',
          to: '/admin/recommendation',
        },
        {
          icon: 'ri-newspaper-line',
          title: 'Edit Reward Content',
          to: '/admin/rewards',
        },
        {
          icon: 'ri-logout-box-line',
          title: 'Logout',
          to: '/logout',
        },
      ],
      drawer: null,
    }
  },

  computed: {
    ...mapGetters('users', ['widRequests']),
    ...mapGetters('auth', ['user']),
    
  },
}
</script>
