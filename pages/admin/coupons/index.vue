<template>
  <v-container fluid>
    <h2>Coupons</h2>
    <v-card class="pa-6 mt-4">
      <v-row>
        <v-col md="3">
          <v-text-field
            outlined
            dense
            placeholder="Search"
            prepend-inner-icon="search"
            v-model="search"
          >
          </v-text-field>
        </v-col>
        <v-col md="3" offset-md="6">
          <v-btn
            class="primary"
            @click="
              ;(dialog = true),
                (update = false),
                $refs.addnew ? $refs.addnew.reset() : null
            "
            block
            text
          >
            <v-icon>add</v-icon> Add New Coupon
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :items="coupons" :headers="headers" :loading="loading" :search="search">
        <template v-slot:item.sn="{ item }">
          {{ coupons.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
        <template v-slot:item.expiring_date="{ item }">
          {{ item.expiring_date | formatDate }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deletecoupon(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} Coupon</h2>
        <!-- <v-alert type="error">{{}}</v-alert> -->
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Coupon Name"
            required
            v-model="form.name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>

          <v-text-field
            dense
            outlined
            label="Coupon Code"
            required
            v-model="form.code"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>

          <v-text-field
            dense
            outlined
            label="Coupon Percentage"
            required
            v-model="form.percentage"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>

          <v-text-field
            dense
            outlined
            label="Number of Users (Optional)"

            v-model="form.number_of_user"

          >
          </v-text-field>
          <v-text-field
            dense
            outlined
            label="Expiry Date" type="date"
            required
            v-model="form.expiry_at"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-checkbox label="Allow multiple usage?" v-model="form.multiple_usage" ></v-checkbox>
          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="$refs.addnew.validate() ? (update ? updatecoupon() : addcoupon()) : null"
            >{{ update ? 'Update' : 'Add coupon' }}</v-btn
          >
        </v-form>
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
      dialog: false,
      valid: true,
      loading: false,
      update: false,
      search: '',
      form: {},

      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'Coupon Name', value: 'name' },
        { text: 'Code', value: 'code' },
        { text: 'No of Users', value: 'number_of_user' },
        { text: 'Coupon Usage', value: 'coupon_usage' },
        { text: 'Percentage', value: 'percentage' },
        { text: 'Expiry Date', value: 'expiring_date' },
        { text: 'Creation Date', value: 'created_at' },
        { text: 'Actions', value: 'action' },
      ],
      coupons: [],
    }
  },
  mounted() {
    this.getcoupons()

  },
  methods: {
    async deletecoupon(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this coupon?') &&
        (await this.$store
          .dispatch('coupon/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getcoupons()
          }))
    },
    async getcoupons() {
      this.loading = true
      await this.$store.dispatch('coupon/all').then((response) => {
        this.coupons = response.data
        this.loading = false
      })
    },

    async addcoupon() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('coupon/addnew', this.form)
          .then((response) => {
            this.$toast.success(response.message)

            this.getcoupons()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            // this.$toast.error(error.response.data.message)
            this.$toast.error(error.response.data.errors.name[0])
            this.loading = false
          })
      }
    },

    async updatecoupon() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('coupon/update', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getcoupons()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },
  },
}
</script>
