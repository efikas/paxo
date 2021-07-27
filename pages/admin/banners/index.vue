<template>
  <v-container fluid>
    <h2>Banners</h2>
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
            <v-icon>add</v-icon> Add New banner
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="banners"
        :headers="headers"
        :loading="loading"
        :search="search"
      >
        <template v-slot:item.avatar="{ item }">
          <v-img :src="item.avatar" width="100" height="100"></v-img>
        </template>

        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon
            @click="
              ;(form = item), form.product_id = item.product.split(',').map(Number),
                (dialog = true),
                (update = true),
                (imagesrc = item.avatar)
            "
          >
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deletebanner(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="800" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} banner</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Banner Name"
            required
            v-model="form.name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-autocomplete
            :items="products"
            v-model="form.product_id"
            outlined
            dense
            item-text="name"
            item-value="id"
            label="Select Products"
            multiple
            clearable
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-autocomplete>
          <v-card class="pa-2" @click="clickInput()">
            <v-img
              class="d-flex justify-center align-center text-center"
              :src="imagesrc"
              height="200"
            >
              <h5 v-if="!imagesrc">Tap to change upload Image</h5>
            </v-img>
          </v-card>
          <v-file-input
            v-model="form.product_image"
            style="visibility: hidden"
            @change="onImageSelect()"
            id="productImage"
          >
          </v-file-input>

          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="update ? updatebanner() : addbanner()"
            >{{ update ? 'Update' : 'Add banner' }}</v-btn
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
      imagesrc: null,
      headers: [
        { text: 'Banner', value: 'avatar' },
        { text: 'banner Name', value: 'name' },
        { text: 'Date Created', value: 'created_at' },

        { text: 'Actions', value: 'action' },
      ],
      banners: [],
      products: [],
    }
  },
  mounted() {
    this.getbanners()
    this.getProducts()
  },
  methods: {
    async getProducts() {
      this.loading = true
      const data = {
        page: this.page,
      }
      await this.$store.dispatch('products/allall', data).then((response) => {
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
    async deletebanner(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this banner?') &&
        (await this.$store.dispatch('banner/delete', data).then((response) => {
          this.$toast.success(response.message)
          this.getbanners()
        }))
    },
    async getbanners() {
      this.loading = true
      await this.$store
        .dispatch('banner/all')
        .then((response) => {
          this.banners = response.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
        })
    },
    async addbanner() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('name', this.form.name)

        var products = this.form.product_id

        for (var i = 0; i < products.length; i++) {
          formData.append('product_id[' + i + ']', JSON.stringify(products[i]))
        }
        formData.append('product', this.form.product_id)
        formData.append('avatar', this.form.product_image)

        await this.$store
          .dispatch('banner/addnew', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getbanners()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

    async updatebanner() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('avatar', this.form.product_image)
        var products = this.form.product_id

        for (var i = 0; i < products.length; i++) {
          formData.append('product_id[' + i + ']', JSON.stringify(products[i]))
        }
        formData.append('avatar', this.form.product_image)
        formData.append('product', this.form.product_id)

        formData.append('id', this.form.id)
        await this.$store
          .dispatch('banner/update', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getbanners()
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
