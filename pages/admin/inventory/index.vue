<template>
  <v-container fluid>
    <h2>Inventory</h2>
    <v-card class="pa-6 mt-4">
      <v-row>
        <v-col md="3">
          <v-text-field
            outlined
            dense
            placeholder="Search"
            prepend-inner-icon="search"
            v-model="search"
            ><span>{{ computeProduct }}</span>
          </v-text-field>
        </v-col>
        <v-col md="3" offset-md="3">
          <v-btn class="primary" @click="download" block text> Export </v-btn>
        </v-col>
        <v-col md="3">
          <v-btn class="primary" :to="'inventory/change_price'" block text>
            <v-icon>edit</v-icon> Change products price
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :loading="loading"
        :items-per-page="perPage"
        hide-default-footer
        :items="products"
        :headers="headers"
      >
        <template v-slot:item.avatar="{ item }">
          <img :src="item.avatar" width="100" alt="" />
        </template>
        <template v-slot:item.stock_quantity="{ item }">
          {{ item.stock_quantity }}
          <v-chip
            small
            :color="item.stock_status == 'instock' ? 'success' : 'error'"
            >{{ item.stock_status }}</v-chip
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn :to="'/admin/products/edit-product?productId=' + item.id" icon
            ><v-icon color="success">edit</v-icon></v-btn
          >
        </template>
      </v-data-table>
      <v-pagination
        class="mt-16"
        :length="pageinationLength"
        :total-visible="7"
        v-model="page"
        @input="toPage"
        @next="next"
        @previous="previous"
      ></v-pagination>
    </v-card>
    <v-dialog width="800" v-model="dialog">
      <v-card class="pa-6">
        <h2>Change Products Price</h2>
        <v-form lazy-validation v-model="valid" class="mt-8" ref="addnew">
          <v-select
            dense
            outlined
            label="Price Type"
            required
            :items="priceType"
            item-text="name"
            item-value="key"
            v-model="form.priceType"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-select>
          <v-row v-if="form.priceType == 'sale_price'">
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="dialog_from"
                v-model="modal1"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.duration_from"
                    label="Duration Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.duration_from" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog_from.save(form.duration_from)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="dialog"
                v-model="modal"
                :close-on-content-click="false"
                :return-value.sync="form.duration_to"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.duration_to"
                    label="Duration End Date"
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
              </v-menu>
            </v-col>

            <v-spacer></v-spacer>
          </v-row>
          <v-select
            v-if="form.priceType != 'sale_price'"
            dense
            outlined
            label="Change Type"
            required
            :items="changeType"
            item-text="name"
            item-value="key"
            v-model="form.type"
          >
          </v-select>

          <v-text-field
            outlined
            dense
            label="Price Change (%)"
            type="number"
            min="0"
            step="1"
            required
            v-model="form.priceChange"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
          <div style="margin-bottom: 80px">
            <label class="typo__label">Select products</label>
            <multiselect
              v-model="form.products"
              tag-placeholder="Select products"
              placeholder="Search and select products"
              label="name"
              track-by="id"
              :options="real_products"
              :multiple="true"
              :taggable="false"
              required
              :rules="[(v) => !!v || 'This field is required']"
            ></multiselect>
            <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
          </div>

          <v-btn
            large
            block
            :disabled="validateSubmit"
            class="primary"
            :loading="loading"
            @click="updatePrices"
            >Update Price</v-btn
          >
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { jsontoexcel } from 'vue-table-to-excel'
export default {
  layout: 'admin',
  search: '',
  components: { Multiselect },
  computed: {
    computeProduct() {
      this.filtered_products = this.real_products.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
      this.pageinationLength = Math.ceil(
        this.filtered_products.length / this.perPage
      )
      this.toPage(1)

      return ''
    },

    validateSubmit() {
      if (this.form.products.length < 1) {
        return true
      }
      if (this.form.priceChange == undefined || this.form.priceChange == '') {
        return true
      }
      if (this.form.priceType == 'sale_price') {
        if (
          this.form.duration_to == undefined ||
          this.form.duration_from == undefined
        ) {
          return true
        }
      }
      return false
    },
  },
  data() {
    return {
      dialog: false,
      update: false,
      valid: true,
      search: '',
      page: 1,
      pageinationLength: 1,
      perPage: 50,
      length: 1,
      form: {
        products: [],
        type: 'decrease',
      },
      changeType: [
        {
          name: 'Decrease',
          key: 'decrease',
        },
        {
          name: 'Increase',
          key: 'increase',
        },
      ],
      priceType: [
        {
          name: 'Sale Price',
          key: 'sale_price',
        },
        {
          name: 'Regular Price',
          key: 'regular_price',
        },
        {
          name: 'Wholesale Price',
          key: 'wholesale_price',
        },
      ],
      products: [],
      real_products: [],
      filtered_products: [],
      loading: false,
      headers: [
        { text: 'Product Image', value: 'avatar' },
        { text: 'Product Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Regular Price', value: 'regular_price' },
        { text: 'Wholesale Price', value: 'wholesale_price' },
        { text: 'Quantity in Stock', value: 'stock_quantity' },
        { text: 'Actions', value: 'actions' },
      ],
      json: {
        data: [],
        head: [
          'Product Name',
          'Price',
          'Regular Price',
          'Wholesale Name',
          'Quantity in Stock',
        ],
        fileName: 'inventory record.xls',
      },
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    download() {
      const { data, head, fileName } = this.json
      jsontoexcel.getXlsx(data, head, fileName)
    },
    toPage(page) {
      this.page = page
      let start = this.perPage * (page - 1)
      let end = this.perPage * page
      this.products = this.filtered_products.slice(start, end)
      window.scrollTo(0, 0)
    },
    next() {
      this.toPage(this.page)
    },
    previous() {
      this.toPage(this.page)
    },
    async getProducts() {
      this.loading = true
      const data = {
        page: this.page,
        category: '',
        brand: '',
        price: '',
      }
      // await this.$store.dispatch('products/all', data).then((response) => {
      //   this.products = response.data.data
      //   console.log(this.products)
      //   this.length = response.data.last_page
      //   this.loading = false
      // })
      await this.$store
        .dispatch('products/allproducts', this.page)
        .then((response) => {
          // console.log(response.data.data)
          this.real_products = response.data
          this.filtered_products = this.real_products
          this.length = response.data.last_page
          this.pageinationLength = Math.ceil(
            this.filtered_products.length / this.perPage
          )
          this.toPage(1)
          this.loading = false

          this.real_products.forEach((item) => {
            this.json.data.push({
              product_name: item.name,
              price: item.price,
              regular_price: item.regular_price,
              wholesale_price: item.wholesale_price,
              stock_quantity: item.stock_quantity,
            })
          })
        })
    },
    async updatePrices() {
      this.loading = true
      let formData = this.form
      let iDs = []
      this.form.products.forEach((item) => {
        iDs.push(item.id)
      })

      formData = { ...formData, products: iDs }

      await this.$store
        .dispatch('products/updateProductsPrice', { formData: formData })
        .then((response) => {
          // console.log(response)
          if (response.status == true) {
            window.location.reload()
          }
          this.loading = false
        })
    },
  },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
