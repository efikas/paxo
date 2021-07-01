<template>
  <v-container fluid>
    <h2>Categories</h2>
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
            <v-icon>add</v-icon> Add New Category
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :items="categories" :headers="headers" :loading="loading" :search="search">
        <template v-slot:item.sn="{ item }">
          {{ categories.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCategory(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} Category</h2>
        <!-- <v-alert type="error">{{}}</v-alert> -->
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Category Name"
            required
            v-model="form.name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-select
            label="Select Section" outlined dense
            required
            :rules="[(v) => !!v || 'This field is required']"
            v-model="form.section_id"
            :items="sections"
            item-text="name"
            item-value="id"
          >
          </v-select>
          <v-textarea
            outlined
            v-model="form.description"
            :rules="[(v) => !!v || 'This field is required']"
            required
            label="Description"
          >
          </v-textarea>
          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="$refs.addnew.validate() ? (update ? updateCategory() : addCategory()) : null"
            >{{ update ? 'Update' : 'Add Category' }}</v-btn
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
      sections: [],
      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'Category Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'action' },
      ],
      categories: [],
    }
  },
  mounted() {
    this.getCategories()
    this.getsections()
  },
  methods: {
    async deleteCategory(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this category?') &&
        (await this.$store
          .dispatch('category/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getCategories()
          }))
    },
    async getCategories() {
      this.loading = true
      await this.$store.dispatch('category/all').then((response) => {
        this.categories = response.data
        this.loading = false
      })
    },
    async getsections() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
      })
    },
    async addCategory() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('category/addnew', this.form)
          .then((response) => {
            this.$toast.success(response.message)

            this.getCategories()
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

    async updateCategory() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('category/update', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getCategories()
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
