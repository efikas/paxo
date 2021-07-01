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
        <h2>Change Password</h2>
        <v-divider></v-divider>
        <v-form class="mt-12" lazy-validation v-model="valid" ref="form">
          <v-row>
            <v-col md="8">
              <v-text-field
                label="Current Password"
                outlined type="password"
                v-model="form.current_password"
                required
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>

              <v-text-field
                label="New Password"
                outlined type="password"
                v-model="form.password"
                required
                :rules="passwordRules"
              >
              </v-text-field>

              <v-text-field
                label="Confirm New Password"
                outlined type="password"
                v-model="form.password_confirmation"
                required
                :rules="passwordConfirmRules"
              >
              </v-text-field>
              <v-btn class="primary" :loading="loading" @click="$refs.form.validate() ? changePassword() : null" large text block>Change Password</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      form: {
        password: '',

      },
      loading: false,
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) => v.length >= 8 || 'Password must be at least eight characters',
      ],
      passwordConfirmRules: [
        (v) => !!v || 'Password Confirmation is required',
        (v) => v == this.form.password || 'The two passwords must match',
      ],
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
  methods: {
    async changePassword () {
      this.loading = true
      await this.$store.dispatch('auth/changepassword', this.form).then(response => {
        this.$toast.success(response.message)
        this.loading = false
      }).catch(error => {
        this.$toast.error(error.response.data.message)
        this.loading = false
      })

    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
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
