<template>
  <div>
    <v-carousel v-if="banners.length > 0"  height="500" :class="{'h-200' : $vuetify.breakpoint.smAndDown}"   interval="5000"  cycle light hide-delimiter-background>
      <v-carousel-item :to="'/banners/'+i.slug+'?bannerId='+i.id" v-for="i in banners.slice(0, banners.length - 2)" :key="i.id">
        <v-img
          height="450" :class="{'h-200' : $vuetify.breakpoint.smAndDown}"
          :src="
            i.avatar
          "
          alt=""
        >
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <!-- <v-carousel v-if="banners.length > 0" height="auto"  class="hidden-md-and-up"  interval="5000"  cycle hide-delimiter-background>
      <v-carousel-item :to="'/banners/'+i.name+'?bannerId='+i.id" v-for="i in banners.slice(0, banners.length - 2)" :key="i.id">
        <v-img

          :src="
            i.avatar
          "
          alt="" :contain="$vuetify.breakpoint.smAndDown"
        >
        </v-img>
      </v-carousel-item>
    </v-carousel> -->

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
<style lang="scss">
.v-carousel__controls__item.v-btn.v-btn--icon {
    background-color: #ebece9; /* Background color of non-active ones */
    height: 15px; /* Height you want */
    width: 15px; /* Width you want */
    border-radius: 10px !important; /* Remove default border radius */
}
  
.v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
    background-color: #36bdb4; /* Colour for active one */
}

.v-carousel__controls__item.v-btn.v-btn--icon:hover {
    background-color: #36bdb4; /* You might also want to customise the hover effect */
}

.v-btn__content .v-icon {
    // display: none; /* Removes the default icon */
}
</style>
<style lang="scss" scoped>
.v-carousel__controls__item.v-btn.v-btn--icon {
    background-color: red !important; /* Background color of non-active ones */
    height: 2px; /* Height you want */
    width: 40px; /* Width you want */
    border-radius: 0; /* Remove default border radius */
}
  
.v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active {
    background-color: red !important; /* Colour for active one */
}

.v-carousel__controls__item.v-btn.v-btn--icon:hover {
    background-color: red !important; /* You might also want to customise the hover effect */
}

.v-btn__content .v-icon {
    display: none; /* Removes the default icon */
}
</style>
