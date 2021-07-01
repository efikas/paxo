<template>
  <v-container fluid>
    <h2>Blog Posts</h2>
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
            <v-icon>add</v-icon> Add New blog
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :items="blogs" :headers="headers" :loading="loading" :search="search">
        <template v-slot:item.avatar="{ item }">
          <v-img :src="item.avatar" height="100" width="100" alt=""></v-img>
        </template>
        <template v-slot:item.created_at="{item}">
        {{item.created_at | formatDate}}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true), imagesrc = item.avatar">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteblog(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="1000" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} blog</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Blog Title"
            required
            v-model="form.title"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-card  class="pa-2" @click="clickInput()">
            <v-img
              class="d-flex justify-center align-center text-center"
              :src="imagesrc"
              height="200"
            >
              <h5 v-if="!imagesrc">Tap to change Featured Image</h5>
            </v-img>
          </v-card>
          <v-file-input
            v-model="form.product_image"
            style="visibility: hidden"
            @change="onImageSelect()"
            id="productImage"
          >
          </v-file-input>
          <client-only placeholder="loading...">
            <ckeditor-nuxt v-model="form.description" :config="editorConfig" />
          </client-only>
          <v-btn
            large
            block
            class="primary mt-8"
            :loading="loading"
            @click="update ? updateblog() : addblog()"
            >{{ update ? 'Update' : 'Add blog' }}</v-btn
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
      form: {},
      imagesrc: null,
      headers: [
        { text: 'Image', value: 'avatar' },
        { text: 'Blog Title', value: 'title' },
        // { text: 'No. of views', value: 'view_count' },
        { text: 'Date Created', value: 'created_at' },
        { text: 'Actions', value: 'action' },
      ],
      blogs: [],
    }
  },
  mounted() {
    this.getblogs()
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
    async deleteblog(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this blog?') &&
        (await this.$store
          .dispatch('blog/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getblogs()
          }))
    },
    async getblogs() {
      this.loading = true
      await this.$store.dispatch('blog/all').then((response) => {
        this.blogs = response.data
        this.loading = false
      })
    },
    async addblog() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('avatar', this.form.product_image)
        formData.append('description', this.form.description)
        await this.$store
          .dispatch('blog/addnew', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getblogs()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

     async updateblog() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        let formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('avatar', this.form.product_image)
        formData.append('description', this.form.description)
        formData.append('id', this.form.id)
        await this.$store
          .dispatch('blog/update', formData)
          .then((response) => {
            this.$toast.success(response.message)
            this.getblogs()
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
