<template>
    <div>
        <h3 class="font-weight-medium ml-2">
      SHOP BY BRANDS
    </h3>
        <v-row justify="center" class="mt-4">
            <v-expansion-panels accordion readonly="true">
                <v-expansion-panel v-for="(item, index) in orderedBrands" :key="index">
                    <v-expansion-panel-header expand-icon="mdi-chevron-right" @click="$router.push('/brands/' + item.name + '?brandId=' + item.id)">
                        <nuxt-link :to="'/brands/' + item.name + '?brands=' + item.id"
                            style="text-decoration: none; margin-bottom: 0 !important">
                            {{ item.name }}</nuxt-link>
                        </v-expansion-panel-header>
                 
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderedBrands: [],
            brands: [],
        }
    },
    methods: {
        async getbrands() {
            await this.$store.dispatch('brand/all').then((response) => {
                this.brands = response.data
                this.orderedBrands = _.orderBy(this.brands, 'name')
            })
        },
       
    },
    created() {
        this.getbrands()
    },
   
}
</script>
