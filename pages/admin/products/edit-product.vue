<template>
  <v-container v-if="pageloading">
    <v-overlay light color="white" :opacity="1" :value="pageloading">
      <v-progress-circular color="primary" width="10" indeterminate size="64">
        Loading...
      </v-progress-circular>
    </v-overlay>
  </v-container>
  <v-container v-else fluid>
    <!-- {{form}} -->
    <h2>Update Product</h2>
    <v-row justify="center">
      <v-col md="12">
        <v-form lazy-validation v-model="valid" ref="addnew" class="mt-10">
          <v-text-field
            outlined
            dense
            label="Product Name"
            v-model="form.product_name"
            required
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-select
            label="Brand"
            v-model="form.brand_id"
            item-text="name"
            item-value="id"
            required
            :rules="[(v) => !!v || 'This field is required']"
            :items="brands"
            dense
            outlined
          >
          </v-select>
          <v-select
            label="Section"
            v-model="form.section_id"
            item-text="name"
            @change="getCategories(form.section_id)"
            item-value="id"
            required
            :rules="[(v) => !!v || 'This field is required']"
            :items="sections"
            dense
            outlined
          >
          </v-select>
          <v-select
            label="Product Category"
            multiple
            @change=";(form.sub_category = []), getSubCategories(form.category)"
            v-model="form.category"
            item-text="name"
            item-value="id"
            required
            :rules="[(v) => !!v || 'This field is required']"
            :items="categories"
            dense
            outlined
          >
          </v-select>
          <v-select
            label="Product Sub Category"
            multiple
            v-model="form.sub_category"
            item-text="name"
            item-value="id"
            required
            :rules="[(v) => !!v || 'This field is required']"
            :items="subcategories"
            dense
            outlined
          >
          </v-select>
          <!-- <v-select
                    label="Product Brand"
                    v-model="form.brand"
                    item-text="name"
                    item-value="id"
                    required
                    :rules="[(v) => !!v || 'This field is required']"
                    :items="brands"
                    dense
                    outlined
                  >
                  </v-select> -->

          <v-text-field
            outlined
            dense
            label="Product Regular Price"
            v-model="form.regular_price"
            required
            prefix="₦"
            type="number"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>

          <v-text-field
            outlined
            dense
            label="Product Sale Price"
            v-model="form.sale_price"
            prefix="₦"
            type="number"
          >
          </v-text-field>

          <v-text-field
            outlined
            dense
            label="Wholesales Price"
            v-model="form.wholesales_price"
            required
            prefix="₦"
            type="number"
            :rules="salesRules"
          >
          </v-text-field>
          <v-text-field
            outlined
            dense
            label="Stock Quantity"
            v-model="form.stock_quantity"
            required
            type="number"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>

          <v-text-field
            outlined
            dense
            label="Product Weight"
            v-model="form.weight"
            suffix="kg"
            required
            type="number"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <v-text-field
            outlined
            v-model="form.short_description"
            label="Short Description"
          ></v-text-field>
          <p class="font-weight-bold">How to Use</p>
          <ckeditor-nuxt v-model="form.how_to_use" :config="editorConfig" />
          <p class="font-weight-bold mt-6">Ingredients</p>
          <ckeditor-nuxt v-model="form.ingridient" :config="editorConfig" />

          <p class="font-weight-bold mt-6">Description</p>
          <client-only placeholder="loading...">
            <ckeditor-nuxt v-model="form.description" :config="editorConfig" />
          </client-only>
          <v-card class="pa-2 mt-8" @click="clickInput()">
            <v-img
              contain
              class="d-flex justify-center align-center text-center"
              :src="imagesrc"
              height="400"
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
          <v-row>
            <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="form.product_duration_from"
            label="Promo Duration Start Date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="form.product_duration_from"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(form.product_duration_from)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
          </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="modal"
                :return-value.sync="form.duration_to"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.duration_to"
                    label="Promo Duration End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.duration_to" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(form.duration_to)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-spacer></v-spacer>
          </v-row>

          <div class="d-flex justify-space-between">
            <v-checkbox
              label="Mark as Top Product?"
              v-model="form.top_product"
            ></v-checkbox>
            <div>
              {{ form.onsale }}
              <v-checkbox
                label="Is product on sale?"
                v-model="form.onsale"
              ></v-checkbox>
              <!-- {{ form.product_duration_from }} - {{ form.duration_to }} -->
              <!-- v-if="form.onsale" -->
              <!-- <v-date-range-picker
                v-model="form.duration"
                :from.sync="from"
                :to.sync="to"
                label="Set Duration"
                outlined
                dense
              /> -->
            </div>
          </div>
          <v-btn
            class="primary"
            @click="$refs.addnew.validate() ? updateProduct() : null"
            text
            block
            :loading="loading"
            large
            >Update Product</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
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
      valid: true,
      loading: false,
      pageloading: true,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      modal2: false,
      modal3: false,
      menu2: false,
      form: {
        sale_price: '',
        short_description: '',
        description: '',
        how_to_use: '',
        ingridient: '',
        onsale: null,
        product_duration_from: '',
        duration_to: '',
        // duration: {},
      },
      imagesrc: null,
      editorConfig: {
        removePlugins: ['Title'],
      },
      categories: [],
      subcategories: [],
      brands: [],
      sections: [],
      priceRules: [
        (v) => !!v || 'This field is required',
        (v) =>
          v < parseInt(this.form.regular_price) ||
          'Sales price must be less than regular price',
      ],
      salesRules: [
        (v) => !!v || 'This field is required',
        (v) =>
          v < parseInt(this.form.regular_price) ||
          'Wholesale price must be less than regular price',
      ],
    }
  },
  mounted() {
    this.getBrands()
    this.getSection()
    // this.getSingleProduct()
    // this.getCategories(this.form.section_id)
  },
  methods: {
    async getSingleProduct() {
      this.pageloading = true
      const data = {
        id: this.$route.query.productId,
      }
      await this.$store.dispatch('products/single', data).then((response) => {
        var details = response.data[0]
        this.form.product_name = details.name
        this.form.brand_id = parseInt(details.brand_id)
        this.form.regular_price = details.regular_price
        this.form.section_id = parseInt(details.section_id)
        this.form.sale_price = details.sale_price || ''
        this.form.wholesales_price = details.wholesale_price
        this.form.stock_quantity = details.stock_quantity
        this.form.weight = details.weight
        this.form.short_description = details.short_description
        this.form.description = details.description
        this.form.how_to_use = details.how_to_use
        this.form.ingridient = details.ingridient
        this.form.onsale = details.onsale
        this.imagesrc = details.avatar
        this.form.product_duration_from = details.product_duration_from
        this.form.duration_to = details.duration_to
        // for (var i = 0; i < details.categories.length; i++) {
        //   this.form.category[i] = i.category_id
        // }
        // for (var i = 0; i < details.subcategories.length; i++) {
        //   this.form.sub_category[i] = i.subcategory_id
        // }
        this.getCategories(parseInt(details.section_id))
        this.form.category = details.category.toString().split(',').map(Number)
        this.form.sub_category = details.subcategory.toString().split(',').map(Number)
        this.getSubCategories(this.form.category)
        this.form.top_product = parseInt(details.top_product)
        this.pageloading = false
      })
    },
    getCategories(name) {
      this.form.category = []

      let obj = this.sections.filter((item) => item.id === name)
      this.categories = obj[0].category
    },

    getSubCategories(name) {
      this.subcategories = []
      for (var i = 0; i < name.length; i++) {
        let obj = this.categories.filter((item) => item.id === name[i])
        this.subcategories = [].concat(this.subcategories, obj[0].subcategory)
      }
    },
    async getBrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
    async getSection() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
        this.getSingleProduct()
      })
    },
    clickInput() {
      document.getElementById('productImage').click()
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
    async updateProduct() {
      this.loading = true
      let formData = new FormData()
      var categories = this.form.category
      // var categorylist = categories.split(',')
      for (var i = 0; i < categories.length; i++) {
        formData.append('category_id[' + i + ']', JSON.stringify(categories[i]))
      }
      var subcategories = this.form.sub_category
      for (var i = 0; i < categories.length; i++) {
        formData.append(
          'subcategory_id[' + i + ']',
          JSON.stringify(subcategories[i])
        )
      }
      formData.append('category', this.form.category)
      formData.append('subcategory', this.form.sub_category)
      formData.append('product_id', this.$route.query.productId)
      formData.append('avatar', this.form.product_image)
      formData.append('name', this.form.product_name)
      formData.append('brand_id', this.form.brand_id)
      formData.append('section_id', this.form.section_id)
      formData.append('description', this.form.description)
      formData.append('how_to_use', this.form.how_to_use)
      formData.append('ingridient', this.form.ingridient)
      formData.append('weight', this.form.weight)
      formData.append('short_description', this.form.short_description)
      formData.append('regular_price', this.form.regular_price)
      formData.append('price', this.form.sale_price)
      formData.append('sale_price', this.form.sale_price)
      formData.append('wholesale_price', this.form.wholesales_price)
      formData.append('stock_quantity', this.form.stock_quantity)
      formData.append('top_product', this.form.top_product ? 1 : 0)
      formData.append('onsale', this.form.onsale ? 1 : 0)
      formData.append('product_duration_from', this.form.product_duration_from)
      formData.append('duration_to', this.form.duration_to)
      // if (this.form.duration) {
      //   formData.append('product_duration_from', this.form.duration.from)
      //   formData.append('duration_to', this.form.duration.to)
      // }
      // console.log(formData)
      await this.$store
        .dispatch('products/update', formData)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
  },
}
</script>
