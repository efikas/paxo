<template>
  <div>
    <v-carousel  height="416" :class="{'h-200' : $vuetify.breakpoint.smAndDown}"  interval="5000"  cycle hide-delimiter-background>
      <v-carousel-item v-for="i in banners" :key="i.id">
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
