<template>
  <v-container fluid>
    <h2>Recommendations</h2>
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
            <v-icon>add</v-icon> Add New recommendation
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="recommendations"
        :headers="headers"
        :loading="loading"
        :search="search"
      >
        <template v-slot:item.image="{ item }">
          <v-img :src="item.image" height="100" width="100" alt=""></v-img>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon
            @click="
              ;(form = item),
                (dialog = true),
                (update = true),
                (imagesrc = item.avatar)
            "
          >
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleterecommendation(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} Recommendation</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
         <v-select
            label="Skin Type"
            v-model="form.skin_type"
            :items="['Oily', 'Dry', 'Normal', 'Combination', 'Sensitive']"
            outlined
            required
            :rules="[(v) => !!v || 'This field is required']"
            dense
          >
          </v-select>
           <v-select
            label="Skin Care Option"
            v-model="form.route"
            :items="[
              { text: 'Acne-Prone Skin Treatment', value: 'acne' },
              { text: 'Normal Skin Care Routine', value: 'normal' },
            ]"
            outlined
            required
            :rules="[(v) => !!v || 'This field is required']"
            dense
          >
          </v-select>
           <v-select v-if="form.route == 'acne'"
            label="Skin Condition"
            v-model="form.head_type"
            :items="[
              { text: 'Black Head', value: 'black head' },
              { text: 'White Head', value: 'white head' },
              { text: 'Hyperpigmentation', value: 'hyperpigmentation' },
              { text: 'Sunburn', value: 'sunburn' },
              { text: 'Pastules + Pustules', value: 'pastules + pustules' },
              { text: 'Eczema', value: 'eczema' },
              { text: 'Redness', value: 'redness' },
              { text: 'Skin tag', value: 'skin tag' },
            ]"
            required
            :rules="[(v) => !!v || 'This field is required']"
            outlined
            dense
          >
          </v-select>
          <v-autocomplete
            label="Select Product"
            v-model="form.product_id"
            item-text="name"
            item-value="id"
            :items="products"
            required
            :rules="[(v) => !!v || 'This field is required']"
            outlined
            dense
          >
          </v-autocomplete>





          <v-btn
            large
            block
            class="primary mt-8"
            :loading="loading"
            @click="update ? updaterecommendation() : addrecommendation()"
            >{{ update ? 'Update' : 'Add recommendation' }}</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    return {
      dialog: false,
      valid: true,
      loading: false,
      update: false,
      search: '',
      products: [],
      form: {},
      imagesrc: null,
      headers: [
        { text: 'Product', value: 'product.name' },
        { text: 'Skin Type', value: 'skin_type' },
        { text: 'Head Type', value: 'head_type' },
        { text: 'Route', value: 'route' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'action' },
      ],
      recommendations: [],
    }
  },
  mounted() {
    this.getrecommendations()
    this.getProducts()
  },
  methods: {
    async getProducts() {
      this.loading = true
      await this.$store.dispatch('products/allall').then((response) => {
        this.products = response.data
      })
    },
    onImageSelect(e) {
      if (this.form.product_image) {
        const file = this.form.product_image
        this.imagesrc = URL.createObjectURL(file)
        // this.uploadProfilePic()
      } else {
        this.imagesrc = null
      }
    },
    clickInput() {
      document.getElementById('productImage').click()
    },
    async deleterecommendation(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this recommendation?') &&
        (await this.$store
          .dispatch('recommendation/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getrecommendations()
          }))
    },
    async getrecommendations() {
      this.loading = true
      await this.$store.dispatch('recommendation/all').then((response) => {
        this.recommendations = response.data
        this.loading = false
      })
    },
    async addrecommendation() {
      if (this.$refs.addnew.validate()) {
        this.loading = true

        await this.$store
          .dispatch('recommendation/addnew', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getrecommendations()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

    async updaterecommendation() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('recommendation/update', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getrecommendations()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            // console.log(error)
            this.loading = false
          })
      }
    },
  },
}
</script>
