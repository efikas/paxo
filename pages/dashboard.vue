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
        <h2>Account Information</h2>
        <v-divider></v-divider>
        <!-- {{ user }} -->
        <v-form class="mt-12" lazy-validation v-model="valid" ref="form">
        <v-row>
          <v-col>
            <p>Wallet Balance</p>
            <v-chip style="border-radius: 0;" dark color="primary" large>&#8358;{{user.balance | formatPrice}}</v-chip>
          </v-col>
           <v-col>
            <p>Bonus Points</p>
            <v-chip style="border-radius: 0;" dark color="primary" large>{{user.points }} Points</v-chip>
          </v-col>
        </v-row>
        <v-divider class="my-8"></v-divider>
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="user.first_name"
                outlined
                label="First Name"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="user.last_name"
                outlined
                label="Last Name"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="user.mobile"
                outlined
                label="Phone Number"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="user.email"
                outlined
                label="Email"
                disabled
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            label="Date of Birth"
            v-model="user.dob" type="date"
            required
            :rules="[(v) => !!v || 'This field is required']"
            outlined
          >
          </v-text-field>
          <v-text-field
            placeholder="Address"
            v-model="user.address"
            required
            :rules="[(v) => !!v || 'This field is required']"
            outlined
          ></v-text-field>
          <v-text-field
            placeholder="Apartment, Suite, etc (optional)"
            v-model="user.apartment"
            outlined
          ></v-text-field>
          <v-row>
            <v-col>
              <p class="mb-0">City</p>
              <v-text-field
                placeholder="City"
                v-model="user.city"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-text-field>
              <p class="mb-0">State</p>
              <v-select
                placeholder="State"
                item-text="name"
                item-value="id"
                @change="getlga(user.state), (user.lga = '')"
                :items="states"
                v-model="user.state"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-select>
            </v-col>

            <v-col>
              <p class="mb-0">Post Code</p>
              <v-text-field
                placeholder="Postal Code"
                v-model="user.post_code"
                outlined
              >
              </v-text-field>

              <p class="mb-0" v-if="lgas.length > 0">Local Government</p>
              <v-select
                placeholder="LGA"
                item-text="name"
                v-if="lgas.length > 0"
                item-value="id"
                :items="lgas"
                v-model="user.lga"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
          <v-btn
            class="primary"
            large
            text
            block
            :loading="loading"
            @click="$refs.form.validate() ? updateProfile() : null"
            >Update Profile</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
middleware: 'authenticated',
  data() {
    return {
      states: [],
      lgas: [],
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
      loading: false,
    }
  },
  mounted() {
    this.getStates()
  },
  methods: {
    async updateProfile() {},
    async getStates() {
      await this.$store.dispatch('states/states').then((response) => {
        this.states = response.data
      })
    },
    getlga(name) {
      let obj = this.states.filter((item) => item.id === name)
      this.lgas = obj[0].lga
    },
    async updateProfile() {
      this.loading = true
      await this.$store
        .dispatch('auth/updateprofile', this.user)
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
