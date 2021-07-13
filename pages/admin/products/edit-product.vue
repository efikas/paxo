<template>
  <v-container fluid>
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
            @change="getCategories(form.brand_id)"
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
            required
            prefix="₦"
            type="number"
            :rules="priceRules"
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
            v-model="form.weight" suffix="kg"
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
          <v-card  class="pa-2 mt-8" @click="clickInput()">
            <v-img contain
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
          <div class="d-flex justify-space-between">
            <v-checkbox
              label="Mark as Top Product?"
              v-model="form.top_product"
            ></v-checkbox>
             <v-checkbox
              label="Is product on sale?"
              v-model="form.onsale"
            ></v-checkbox>

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
      form: {},
      imagesrc: null,
      editorConfig: {},
      categories: [],
      brands: [],
      sections: [],
       priceRules: [(v) => !!v || 'This field is required',
      (v) => v < parseInt(this.form.regular_price) || 'Sales price must be less than regular price'
      ],
      salesRules: [(v) => !!v || 'This field is required',
      (v) => v < parseInt(this.form.sale_price) || 'Sales price must be less than sales price'
      ]
    }
  },
  mounted() {

    this.getBrands()
    this.getSingleProduct()
    this.getSection()
  },
  methods: {
    async getSingleProduct() {
      const data = {
        id: this.$route.query.productId,
      }
      await this.$store.dispatch('products/single', data).then((response) => {
        var details = response.data[0]
        this.form.product_name = details.name
        this.form.brand_id = parseInt(details.brand_id)
        this.form.regular_price = details.regular_price
        this.form.section_id = parseInt(details.section_id)
        this.form.sale_price = details.sale_price
        this.form.wholesales_price = details.wholesale_price
        this.form.stock_quantity = details.stock_quantity
        this.form.weight = details.weight
        this.form.short_description = details.short_description
        this.form.description = details.description
        this.form.how_to_use = details.how_to_use
        this.form.ingridient = details.ingridient
        this.form.onsale = details.onsale
        this.imagesrc = details.avatar
        for(var i =0; i<details.categories.length; i++){
          this.form.category[i] = i.category_id
        }
        this.form.top_product = details.top_product
        this.getCategories()
      })
    },
    getCategories(name) {
      let obj = this.sections.filter((item) => item.id === name)
      this.categories = obj[0].category
    },
    async getBrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
    async getSection() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
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
      // console.log(categories)
      for (var i = 0; i < categories.length; i++) {
        formData.append('category_id[' + i + ']', JSON.stringify(categories[i]))
      }
      formData.append('avatar', this.form.product_image)
      formData.append('name', this.form.product_name)
      formData.append('brand_id', this.form.brand_id)
      formData.append('section_id', this.form.section_id)
      formData.append('description', this.form.description)
      formData.append('how_to_use', this.form.description)
      formData.append('ingridient', this.form.description)
      formData.append('weight', this.form.weight)
      formData.append('short_description', this.form.short_description)
      formData.append('regular_price', this.form.regular_price)
      formData.append('price', this.form.sale_price)
      formData.append('sale_price', this.form.sale_price)
      formData.append('wholesale_price', this.form.wholesales_price)
      formData.append('stock_quantity', this.form.stock_quantity)
      formData.append('top_product', this.form.top_product ? 1 : 0)
      formData.append('onsale', this.form.onsale ? 1 : 0)
      await this.$store
        .dispatch('products/update', formData)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
          this.$router.push('/admin/products')
        }).catch(error => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
  },
}
</script>
