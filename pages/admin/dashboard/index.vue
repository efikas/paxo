<template>
  <v-container fluid>
    <v-row>
      <v-col md="3" sm="6" cols="6">
        <v-card class="dash-card pa-4">
          <v-icon style="float: right">ri-shopping-cart-line</v-icon>
          <h4 class="primary--text">Total Products</h4>
          <h1 class="secondary--text">{{ dashboard.products }}</h1>
        </v-card>
      </v-col>
      <v-col md="3" sm="6" cols="6">
        <v-card class="dash-card pa-4">
          <v-icon style="float: right">ri-shopping-cart-line</v-icon>
          <h4 class="primary--text">Total Orders</h4>
          <h1 class="secondary--text">{{ dashboard.orders }}</h1>
        </v-card>
      </v-col>
      <v-col md="3" sm="6" cols="6">
        <v-card class="dash-card pa-4">
          <v-icon style="float: right">ri-user-line</v-icon>
          <h4 class="primary--text">Total Users</h4>
          <h1 class="secondary--text">{{ dashboard.users }}</h1>
        </v-card>
      </v-col>
      <v-col md="3" sm="6" cols="6">
        <v-card class="dash-card pa-4">
          <v-icon style="float: right">ri-user-line</v-icon>
          <h4 class="primary--text">Total Affiliates</h4>
          <h1 class="secondary--text">{{ dashboard.affiliate }}</h1>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" lg="6">
        <dashboard-chart></dashboard-chart>
      </v-col>
      <v-col md="6" cols="12" lg="6">
        <dashboard-chart></dashboard-chart>
      </v-col>
    </v-row>

    <h3 class="mt-10">Recent Orders</h3>
    <v-data-table :loading="loading" :items="orders" :headers="headers">
      <template v-slot:item.sn="{ item }">
        {{ orders.indexOf(item) + 1 }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at | formatDate }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          :color="
            item.status == 'pending'
              ? 'error'
              : item.status == 'processing'
              ? 'warning'
              : 'success'
          "
        >
          {{ item.status }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-menu
          bottom
          left
          offset-y
          origin="top right"
          transition="scale-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on" icon
              ><v-icon>more_horiz</v-icon></v-btn
            >
          </template>

          <v-list dense width="250px" class="py-0">
            <v-list-item
                dense
                @click=";(order_products = item), (dialog = true)"
                class="py-0 my-0"
              >
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>View Order Details </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            <v-list-item
              dense
              @click="updateOrder('confirmed', item.id)"
              class="py-0 my-0"
            >
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Confirm Order </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              dense
              @click="updateOrder('refunded', item.id)"
              class="py-0 my-0"
            >
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Refund Order </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              dense
              @click="updateOrder('shipping', item.id)"
              class="py-0 my-0"
            >
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Ship Order </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              dense
              @click="updateOrder('on-hold', item.id)"
              class="py-0 my-0"
            >
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Put on Hold </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              dense
              @click="updateOrder('completed', item.id)"
              class="py-0 my-0"
            >
              <v-list-item-content class="py-0 my-0">
                <v-list-item-title>Order Completed </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="700">
      <v-card class="pa-6">
        <h3>Order Details</h3>
        <v-simple-table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in order_products.product" :key="i.id">
              <td>
                <div class="d-flex align-center">
                  <img :src="i.avatar" class="mr-3" width="60" height="60" />
                  {{ i.name }}
                </div>
              </td>
              <td>&#8358;{{ i.price | formatPrice }}</td>
            </tr>
            <tr>
              <td class="text-right font-weight-bold">TOTAL:</td>
              <td class="font-weight-bold">
                &#8358;{{ order_products.total | formatPrice }}
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      dashboard: [],
      dialog: false,
      order_products: [],
      orders: [],
      loading: false,
      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'Delivery Address', value: 'address' },
        { text: 'City', value: 'city' },
        { text: 'Order Number', value: 'order_number' },
        { text: 'Order Price', value: 'total' },
        { text: 'Status', value: 'status' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  methods: {
    async getDashboard() {
      await this.$store.dispatch('auth/dashboard').then((response) => {
        this.dashboard = response.data
      })
    },
    async getOrders() {
      this.loading = true
      await this.$store.dispatch('auth/orders').then((response) => {
        this.orders = response.data.data
        this.loading = false
      })
    },
    async updateOrder(status, id) {
      const data = {
        status,
        id,
      }
      await this.$store
        .dispatch('order/updateorders', data)
        .then((response) => {
          this.$toast.success(response.message)
          this.getOrders()
        })
    },
  },
  mounted() {
    this.getDashboard()
    this.getOrders()
  },
}
</script>
<style lang="scss" scoped>
.dash-card {
  // border-radius: 7px;
}
</style>
