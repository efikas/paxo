<template>
  <v-container pt-16>
    <v-row
      :class="{
        'p5p': $vuetify.breakpoint.mdAndUp,
        'px-4': $vuetify.breakpoint.smAndDown,
      }"
    >
      <v-col md="4">
        <UserSideBar />
      </v-col>
      <v-col md="8">
        <h3 class="font-weight-bold">Orders</h3>
        <v-divider color="#14ADAC99"></v-divider>
        <div
          class="mt-5"
          id="shopTable"
        >
          <v-row class="body-2">
            <v-col md="6">Product</v-col>
            <v-col md="2">Delivery Address</v-col>
            <v-col md="2">Total</v-col>
            <v-col md="2">Status</v-col>
          </v-row>
          <!-- <v-divider></v-divider> -->

          <v-row v-if="orders.length == 0">
            <v-col md="12" class="d-flex align-center text-center pa-10">
              <p>Your order is empty!</p>
            </v-col>
          </v-row>

          <div v-for="(i, index) in orders" :key="index" class="d-flex">
            <div style="width: 100%">
              <v-row class="table-row">
                <v-col md="6" class="py-3">
                  <div
                    class="d-flex align-center"
                    v-if="(i.product ?? []).length > 0"
                  >
                    <img
                      :src="i.product[0].avatar"
                      width="100px"
                      alt=""
                      class="br-all-5"
                    />
                    <div class="ml-8 ">
                    <nuxt-link
                      :to="'/single-product?product_id=' + i.product[0].id"
                    >
                      <p class="body-2" style="color: black">{{ i.product[0].name }}</p>
                    </nuxt-link>

                    <v-btn
                      v-if="isOutOfStock(i.product[0]) == 'outofstock'"
                      outlined
                      small
                      color="error"
                      class="br-all-5 text-caption error-text"
                    >
                    </v-btn>
                    <v-btn
                      v-else
                      outlined
                      small
                      color="primary"
                      class="br-all-5 text-caption primary-text"
                    >
                      <v-icon small> mdi-check-circle-outline</v-icon>
                      &nbsp;&nbsp;In Stock</v-btn
                    >
                  </div>
                  </div>
                </v-col>
                <v-col md="2" class="d-flex align-center body-2">
                  {{ i.address }}, {{ i.city }}, {{ i.state }}
                </v-col>
                <v-col
                  md="2"
                  class="d-flex align-center body-2 font-weight-bold"
                >
                  &#8358;{{ i.total | formatPrice }}
                </v-col>
                <v-col md="2" class="d-flex align-center body-2">
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
                </v-col>
              </v-row>
            </div>
            <div class="ml-3 d-flex align-center body-2">
              <v-icon
                color="error"
                @click="deleteWishlist(i.id)"
                >mdi-delete-outline</v-icon
              >
            </div>
          </div>
        </div>

        <!-- <v-simple-table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>DELIVERY ADDRESS</th>
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
        </v-simple-table> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import UserSideBar from '~/components/UserSideBar.vue'
export default {
  components: { UserSideBar },
  data() {
    return {
      loading: false,
      orders: [],
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  mounted() {
    this.getUserOrders()
  },
  methods: {
    isOutOfStock(item) {
      if (item.stock_status == 'outofstock') {
        return 'outofstock'
      }

      if (item.stock_quantity < item.quantity) {
        return 'outofstock'
      }

      return ''
    },
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

.table-row {
  border: 2px solid #66666633 !important;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
  border-radius: 0.4rem !important;
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
