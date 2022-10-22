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
        <h2>My Orders</h2>
        <v-divider></v-divider>
        <v-simple-table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>DELIVERY ADDRESS</th>
              <!-- <th>ORDER NUMBER</th> -->
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, index) in orders" :key="index">
              <td class="py-5">
                ORDER NUMBER: {{ i.order_number }}<br /><br />
                <div
                  class="d-flex mb-2 align-center"
                  v-for="j in i.product"
                  :key="j.id"
                >
                  <img :src="j.avatar" height="60px" alt="" />
                  <div>
                    <nuxt-link :to="'/single-product?product_id=' + j.id">
                      <p class="ml-8 mb-0 pb-0">{{ j.name }}</p>
                    </nuxt-link>
                    <span class="ml-8">
                      &#8358;{{ j.price | formatPrice }} x {{ j.quantity }}
                    </span>
                  </div>
                </div>
              </td>

              <td>{{ i.address }}, {{ i.city }}, {{ i.state }}</td>
              <!-- <td>{{i.order_number}}</td> -->
              <td>&#8358;{{ i.total | formatPrice }}</td>
              <td>
                <span
                  :class="
                    i.status == 'pending'
                      ? 'warning--text'
                      : i.status == 'cancelled'
                      ? 'error--text'
                      : i.status == 'processing'
                      ? 'primary--text'
                      : 'success--text'
                  "
                  >{{ i.status }}</span
                >
              </td>

              <td class="text-">
                <v-icon @click="deleteWishlist(i.id)"
                  >ri-delete-bin-line</v-icon
                >
              </td>
            </tr>
            <tr v-if="orders.length == 0">
              <td colspan="5" class="text-center pa-10">
                <p>No recent orders found!</p>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
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
      orders: [],
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
  mounted() {
    this.getUserOrders()
  },
  methods: {
    async getUserOrders() {
      await this.$store
        .dispatch('order/userorders')
        .then((response) => {
          if (response.data) {
            this.orders = response.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async deleteWishlist(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to cancel this order?') &&
        (await this.$store
          .dispatch('order/cancelorder', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getUserOrders()
          }))
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
h1 {
  font-size: 48px;
  font-weight: 600;
}
thead {
  background-color: #f1f1f1;
  th {
    font-size: 14px !important;
    color: #000 !important;
    font-weight: 600;
  }
}
td {
  font-size: 16px !important;
  color: #8193a5;
}

.qty-box {
  border: 0.5px solid #666;
  display: flex;
  justify-content: space-between;
  width: 120px;
  p {
    color: #000 !important;
  }
}

a {
  color: #0066cc !important;
  text-decoration: none;
}
.shopping-total {
  margin-bottom: 30px;
  padding: 30px 35px;
  background-color: #f1f1f1;
  border: 1px solid #bfbfbf;
  p {
    font-size: 14px !important;
    color: #000000de !important;
  }

  .header {
    font-size: 16px !important;
    color: #666 !important;
    display: flex;
    justify-content: space-between;
  }
}
</style>
