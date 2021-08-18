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
            <h4 class="mb-0">{{ user.first_name }} {{ user.last_name }}</h4>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  class="hidden-md-and-up mt-0"
                  x-small
                  >{{ user.role | capitalize }}</v-chip
                >
              </template>
              <span>Logged in as:</span>
            </v-tooltip>
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
        <div class="d-flex justify-space-between">
          <h2>Account Information</h2>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="hidden-sm-and-down"
                small
                >{{ user.role | capitalize }}</v-chip
              >
            </template>
            <span>Logged in as:</span>
          </v-tooltip>
        </div>
        <v-divider></v-divider>

        <v-form class="mt-12" lazy-validation v-model="valid" ref="form">
          <v-row>
            <v-col>
              <p>Wallet Balance</p>
              <v-chip style="border-radius: 0" dark color="primary" large
                >&#8358;{{ user.balance | formatPrice }}</v-chip
              >
              <v-btn text :disabled="parseInt(user.balance) <= 500 " class="primary" @click="withdrawDialog = true">
                <v-icon class="mr-2">payments</v-icon> Withdraw</v-btn
              >
            </v-col>
            <v-col>
              <p>Bonus Points</p>
              <v-chip style="border-radius: 0" dark color="primary" large
                >{{ user.points }} Points</v-chip
              >
            </v-col>
          </v-row>
          <v-divider class="my-8"></v-divider>
          <v-row>
            <v-col class="py-0" cols="12" md="6">
              <v-text-field
                v-model="user.first_name"
                outlined
                label="First Name"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <v-text-field
                v-model="user.last_name"
                outlined
                label="Last Name"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="py-0" md="6">
              <v-text-field
                v-model="user.mobile"
                outlined
                label="Phone Number"
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
            </v-col>
            <v-col class="py-0" md="6">
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
            v-model="user.dob"
            type="date"
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
            <v-col class="py-0">
              <p class="mb-0">City</p>
              <v-text-field
                placeholder="City"
                v-model="user.city"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-text-field>
              <p class="mb-0 hidden-xs-only">State</p>
              <v-select
                class="hidden-xs-only"
                placeholder="State"
                item-text="name"
                item-value="id"
                @change="getlga(user.state_id), (user.lga = '')"
                :items="states"
                v-model="user.state_id"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-select>
            </v-col>

            <v-col class="py-0">
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
                v-model="user.lga_id"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-select>
            </v-col>
            <v-col cols="12" class="py-0 mt-0">
              <p class="mb-0 hidden-sm-and-up">State</p>
              <v-select
                class="hidden-sm-and-up"
                placeholder="State"
                item-text="name"
                item-value="id"
                @change="getlga(user.state_id), (user.lga = '')"
                :items="states"
                v-model="user.state_id"
                required
                :rules="[(v) => !!v || 'This field is required']"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
          <!-- {{banks}} -->
          <h4 class="mt-6">Bank Account Details</h4>
          <v-divider class="mb-5"></v-divider>
          <v-text-field
            @keyup="resolveAccount()"
            v-model="form.account_number"
            outlined
            label="Account Number"
          >
          </v-text-field>
          <v-autocomplete
            @change="resolveAccount()"
            label="Select Bank"
            outlined
            :items="banks"
            item-text="bankName"
            item-value="bankCode"
            v-model="form.bank_code"
          >
          </v-autocomplete>
          <v-text-field
            v-model="form.account_name"
            label="Account Name"
            outlined
          >
          </v-text-field>

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
    <v-dialog v-model="withdrawDialog" width="500">
      <v-card class="pa-6">
        <h3 class="primary--text">Withdraw Funds</h3>
        <v-divider class="mb-4"></v-divider>
        Account Number: <b>{{user.account_number}}</b><br />
        Bank Name: <b v-if="banks.length > 0 && user.bank_code">{{(banks.filter((item) => item.bankCode === user.bank_code))[0].bankName}}</b><br />
        Account Name: <b>{{user.account_name}}</b>
        <v-divider class="my-4"></v-divider>
        <v-form lazy-validation v-model="valid" ref="withdraw"> </v-form>
        <v-text-field
          label="Enter Amount to Withdraw"
          v-model="withdraw.amount"
          outlined
          type="number"
          required
          :rules="[
            (v) => !!v || 'This field is required',
            // (v) =>  parseInt(user.balance) > parseInt(v) || 'Insufficient funds'
          ]"
        >
        </v-text-field>
        <v-text-field
          v-model="withdraw.password"
          required
          :rules="[(v) => !!v || 'This field is required']"
          type="password"
          outlined
          label="Your Password"
        >
        </v-text-field>
        <v-btn
          class="primary"
          block
          @click="$refs.withdraw.validate() ? withdrawFunds() : null"
          :loading="loading"
          >Withdraw
          <span v-if="withdraw.amount">
            &#8358;{{ withdraw.amount }}</span
          ></v-btn
        >
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  middleware: 'authenticated',
  data() {
    return {
      withdrawDialog: false,
      withdraw: { amount: '' },
      states: [],
      lgas: [],
      banks: [],
      form: { account_number: '', bank_code: '', account_name: '' },
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
      amountRules: [
        (v) => v || 'This field is required',
        // (v) =>  parseInt(this.user.balance) > parseInt(v) || 'Insufficient funds',
      ],
      loading: false,
    }
  },
  mounted() {
    this.getStates()
    this.getBanks()
    this.getProfile()
    this.form = this.user
  },
  methods: {
    async withdrawFunds() {
      this.loading = true
      await this.$store
        .dispatch('auth/withdraw', this.withdraw)
        .then((response) => {
          this.$toast.success(response.message)
          this.getProfile()
          this.loading = this.withdrawDialog = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)

          this.loading = false
        })
    },
    async resolveAccount() {
      if (this.form.account_number.length == 10 && this.form.bank_code) {
        await this.$store
          .dispatch('auth/resolveaccount', this.form)
          .then((response) => {
            this.form.account_name = response.data.accountName
            this.user.account_name = this.form.account_name
            this.user.account_number = this.form.account_number
            this.user.bank_code = this.form.bank_code

            this.loading = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)

            this.loading = false
          })
      }
    },
    async getStates() {
      await this.$store.dispatch('states/states').then((response) => {
        this.states = response.data
      })
    },
    async getProfile() {
      await this.$store.dispatch('auth/profile').then((response) => {
        // this.states = response.data
      })
    },
    // async getBanks() {
    //   await this.$store.dispatch('auth/banks').then((response) => {
    //     if(response.data){
    //       this.banks = response.data

    //     }
    //   })
    // },
    getBanks() {
      const headers = {
        Authorization: 'Bearer uvjqzm5xl6bw',
      }
      axios
        .post(
          'https://sandbox.wallets.africa/transfer/banks/all',
          {},
          { headers }
        )
        .then((response) => {
          this.banks = response.data
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
          this.getProfile()
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
