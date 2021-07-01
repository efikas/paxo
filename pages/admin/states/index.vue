<template>
  <v-container>
    <v-card class="pa-6">
      <h3>States & LGAs</h3>
      <v-tabs class="mt-9">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>STATES</v-tab>
        <v-tab>LGA</v-tab>
        <v-tab-item>
          <v-row class="mt-5">
            <v-col md="3">
              <v-text-field
                placeholder="Search"
                append-icon="search"
                v-model="search"
                outlined
                dense
              >
              </v-text-field>
            </v-col>
            <v-col md="3" offset-md="6">
              <v-btn
                @click=";(dialog = true), (edit = false)"
                block
                class="primary"
                ><v-icon>add</v-icon>Add New State</v-btn
              >
            </v-col>
          </v-row>
          <v-data-table
            :items-per-page="50"
            :items="states"
            :headers="stateHeaders"
          >
          <template v-slot:item.created_at="{item}">
            {{item.created_at | formatDate}}
            </template>
            <template v-slot:item.sn="{ item }">
              {{ states.indexOf(item) + 1 }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                @click=";(dialog = true), (state = item), (edit = true)"
                icon
                ><v-icon color="success">edit</v-icon></v-btn
              >
              <v-btn icon @click="deleteState(item.id)"
                ><v-icon color="error">delete</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-row class="mt-5">
            <v-col md="3">
              <v-text-field
                placeholder="Search"
                append-icon="search"
                v-model="search2"
                outlined
                dense
              >
              </v-text-field>
            </v-col>
            <v-col md="3" offset-md="6">
              <v-btn
                @click=";(dialog2 = true), (edit2 = false)"
                block
                class="primary"
                ><v-icon>add</v-icon>Add New LGA</v-btn
              >
            </v-col>
          </v-row>
          <v-data-table
            :items-per-page="50"
            :items="lgas"
            :headers="lgaHeaders"
          >
            <template v-slot:item.sn="{ item }">
              {{ lgas.indexOf(item) + 1 }}
            </template>
            <template v-slot:item.created_at="{item}">
            {{item.created_at | formatDate}}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                @click=";(dialog2 = true), (lga = item), (edit2 = true)"
                icon
                ><v-icon color="success">edit</v-icon></v-btn
              >
              <v-btn icon @click="deleteLga(item.id)"
                ><v-icon color="error">delete</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-dialog v-model="dialog" width="450">
      <v-card class="pa-9">
        <h3>{{ edit ? 'Edit ' : 'Add a New' }} State</h3>
        <v-form ref="form" class="mt-10" lazy-validation v-model="valid">
          <v-text-field
            label="State Name"
            v-model="state.name"
            outlined
            dense
            required
            :rules="[(v) => !!v || 'This field is required']"
          ></v-text-field>
          <v-btn
            class="primary"
            block
            :loading="loading"
            @click="
              $refs.form.validate() ? (edit ? editState() : addState()) : null
            "
            >{{ edit ? 'Edit' : 'Add' }} State</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="450">
      <v-card class="pa-9">
        <h3>{{ edit2 ? 'Edit ' : 'Add a New' }} LGA</h3>
        <v-form ref="form2" class="mt-10" lazy-validation v-model="valid">
          <v-text-field
            label="LGA Name"
            v-model="lga.name"
            outlined
            dense
            required
            :rules="[(v) => !!v || 'This field is required']"
          ></v-text-field>
          <v-select
            outlined
            dense
            required
            label="Select State"
            :rules="[(v) => !!v || 'This field is required']"
            :items="states"
            item-text="name"
            item-value="id"
            v-model="lga.state_id"
          >
          </v-select>
          <v-btn
            class="primary"
            block
            :loading="loading"
            @click="
              $refs.form2.validate() ? (edit2 ? editLga() : addLga()) : null
            "
            >{{ edit2 ? 'Edit' : 'Add' }} LGA</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      dialog: false,
      dialog2: false,
      loading: false,
      edit2: false,
      lgas: [],
      lga: {},
      edit: false,
      valid: true,
      state: {},
      statename: '',
      states: [],
      stateHeaders: [
        { text: 'S/N', value: 'sn' },
        { text: 'Name', value: 'name' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'actions' },
      ],
      lgaHeaders: [
        { text: 'S/N', value: 'sn' },
        { text: 'Name', value: 'name' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  mounted() {
    this.getStates()
    this.getLgas()
  },
  methods: {
    async deleteState(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this state?') &&
        (await this.$store
          .dispatch('states/deletestate', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getStates()
          }))
    },
    async deleteLga(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this LGA?') &&
        (await this.$store
          .dispatch('states/deletelga', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getLgas()
          }))
    },
    async editState() {
      this.loading = true

      await this.$store
        .dispatch('states/editstate', this.state)
        .then((response) => {
          this.$toast.success(response.message)
          this.$refs.form.reset()
          this.getStates()
          this.loading = false
          this.dialog = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
          this.loading = false
        })
    },
    async addState() {
      this.loading = true

      await this.$store
        .dispatch('states/addstate', this.state)
        .then((response) => {
          this.$toast.success(response.message)
          this.$refs.form.reset()
          this.getStates()
          this.loading = false
          this.dialog = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
          this.loading = false
        })
    },
    async addLga() {
      this.loading = true

      await this.$store
        .dispatch('states/addlga', this.lga)
        .then((response) => {
          this.$toast.success(response.message)
          this.$refs.form2.reset()
          this.getLgas()
          this.loading = false
          this.dialog2 = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
          this.loading = false
        })
    },
    async editLga() {
      this.loading = true

      await this.$store
        .dispatch('states/editlga', this.lga)
        .then((response) => {
          this.$toast.success(response.message)
          this.$refs.form2.reset()
          this.getLgas()
          this.loading = false
          this.dialog2 = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error.message)
          this.loading = false
        })
    },
    async getStates() {
      await this.$store.dispatch('states/allstates').then((response) => {
        this.states = response.data
      })
    },
    async getLgas() {
      await this.$store.dispatch('states/alllga').then((response) => {
        this.lgas = response.data
      })
    },
  },
}
</script>
