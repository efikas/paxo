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
        <h2>Become an Affiliate</h2>
        <v-divider></v-divider>
        <p class="mt-8">
          Being an Affiliate on PAXO means you can earn whenever people you
          refer make purchases on the Paxo platform.
        </p>
        <p>
          However, there are conditions to be met in order to start enjoying
          this benefit.
        </p>
        <h3 class="mt-6 primary--text">
          Referral/Affiliate Logic for points (Web App)
        </h3>

        <p>
          For every time you refer someone, you get the 4% off there initial and
          ONLY initial order.
        </p>

        <!-- <h3 class="primary--text">Purchase/Reward logic for points (Web App)</h3>
    <p>Same as above but with 5% instead of 4%</p>

    <h3 class="primary--text">Referral/Affiliate Logic for points (Mobile App)</h3>
    <p>Same as above but with 5% instead of 4%</p> -->

        <div v-if="user.isAffiliate">
          <p>Your Referral Link:</p>
          <!-- <p>{{domain + '/register?ref='+user.referer_id}}</p>
 -->
          <v-text-field
            outlined
            :value="domain + '/register?ref=' + user.referer_id"
          >
            <template #append>
              <v-btn
                color="primary"
                @click="copyLink()"
                type="submit"
                value="Subscribe" style="margin-top: -8px;"
              >
                Copy
              </v-btn>
            </template>
          </v-text-field>
        </div>
        <div v-else>
          <p class="mt-8">
            Ready to become an affiliate? Click the button below.
          </p>

          <v-btn
            class="primary"
            large
            text
            :loading="loading"
            @click="becomeAffiliate()"
            >Become an Affiliate</v-btn
          >
        </div>
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
      domain: window.location.host,
      menus: [
        {
          icon: 'ri-user-line',
          text: 'Account Information',
          to: '/dashboard',
        },
        {
          icon: 'ri-lock-line',
          text: 'Change Password',
          to: '/change-password',
        },
        {
          icon: 'ri-briefcase-line',
          text: 'Upgrade to Wholesaler',
          to: '/upgrade-wholesaler',
        },
        {
          icon: 'ri-honour-line',
          text: 'Become an Affiliate',
          to: '/become-affiliate',
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
    copyLink() {
      this.$clipboard(this.domain + '/register?ref=' + this.user.referer_id)
      this.$toast.success('Referral Link Copied', 'Success')
    },
    async becomeAffiliate() {
      this.loading = true
      await this.$store
        .dispatch('auth/becomeaffiliate')
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
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
