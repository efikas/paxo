<template>
  <v-container fluid>
    <h2>Sub Categories</h2>
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
            <v-icon>add</v-icon> Add New Sub-Category
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="subcategories"
        :headers="headers"
        :loading="loading"
        :search="search"
      >
        <template v-slot:item.sn="{ item }">
          {{ subcategories.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn icon @click=";(form = item), (dialog = true), (update = true)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
          <v-btn icon @click="deleteSubCategory(item.id)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="500" v-model="dialog">
      <v-card class="pa-6">
        <h2>{{ update ? 'Update' : 'Add New' }} Sub Category</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-text-field
            dense
            outlined
            label="Sub Category Name"
            required
            v-model="form.name"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-select
            label="Select Section"
            outlined
            dense
            required
            :rules="[(v) => !!v || 'This field is required']"
            v-model="form.brand_id"
            :items="brands"
            @change="fetchCategory()"
            item-text="name"
            item-value="id"
          >
          </v-select>
          <v-select
            label="Select Category"
            outlined
            dense
            required
            :rules="[(v) => !!v || 'This field is required']"
            v-model="form.category_id"
            :items="categories"
            item-text="name"
            item-value="id"
          >
          </v-select>
          <v-textarea
            outlined
            v-model="form.description"
            :rules="(v) => !!v || 'This field is required'"
            required
            label="Description"
          >
          </v-textarea>
          <v-btn
            large
            block
            class="primary"
            :loading="loading"
            @click="update ? updateSubCategory() : addSubCategory()"
            >{{ update ? 'Update' : 'Add Sub Category' }}</v-btn
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
      headers: [
        { text: 'S/N', value: 'sn' },
        { text: 'Sub Category Name', value: 'name' },
        { text: 'Category Name', value: 'category.name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'action' },
      ],
      categories: [],
      subcategories: []
    }
  },
  mounted() {
    this.getSubCategories()
    this.getbrands()
  },
  methods: {
    fetchCategory() {
      this.categories = this.brands.find((x) => x.id === this.form.brand_id).category
    },
    async deleteSubCategory(id) {
      const data = {
        id: id,
      }
      confirm('Are you sure you want to delete this sub category?') &&
        (await this.$store
          .dispatch('subcategory/delete', data)
          .then((response) => {
            this.$toast.success(response.message)
            this.getSubCategories()
          }))
    },
    async getSubCategories() {
      this.loading = true
      await this.$store
        .dispatch('subcategory/all')
        .then((response) => {
          this.subcategories = response.data
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    async getbrands() {
      await this.$store.dispatch('section/all').then((response) => {
        this.brands = response.data
      })
    },
    async addSubCategory() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('subcategory/addnew', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getSubCategories()
            this.$refs.addnew.reset()
            this.loading = this.dialog = false
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message)
            this.loading = false
          })
      }
    },

    async updateSubCategory() {
      if (this.$refs.addnew.validate()) {
        this.loading = true
        await this.$store
          .dispatch('subcategory/update', this.form)
          .then((response) => {
            this.$toast.success(response.message)
            this.getSubCategories()
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
