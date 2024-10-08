<template>
    <div>
      <v-container fluid>
        <v-row  :class="{'px-8':$vuetify.breakpoint.mdAndUp}">
            <v-col md="4" v-for="i in adminBrands" :key="i.id">
            <v-img
            @click="$router.push('/brands/'+i.name+'?brandId='+i.id)"
            class="brands-img elevation-2" :class="{ 'h-200' : $vuetify.breakpoint.smAndDown}"
            height="250"
            :src="i.avatar"
            @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
            lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660830349/Brand_Banner_1b_gax3tp.png"
            
            ></v-img>
        </v-col>
      </v-row>
      </v-container>
    </div>
  </template>
  <script>
  export default {
    mounted() {
      this.getadminBrands()
    },
    data() {
      return {
        adminBrands: [],
        loading: true,
      }
    },
    methods: {
      async getadminBrands() {
      await this.$store.dispatch('brand/allBrands').then((response) => {
        this.adminBrands = response.data
        this.loading = false
      })
    },
      
    },
  }
  </script>
  <style lang="scss" scoped>
  .category {
    // background-color: #f5f5f5;
    h4 {
      font-size: 18px;
      font-weight: 400;
    }
    a {
      font-size: 14px;
      color: #000000de;
      text-decoration: none;
    }
  }
  </style>
  