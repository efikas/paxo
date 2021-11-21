<template>
  <v-container fluid>
    <div class="d-flex justify-space-between">
      <v-btn
        @click=";(byCategory = true), (byBrand = false)"
        :color="!byCategory ? 'primary' : ''"
        :class="byCategory ? 'primary white--text' : ''"
        outlined
        text
        >Shop By Categories</v-btn
      >
      <v-btn
        @click=";(byCategory = false), (byBrand = true)"
        :color="!byBrand ? 'primary' : ''"
        :class="byBrand ? 'primary white--text' : ''"
        text
        outlined
        >Shop By Brands</v-btn
      >
    </div>
    <v-expansion-panels v-if="byCategory" class="mt-4">
      <v-expansion-panel v-for="(item, i) in sections" :key="i">
        <v-expansion-panel-header class="primary--text font-weight-medium">{{
          item.name
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel v-for="(j, index) in item.category" :key="index">
              <v-expansion-panel-header>{{ j.name }} </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-for="k in j.subcategory"
                  :key="k.id"
                  class="sub-menu mb-4"
                >
                  <nuxt-link
                    :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id"
                    >{{ k.name }}</nuxt-link
                  >
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div v-if="byBrand">
      <v-list dense>
        <v-list-item
          style="border-bottom: 1px solid #ddd"
          :to="'/brands/' + item.name + '?brandId=' + item.id"
          dense
          v-for="(item, i) in sortBrandsAlphabetically"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.name"> </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon> chevron_right </v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      sections: [],
      brands: [],
      sections: [],
      byCategory: true,
      byBrand: false,
    }
  },
  computed: {
    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },
    sortBrandsAlphabetically() {
      return this.brands.sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  },
  mounted() {
    this.getSection()
    this.getBrands()
  },
  methods: {
    // async getbrands() {
    //   await this.$store.dispatch('brand/all').then((response) => {
    //     this.brands = response.data
    //   })
    // },
    async getSection() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
      })
    },
    async getBrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
        // this.pageloading = false
        this.orderedBrands = _.orderBy(this.brands, 'name')
      })
    },
    sortBrands(alpha) {
      let startsWithN = this.brands.filter(function (brand) {
        return brand.name[0].toLowerCase() === alpha
      })
      this.orderedBrands = startsWithN
    },
  },
}
</script>
<style lang="scss" scoped>
.v-btn--outlined {
  border: thin solid #36bdb4 !important;
}
.letters-wrapper {
  overflow: auto;
  padding: 5px 0;
  border-bottom: #000;
}
.sub-menu--brand a {
  text-decoration: none;
  color: #000;
  font-size: 14px;
  &:hover {
    color: #ff4e50;
  }
}
</style>
