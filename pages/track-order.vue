<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col md="8">
        <div class="text-center mt-16">
          <h1>Order Tracking</h1>
          <p>
            To track your order please enter your Order ID in the box below and
            press the "Track" button. This was given to youon your receipt and
            in the confirmation email you should have received.
          </p>
        </div>
        <v-form lazy-validation ref="track" v-model="valid">
          <p class="font-weight-bold mt-8">Order Number</p>
          <v-text-field
            outlined
            label="Enter Order Number here"
            v-model="form.order_number"
            :rules="[(v) => !!v || 'Kindly enter your order number']"
          ></v-text-field>
          <v-btn
            class="primary"
            block
            text
            :loading="loading"
            x-large
            @click="$refs.track.validate() ? trackOrder() : null"
            >Track Your Order</v-btn
          >
        </v-form>

        <v-simple-table v-if="is_track">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>DELIVERY ADDRESS</th>
              <!-- <th>ORDER NUMBER</th> -->
              <th>TOTAL</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td class="py-5">
                ORDER NUMBER: {{ trackDetails.order_number }}<br /><br />
                <div
                  class="d-flex mb-2 align-center"
                  v-for="j in trackDetails.product"
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

              <td>{{ trackDetails.address }}, {{ trackDetails.city }}, {{ trackDetails.state }}</td>

              <td>&#8358;{{ trackDetails.total | formatPrice }}</td>
              <td>
                <span
                  :class="
                    trackDetails.status == 'pending'
                      ? 'warning--text'
                      : trackDetails.status == 'cancelled'
                      ? 'error--text'
                      : trackDetails.status == 'processing'
                      ? 'primary--text'
                      : 'success--text'
                  "
                  >{{ trackDetails.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      form: {},
      trackDetails: [],
      is_track: false
    }
  },
  methods: {
    async trackOrder() {
      this.loading = true
      await this.$store
        .dispatch('products/trackorder', this.form)
        .then((response) => {
          this.trackDetails = response.data
          this.$toast.success(response.message)
          this.loading = false
          this.is_track = true
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
  },
}
</script>
