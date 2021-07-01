<template>
  <v-container fluid>
    <v-btn class="primary" text block>Shop By Categories</v-btn>
    <v-expansion-panels class="mt-4">
      <v-expansion-panel v-for="(item, i) in brands" :key="i">
        <v-expansion-panel-header class="primary--text font-weight-medium">{{ item.name }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels>
            <v-expansion-panel v-for="(j, index) in item.category" :key="index">
            <v-expansion-panel-header>{{j.name}} </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-for="k in j.subcategory" :key="k.id" class="sub-menu mb-4">
                  <nuxt-link
                    :to="'/category/' + k.name + '?categoryId=' + k.id"
                    >{{ k.name }}</nuxt-link
                  >
                </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      brands: [],
    }
  },
  mounted() {
    this.getbrands()
  },
  methods: {
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
      })
    },
  },
}
</script>
