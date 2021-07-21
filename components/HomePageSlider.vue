<template>
  <div>
    <v-carousel v-if="banners.length > 0"  height="416" :class="{'h-200' : $vuetify.breakpoint.smAndDown}"  interval="5000"  cycle hide-delimiter-background>
      <v-carousel-item :to="'/banners/'+i.name+'?bannerId='+i.id" v-for="i in banners.slice(0, banners.length - 2)" :key="i.id">
        <v-img
          height="416" :class="{'h-200' : $vuetify.breakpoint.smAndDown}"
          :src="
            i.avatar
          "
          alt=""
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-card v-else class="d-flex justify-space-between">
      <v-skeleton-loader v-for="i in 3" :key="i" class="mx-4" type="card, image" height="416" width="100%">

      </v-skeleton-loader>

    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: []
    }
  },
  methods: {
    async getBanners() {
      this.loading = true
      await this.$store.dispatch('banner/allbanner').then((response) => {
        this.banners = response.data

      })
    },
  },
  mounted () {
    this.getBanners()
  }
}
</script>
