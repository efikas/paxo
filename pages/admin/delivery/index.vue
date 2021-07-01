<template>
  <v-container fluid>
    <h2>Delivery Fees</h2>
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
            <v-icon>add</v-icon> Add New delivery
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="deliveries"
        :headers="headers"
        :loading="loading"
        :search="search"
      >
        <template v-slot:item.sn="{ item }">
          {{ deliveries.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.weight_from="{ item }">
          {{ item.weight_from }} kg
        </template>
        <template v-slot:item.weight_to="{ item }">
          {{ item.weight_to }} kg
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
         <template v-slot:item.delivery_fee="{ item }">
          &#8358;{{ item.delivery_fee | formatPrice }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteDelivery(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} delivery</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-select
            dense
            outlined
            label="State" :items="states"
            required
            v-model="form.state_id" @change="getlga(form.state_id)"
            item-value="id"
            item-text="name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-select>
          <v-select
            dense
            outlined
            label="LGA" :items="lgas"
            required
            v-model="form.lga_id"
            item-value="id"
            item-text="name"

          >
          </v-select>
          <v-text-field
            dense
            outlined
            label="Weight From"
            required
            v-model="form.weight_from"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-text-field
            dense
            outlined
            label="Weight To"
            required
            v-model="form.weight_to"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
         <v-text-field
            dense
            outlined
            label="Delivery Fee"
            required
            v-model="form.delivery_fee" prefix="₦"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="update ? updatedelivery() : adddelivery()"
            >{{ update ? 'Update Delivery Fee' : 'Add Delivery Fee' }}</v-btn
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
      brands: [],
      states: [],
      lgas: [],
      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'State', value: 'state.name' },
        { text: 'Local Government', value: 'lga.name' },
        { text: 'Weight from', value: 'weight_from' },
        { text: 'Weight to', value: 'weight_to' },
        { text: 'Delivery Fee', value: 'delivery_fee' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'action' },
      ],
      deliveries: [],
    }
  },
  mounted() {
    this.getDeliveryFees()
    this.getbrands()
    this.getStates()
  },
  methods: {
     getlga(name) {
      let obj = this.states.filter((item) => item.id === name)
      this.lgas = obj[0].lga
    },
    async getStates() {
      await this.$store.dispatch('states/allstates').then((response) => {
        this.states = response.data
      })
    },
    async deleteDelivery(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this delivery?') &&
        (await this.$store
          .dispatch('delivery/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getDeliveryFees()
          }))
    },
    async getDeliveryFees() {
      this.loading = true
      await this.$store.dispatch('delivery/all').then((response) => {
        this.deliveries = response.data
        this.loading = false
      })
    },
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
    async adddelivery() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('delivery/addnew', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getDeliveryFees()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

    async updatedelivery() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('delivery/update', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getDeliveryFees()
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
