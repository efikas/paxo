<template>
  <v-container fluid>
    <h2>Orders</h2>
    <v-card class="pa-6 mt-6">
      <v-row>
        <v-col md="3">
          <v-text-field
            v-model="search"
            outlined
            dense
            placeholder="Search"
            prepend-inner-icon="search"
          ></v-text-field> <span>{{ computeOrder }}</span>
        </v-col>
      </v-row>
      <v-data-table
        :loading="loading"
        :items="orders"
        :headers="headers"
        :items-per-page="perPage"
        hide-default-footer
      >
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDateTime }}
        </template>
        <template v-slot:item.user="{ item }">
          <p v-if="item.user">{{ item.user.first_name }} {{ item.user.last_name }}</p>
        </template>
        <template v-slot:item.total="{ item }">
          &#8358;{{ item.total | formatPrice }}
        </template>
        <template v-slot:item.sn="{ item }">
          {{ (page - 1) * perPage + orders.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            small
            :color="
              item.status == 'pending'
                ? 'info'
                : item.status == 'processing'
                ? 'warning'
                : item.status == 'cancelled'
                ? 'error'
                : item.status == 'on-hold'
                ? 'secondary'
                : item.status == 'shipping'
                ? 'accent'
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
      <v-pagination
      class="mt-16"
        :length="pageinationLength"
        :total-visible="7"
        v-model="page"
        @input="toPage"
        @next="next"
        @previous="previous"
      ></v-pagination>
    </v-card>

    <v-dialog fullscreen v-if="order_products" v-model="dialog">
      <v-card>
        <v-container>
          <v-row align="center" justify="center" style="margin:auto;">
            <v-col md="9">
              <v-card class="pa-6" width="1000" outlined>
                <v-card rd class="pa-6" flat outlined>
                  <div class="d-flex justify-space-between">
                    <div>
                      <h2>Order details</h2>
                      <h5>Order Number: {{ order_products.order_number }}</h5>
                      <p>
                        Payment Channel:
                        {{ order_products.use_wallet ? 'Wallet' : 'Paystack' }}.
                        Paid on
                        {{ order_products.created_at | formatDate }}
                      </p>
                      <p v-if="order_products.description != ''">
                        Optional Note: {{ order_products.description }}
                      </p>
                    </div>
                    <div>
                      <img src="~/static/assets/Paxo Logo Green.png" alt="" />
                    </div>
                  </div>

                  <h3 v-if="order_products.user">
                    Customer: {{ order_products.user.first_name | capitalize }}
                    {{ order_products.user.last_name | capitalize }}
                  </h3>
                  <p v-if="order_products.user">
                    Wallet Balance:
                    {{ order_products.user.balance | formatPrice }}
                  </p>
                </v-card>
                <v-card class="pa-6 mt-8" flat outlined>
                  <v-row>
                    <v-col md="2">
                      <div>
                        <h5>General</h5>
                        <p>
                          Date Created:
                          {{ order_products.created_at | formatDate }}
                        </p>
                        <p>
                          Status:
                          <v-chip
                            small
                            :color="
                              order_products.status == 'pending'
                                ? 'error'
                                : order_products.status == 'processing'
                                ? 'warning'
                                : 'success'
                            "
                          >
                            {{ order_products.status }}
                          </v-chip>
                        </p>
                      </div>
                    </v-col>
                    <v-col md="3">
                      <div>
                        <h5>Billing</h5>
                        {{ order_products.address }} {{ order_products.city }}

                        <h5 class="mt-4">Email address</h5>
                        {{ order_products.email }}
                        <h5 class="mt-4">Phone Number</h5>
                        {{ order_products.phone }}
                      </div>
                    </v-col>
                    <v-col md="3">
                      <div>
                        <h5>Shipping</h5>
                        <h5>Method:</h5>
                        {{
                          order_products.delivery_method == '0'
                            ? 'Local Pick (3 Billings way, Oregun, Ikeja Lagos'
                            : order_products.city +
                              ', ' +
                              (order_products.state ? order_products.state : '')
                        }}
                        <!-- {{ order_products.city }}, {{ order_products.state }} -->
                        <h5 class="mt-4" v-if="order_products.coupon">
                          Coupon
                        </h5>
                        {{ order_products.coupon }}
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card class="pa-6 mt-8" flat outlined>
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="i in order_products.product" :key="i.id">
                        <td>
                          <div class="d-flex align-center">
                            <img
                              :src="i.avatar"
                              class="mr-3"
                              width="60"
                              height="60"
                            />
                            {{ i.name }}
                          </div>
                        </td>
                        <td>{{ i.quantity }}</td>
                        <td>
                          &#8358;{{
                            order_products.user.role == 'wholesaler' ||
                            order_products.user.role == 'wholesaler'
                              ? i.wholesale_price
                              : i.price | formatPrice
                          }}
                        </td>
                        <td>
                          &#8358;{{
                            order_products.user.role == 'wholesaler' || order_products.user.role == 'next_champ'
                              ? i.quantity * i.wholesale_price
                              : (i.quantity * i.price) | formatPrice
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" class="text-right font-weight-">
                          Delivery Fee:
                        </td>
                        <td v-if="order_products.shipping" class="font-weight-">
                          &#8358;{{
                            order_products.shipping.delivery_fee | formatPrice
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" class="text-right font-weight-bold">
                          TOTAL:
                        </td>
                        <td class="font-weight-bold">
                          &#8358;{{ order_products.total | formatPrice }}
                          <!-- &#8358;{{ totalPrice | formatPrice }} -->
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>

                  <!-- {{order_products}} -->
                  <div class="text-right mt-12">
                    <v-btn @click="dialog = false">Close</v-btn>
                    <v-btn class="primary" @click="printPage(order_products)">Print</v-btn>
                  </div>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  search: '',
  data() {
    return {
      page: 1,
      pageinationLength: 1,
      perPage: 50,
      dialog: false,
      orders: [],
      order_products: null,
      filtered_orders: [],
      real_orders: [],
      loading: false,
      page: 1,
      length: 1,
      search: '',
      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'Customer', value: 'user' },
        { text: 'Email', value: 'email' },
        { text: 'Address', value: 'address' },
        { text: 'City', value: 'city' },
        { text: 'Order Number', value: 'order_number' },
        { text: 'Order Price', value: 'total' },
        { text: 'Coupon', value: 'coupon' },
        { text: 'Method', value: 'channel' },
        { text: 'Status', value: 'status' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.getOrders()
  },
  computed: {
    totalPrice() {
      if (this.order_products) {
        if (
          this.order_products.user.role == 'wholesaler' ||
          this.order_products.user.role == 'next_champ'
        ) {
          const productTotal = this.aggregateProduct(
            this.order_products.product,
            'wholesale_price'
          )
          if (this.order_products.shipping) {
            return productTotal + this.order_products.shipping.delivery_fee
          } else {
            return productTotal
          }
        } else {
          const productTotal = this.aggregateProduct(
            this.order_products.product,
            'price'
          )
          if (this.order_products.shipping) {
            return productTotal + this.order_products.shipping.delivery_fee
          } else {
            return productTotal
          }
        }
      }

      return ''
    },
    computeOrder() {
      this.filtered_orders = this.real_orders.filter(item => {
        let searchTerm = "";
        if(item.user != null && item.user.first_name != null ) searchTerm += " " + item.user.first_name
        if(item.user != null && item.user.first_last != null ) searchTerm += " " + item.user.first_last
        if(item.user != null && item.user.email != null ) searchTerm += " " + item.user.email
        if(item.channel != null ) searchTerm += " " + item.channel
        if(item.status != null ) searchTerm += " " + item.status

         return searchTerm.indexOf(this.search.toString().toLowerCase()) > -1
      })
      this.pageinationLength = Math.ceil(this.filtered_orders.length / this.perPage)
      this.toPage(1)

      return ""
    },
  },
  methods: {
    async printPage(value) {
      // Pass the element id here
      
      if(value == undefined || Array.isArray(value)){
        return;
      }
      window.localStorage.setItem("print_value", JSON.stringify(value))
      this.$router.push('/admin/orders/print')
    },
    aggregateProduct(array, item) {
      return array.reduce(
        (accumulator, current) =>
          accumulator + current[item] * current.quantity,
        0
      )
    },
    toPage(page){
      this.page = page
      let start = (this.perPage * (page - 1))
      let end = (this.perPage * page)
      this.orders = this.filtered_orders.slice(start, end);
      window.scrollTo(0, 0);
    },
    next(){
      this.toPage(this.page)
    },
    previous(){
      this.toPage(this.page)
    },
    async getOrders() {
      this.loading = true
      const data = {
        page: this.page,
      }
      await this.$store.dispatch('auth/orders', data).then((response) => {
        // console.log(response)
        this.real_orders = response.data
        this.filtered_orders = this.real_orders
        // this.length = response.data.last_page
        this.pageinationLength = Math.ceil(this.filtered_orders.length / this.perPage)
        this.toPage(1)
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
}
</script>

<style lang="scss" scoped>
  
</style>
