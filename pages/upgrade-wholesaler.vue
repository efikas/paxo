<template>
  <v-container pt-16>
    <v-row>
      <v-col md="4">
        <div style="display: flex">
          <v-avatar size="60">
            <img src="../static/assets/avatar.jpg" alt="" />
          </v-avatar>
          <div class="ml-6">
            <p class="mb-0 pb-0">Hello</p>
            <h4>{{ user.first_name }} {{ user.last_name }}</h4>
          </div>
        </div>
        <v-list class="mt-7 sidebar py-0" outlined>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item :to="item.to" v-for="(item, i) in menus" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col md="8">
        <h2>Become an Wholesaler</h2>
        <v-divider></v-divider>
        <h4 class="primary--text mt-8">Wholesale Plan</h4>
        <p>
          As a wholesaler, the minimum purchase is &#8358;50,000 with a 30 days
          grace to buy at any price, after 30 days you have to re-activate again
          with &#8358;50,000 to have access to another 30 days to shop at any
          price.
        </p>
        <p>
          <b> Example </b>
        </p>
        <p>
          Mrs Johnson's initial order must be =>&#8358;50,000 but has the
          ability to buy &#8358;5,000 within the month to replace an item but
          once a new month begins she has to buy => &#8358;50,000.
        </p>
        <h4 class="primary--text">Wholesale Reward System</h4>
        <p>
          There is a reward system for our wholesalers at the end of every year,
          wholesalers are categorized into Gold, Silver, and Bronze
        </p>
        <v-simple-table style="border: 1px solid #ddd" class="mb-4">
          <thead>
            <tr>
              <th>Bronze</th>
              <th>Silver</th>
              <th>Gold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>600k - 1.1m Annually</td>
              <td>1.2m - 5.9m Annually</td>
              <td>6m and above Annually</td>
            </tr>
          </tbody>
        </v-simple-table>
        <!-- <p>
      on Wholesalers dashboard, we show what level they are at present, based on
      what they have bought so far in the year and the next level they are
      headed,a link at the top of the dashboard to show a breakdown of the
      reward system as the table above
    </p> -->
        <p>
          For the <b>bronze</b> category if a customer is able to buy 50k
          monthly it would meet up with 600k at the end of the year.
        </p>
        <p>
          For the <b>Sliver</b> category, if the customer buys 100k monthly he
          should get to the target.
        </p>
        <p>
          For the <b>Gold</b> category, if the wholesaler buys 500k monthly
          he/she should get to the target.
        </p>
        <p class="mt-8" v-if="user.role != 'wholesaler'">
          Ready to become a wholesaler? Click the button below.
        </p>

        <v-btn
          class="primary"
          v-if="user.role != 'wholesaler'"
          large
          text
          :loading="loading"
          @click="becomeWholesaler()"
          >Become a Wholesaler</v-btn
        >

        <!-- {{user.role}} -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      selectedItem: '',
      menus: [
        {
          icon: 'ri-user-line',
          text: 'Account Information',
          to: '/dashboard',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'My Pending Orders',
          to: '/my-pending-orders',
        },
        {
          icon: 'ri-shopping-cart-line',
          text: 'My Orders / Transactions',
          to: '/my-orders',
        },
        {
          icon: 'ri-heart-line',
          text: 'My Wishlist',
          to: '/my-wishlist',
        },
        {
          icon: 'ri-honour-line',
          text: 'Become an Affiliate',
          to: '/become-affiliate',
        },
        {
          icon: 'ri-briefcase-line',
          text: 'Upgrade to Wholesaler',
          to: '/upgrade-wholesaler',
        },
        {
          icon: 'ri-lock-line',
          text: 'Change Password',
          to: '/change-password',
        },
        {
          icon: 'ri-logout-circle-line',
          text: 'Logout',
          to: '/logout',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    async becomeWholesaler() {
      this.loading = true
      await this.$store
        .dispatch('auth/becomewholesaler')
        .then((response) => {
          this.$toast.success(response.message)
          this.getProfile()
          this.loading = false
        })
        .catch((error) => {
          // console.log(error)
          this.$toast.error(error.response.data.message)
          this.loading = false
          this.resendEmail()
        })
    },
    async getProfile() {
      await this.$store.dispatch('auth/profile').then((response) => {})
    },
    async resendEmail() {
      await this.$store.dispatch('auth/resendemail').then((response) => {
        // this.$toast.success(response.message)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  background: transparent !important;
  .v-list-item:not(:first-child) {
    border-top: 1px solid #ddd;
  }
}
</style>
