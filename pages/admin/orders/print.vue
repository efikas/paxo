<template>
  <v-container>
    <v-row align="center" justify="center" style="margin: auto">
      <v-col md="9">
        <v-card
          class="pa-6"
          width="1000"
          outlined
          v-if="order_products.order_number != undefined"
        >
          <v-card rd class="pa-6" flat outlined>
            <div class="d-flex justify-space-between">
              <div>
                <h2>Order details</h2>
                <h5>Order Number: {{ order_products.order_number }}</h5>
                <p>
                  Payment Channel:
                  {{ order_products.use_wallet ? 'Wallet' : 'Paystack' }}. Paid
                  on
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
                  {{ order_products.user.email }}
                  <h5 class="mt-4">Phone Number</h5>
                  {{ order_products.user.mobile }}
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
                  <h5 class="mt-4" v-if="order_products.coupon">Coupon</h5>
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
                      order_products.user.role == 'wholesaler' ||
                      order_products.user.role == 'next_champ'
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
          </v-card>
        </v-card>
        <div class="text-center mt-12">
                <v-btn @click="goBack()">Close</v-btn>
            </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'print',
  search: '',
  data() {
    return {
      order_products: {},
    }
  },
  mounted() {
    let order = window.localStorage.getItem('print_value')
    if (order != null) {
      this.order_products = JSON.parse(order)
    }

    if (order != null) {
      setTimeout(function () {
        window.print()
      }, 2000)
    }
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
      this.filtered_orders = this.real_orders.filter((item) => {
        let searchTerm = ''
        if (item.user.first_name != null)
          searchTerm += ' ' + item.user.first_name
        if (item.user.first_last != null)
          searchTerm += ' ' + item.user.first_last
        if (item.user.email != null) searchTerm += ' ' + item.user.email
        if (item.channel != null) searchTerm += ' ' + item.channel
        if (item.status != null) searchTerm += ' ' + item.status

        return searchTerm.indexOf(this.search.toString().toLowerCase()) > -1
      })
      this.pageinationLength = Math.ceil(
        this.filtered_orders.length / this.perPage
      )
      this.toPage(1)

      return ''
    },
  },
  methods: {
    aggregateProduct(array, item) {
      return array.reduce(
        (accumulator, current) =>
          accumulator + current[item] * current.quantity,
        0
      )
    },
    goBack(){
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped></style>
