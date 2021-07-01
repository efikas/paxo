<template>
  <v-container fluid>
    <h2>Sections</h2>
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
            <v-icon>add</v-icon> Add New section
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :items="sections" :headers="headers" :loading="loading" :search="search">
        <template v-slot:item.sn="{ item }">
          {{ sections.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true), imagesrc = item.avatar">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deletesection(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} section</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Section Name"
            required
            v-model="form.name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <!-- <v-card  class="pa-2" @click="clickInput()">
            <v-img
              class="d-flex justify-center align-center text-center"
              :src="imagesrc"
              height="200"
            >
              <h5 v-if="!imagesrc">Tap to change product Image</h5>
            </v-img>
          </v-card>
          <v-file-input
            v-model="form.product_image"
            style="visibility: hidden"
            @change="onImageSelect()"
            id="productImage"
          >
          </v-file-input>
          <v-textarea
            outlined
            v-model="form.description"
            :rules="(v) => !!v || 'This field is required'"
            required
            label="Description"
          >
          </v-textarea> -->
          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="update ? updatesection() : addsection()"
            >{{ update ? 'Update' : 'Add section' }}</v-btn
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
        { text: 'S/N', value: 'sn' },
        { text: 'Section Name', value: 'name' },
        // { text: 'Slug', value: 'slug' },
        // { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'action' },
      ],
      sections: [],
    }
  },
  mounted() {
    this.getsections()
  },
  methods: {
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
    async deletesection(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this section?') &&
        (await this.$store
          .dispatch('section/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getsections()
          }))
    },
    async getsections() {
      this.loading = true
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
        this.loading = false
      })
    },
    async addsection() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('avatar', this.form.product_image)
        formData.append('description', this.form.description)
        await this.$store
          .dispatch('section/addnew', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getsections()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

     async updatesection() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('avatar', this.form.product_image)
        formData.append('description', this.form.description)
        formData.append('id', this.form.id)
        await this.$store
          .dispatch('section/update', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getsections()
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
