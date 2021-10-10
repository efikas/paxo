<template>
  <v-container fluid>
    <div class="row">
      <v-col cols="6">
        <v-btn
          class="col-12"
          @click="showCategory = true"
          :class="{
            'v-btn--outlined primary--text': !showCategory,
            primary: showCategory,
          }"
          text
          >Categories</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn
          class="col-12"
          @click="showCategory = false"
          :class="{
            'v-btn--outlined primary--text': showCategory,
            primary: !showCategory,
          }"
          text
          >Brands</v-btn
        >
      </v-col>
    </div>
    <!-- <v-btn class="primary" text block>Shop By Categories</v-btn> -->
    <v-expansion-panels class="mt-4" v-if="showCategory">
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
    <v-list
      v-if="!showCategory"
      dense
      flat
      style="width: 100vw"
      class="py-0 elevation-0"
    >
      <v-row>
        <v-col cols="12" class="pa-4">
          <div class="d-flex justify-space-between letters-wrapper">
            <v-btn @click="orderedBrands = _.orderBy(brands, 'name')" icon small
              >All</v-btn
            >
            <v-btn icon small>#</v-btn>
            <v-btn @click="sortBrands('a')" icon small>A</v-btn>
            <v-btn @click="sortBrands('b')" icon small>B</v-btn>
            <v-btn @click="sortBrands('c')" icon small>C</v-btn>
            <v-btn @click="sortBrands('d')" icon small>D</v-btn>
            <v-btn @click="sortBrands('e')" icon small>E</v-btn>
            <v-btn @click="sortBrands('f')" icon small>F</v-btn>
            <v-btn @click="sortBrands('g')" icon small>G</v-btn>
            <v-btn @click="sortBrands('h')" icon small>H</v-btn>
            <v-btn @click="sortBrands('i')" icon small>I</v-btn>
            <v-btn @click="sortBrands('j')" icon small>J</v-btn>
            <v-btn @click="sortBrands('k')" icon small>K</v-btn>
            <v-btn @click="sortBrands('l')" icon small>L</v-btn>
            <v-btn @click="sortBrands('m')" icon small>M</v-btn>
            <v-btn @click="sortBrands('n')" icon small>N</v-btn>
            <v-btn @click="sortBrands('o')" icon small>O</v-btn>
            <v-btn @click="sortBrands('p')" icon small>P</v-btn>
            <v-btn @click="sortBrands('q')" icon small>Q</v-btn>
            <v-btn @click="sortBrands('r')" icon small>R</v-btn>
            <v-btn @click="sortBrands('s')" icon small>S</v-btn>
            <v-btn @click="sortBrands('t')" icon small>T</v-btn>
            <v-btn @click="sortBrands('u')" icon small>U</v-btn>
            <v-btn @click="sortBrands('v')" icon small>V</v-btn>
            <v-btn @click="sortBrands('w')" icon small>W</v-btn>
            <v-btn @click="sortBrands('x')" icon small>X</v-btn>
            <v-btn @click="sortBrands('y')" icon small>Y</v-btn>
            <v-btn @click="sortBrands('z')" icon small>Z</v-btn>
          </div>
          <!-- <v-divider></v-divider> -->
        </v-col>
      </v-row>
      <div class="brands-container pa-10 pt-0 row">
        <div
          v-for="(i, index) in brandlength"
          :key="index"
          class="brands col-6"
        >
          <div class="sub-menu--brand">
            <a
              href="javascript:void(0)"
              class="nav-"
              @click="
                ;(showBrand = false),
                  $router.push('/brands/' + j.name + '?brandId=' + j.id)
              "
              v-for="j in orderedBrands.slice(
                index * brandsize,
                index * brandsize + brandsize
              )"
              :key="j.id"
              style="text-decoration: none; margin-bottom: 0 !important"
            >
              <p class="" style="font-size: 13px">
                {{ j.name }}
              </p></a
            >
          </div>
        </div>
      </div>
    </v-list>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      sections: [],
      brands: [],
      showCategory: true,
      brandsize: 7,
      orderedBrands: [],
    }
  },
  computed: {
    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },
  },
  mounted() {
    this.getsections()
    this.getbrands()
  },
  methods: {
    // async getbrands() {
    //   await this.$store.dispatch('brand/all').then((response) => {
    //     this.brands = response.data
    //   })
    // },
    async getsections() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
      })
    },
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
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
