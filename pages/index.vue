<template>
  <div>
    <v-row>
      <v-col md="12">
        <home-page-slider></home-page-slider>
      </v-col>
    </v-row>
    <v-row :class="{'px-8':$vuetify.breakpoint.mdAndUp}" >
      <v-col md="6" v-for="i in banners.slice(banners.length - 2, banners.length + 2)" :key="i.id">
        <v-img
          @click="$router.push('/banners/'+i.slug+'?t=Offers&bannerId='+i.id)"
          class="brands-img elevation-2"
          :class="{'h-350' : $vuetify.breakpoint.mdAndUp, 'h-200' : $vuetify.breakpoint.smAndDown}"
          :src="i.avatar" 
          @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660830145/Offer_Banner_1b_ugnb6t.png"
          
        ></v-img>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col md="10">
        <nuxt-link to="/offers">
        <v-img
          class="brands-img"
          :src="require('../static/assets/banner.jpeg')"
          @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660830145/Offer_Banner_1b_ugnb6t.png"
          
        ></v-img>

        </nuxt-link>
      </v-col>
    </v-row>
    
   <v-row class="mt-10 " :class="{'px-8':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <v-col md="6" cols="9" class="py-0 ma-0">
        <p class="deal-text">Deal of the Day</p>
      </v-col>
      <v-col md="6" cols="3" class="text-right py-0 ma-0">
        <v-btn class="primary" text to="/offers" small>View All</v-btn>
      </v-col>
      <!-- <v-col md="12" class="py-0 ma-0">
        <v-divider></v-divider>
      </v-col> -->
    </v-row>
    <!-- <v-row :class="{'px-8':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <v-col
        md="2"
        sm="4"
        cols="6"
        v-for="i in 18"
        :key="i"
        v-if="products.length == 0"
      >
        <v-skeleton-loader type="card"> </v-skeleton-loader>
      </v-col>
      <v-col cols="6" sm="4" md="2" v-for="(i, index) in products" :key="index">
        <v-skeleton-loader type="card" v-if="products.length == 0" lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660750038/logo9_auto_x5_gsrixv.png">
        </v-skeleton-loader>
        <product-display
          :vendor="i.brand ? i.brand.name : null"
          :product_name="i.name"
          rating="5"
          :price="i.price"
          :image="i.avatar"
          :badge="i.stock_status"
          :description="i.description"
          :short_description="i.short_description"
          :product_object="i"
          :product_id="i.id"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660830145/Offer_Banner_1b_ugnb6t.png"
        />
      </v-col>
    </v-row> -->

   <div class="d-flex justify-space-between" style="position: absolute; margin-top: 200px; z-index: 1; width: 100vw;">
      <v-btn class="primary" dark icon @click="scrollRightDeal()"><v-icon>arrow_back</v-icon> </v-btn>
      <v-btn icon class="primary" dark @click="scrollLeftDeal()"><v-icon>arrow_forward</v-icon> </v-btn>
    </div>
    <div class="pa-6 mt-0 top-products-container"  :class="{'px-6':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <!-- <p class="deal-text">Top Products</p> -->
      <div class="top-products" id="dealday" style="position: relative;">
        <v-card
          width="200"
          flat
          class="mx-4 product"
          v-for="i in 15"
          :key="i"
          v-if="products.length == 0"
        >
          <v-skeleton-loader type="card"> </v-skeleton-loader>
        </v-card>
        <div
          class="mx-0 product"
          v-for="(i, index) in products.slice(0, 10)"
          :key="index"
        >
          <product-display v-if="i"
            :vendor="i.brand ? i.brand.name : null"
            :product_name="i.name"
            rating="5"
            :price="i.price"
            :regular_price="i.regular_price"
            :wholesale_price="i.wholesale_price"
            :image="i.avatar"
            :badge="i.stock_status"
            :description="i.description"
            :short_description="i.short_description"
            :product_object="i"
            :product_id="i.id"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-space-between" style="position: absolute; margin-top: 200px; z-index: 1; width: 100vw;">
      <v-btn class="primary" dark icon @click="scrollRight()"><v-icon>arrow_back</v-icon> </v-btn>
      <v-btn icon class="primary" dark @click="scrollLeft()"><v-icon>arrow_forward</v-icon> </v-btn>
    </div>
    <div class="pa-6 mt- top-products-container"  :class="{'px-6':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <p class="deal-text">Top Products</p>
      <div class="top-products" id="topproducts" style="position: relative;">
        <v-card
          width="200"
          flat
          class="mx-4 product"
          v-for="i in 15"
          :key="i"
          v-if="topproducts.length == 0"
        >
          <v-skeleton-loader type="card"> </v-skeleton-loader>
        </v-card>
        <div
          class="mx-0 product"
          v-for="(i, index) in topproducts"
          :key="index"
        >
          <product-display
            :vendor="i.brand ? i.brand.name : null"
            :product_name="i.name"
            rating="5"
            :price="i.price"
            :regular_price="i.regular_price"
            :wholesale_price="i.wholesale_price"
            :image="i.avatar"
            :badge="i.stock_status"
            :description="i.description"
            :short_description="i.short_description"
            :product_object="i"
            :product_id="i.id"
          />
        </div>
      </div>
    </div>


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





    <!-- <v-row :class="{'px-8':$vuetify.breakpoint.mdAndUp}">
      <v-col md="4" v-for="i in brands.slice(11, 40)" :key="i.id">
        <v-img
          @click="$router.push('/brands/'+i.name+'?brandId='+i.id)"
          class="brands-img elevation-2"
          height="250" :class="{ 'h-200' : $vuetify.breakpoint.smAndDown}"
          :src="i.avatar"
          @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660750038/logo9_auto_x5_gsrixv.png"
        ></v-img>
      </v-col>
    </v-row> -->

    <div style="background-color: #f5f5f5" class=" py-16 mt-7" :class="{'pa-10':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <h3 style="font-size: 20px; font-weight: 400">TOP BRANDS</h3>
      <v-row class="mt-6">
        <v-col v-for="i in topbrands" :key="i" md="3" cols="12">
          <v-card class="pa" height="99.4" flat :to="'/brands/'+i.name+'?brandId='+i.brand_id">
            <v-img
              class="brands-img"
              height="95"
              contain
              width="100%"
              :src="i.avatar"
              @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
              lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660830349/Brand_Banner_1b_gax3tp.png"
          
            >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    

    <div style="background-color: #f5f5f5" class="pa-10 py-16 mt-7" :class="{'px-10':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <h3 style="font-size: 20px; font-weight: 400">TOP CATEGORIES</h3>
      <v-row class="mt-6">
        <v-col v-for="i in categories.slice(0,8)" :key="i" :class="{'mt-4':$vuetify.breakpoint.mdAndUp}" md="3" cols="12">
          <v-card class="pa-5 cat-card" flat :to="'/category/' + i.name + '?categoryId=' + i.id">
            <v-row justify="center" align="center">
              <v-col cols="8">
                <p class="mt-2">{{i.name}}</p>
              </v-col>
              <v-col class="text-right">
                <v-icon small color="#ff4e50">arrow_forward_ios</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-row class="pa-8" :class="{'px-8':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <v-col md="6">
        <h3 style="font-size: 20px; font-weight: 400">TOP STORIES</h3>
      </v-col>
      <v-col class="text-right">
        <v-btn text class="primary" to="/stories">Visit Our Blog</v-btn>
      </v-col>
    </v-row>
    <v-row :class="{'px-8':$vuetify.breakpoint.mdAndUp,'px-4':$vuetify.breakpoint.smAndDown}">
      <v-col md="3" v-for="i in blogs.slice(0,4)" :key="i">
      <nuxt-link :to="'/blog/'+i.title+'?blogid='+i.id">
        <v-img
          class="blog-container"
          :src="i.avatar" height="320"
          @error="$event.target.src='../static/assets/paxo_icon_logo.png'"
          lazy-src="https://res.cloudinary.com/spectrina/image/upload/v1660831137/Icon_1b_f5502u.png"
          
        >
          <div class="blog-title white--text">

            <p class="font-weight-bold">{{i.title}}</p>
            <v-btn :to="'/blog/'+i.title+'?blogid='+i.id" class="primary" small text>Read More</v-btn>
          </div>
        </v-img>

      </nuxt-link>
      </v-col>
    </v-row>

    <v-row class="mt-16 py-16 download-app" id="download" >
      <!-- <v-col class="pb-0">
        <img src="../static/assets/app.png" alt="" />
      </v-col> -->
      <v-col md="12" class="pb-0">
        <div class="text-center">
          <h3>Download Paxo App Now!</h3>
          <p class="text-center">
            Shopping fastly and easily more with our app.<br> Get a link to download
            the app on your phone
          </p>


          <a href="https://play.google.com/store/apps/details?id=com.paxo.shop" target="_blank" rel="noopener noreferrer">
            <img src="../static/assets/google-play.png" alt="" />
          </a>
          <a href="https://apps.apple.com/ng/app/paxo-beauty/id1534936621" class="ml-5" target="_blank" rel="noopener noreferrer">
            <img src="../static/assets/appstore.png" alt="" />
          </a>

        </div>
      </v-col>
    </v-row>
    <div class="section-header mt-16">
      <h3>Hot New Arrivals</h3>
    </div>
    <v-row class="mt-6">
      <v-col class="text-left" md="3" cols="12" v-for="(i, index) in new_products.slice(0, 9)" :key="index">
        <new-arrival
          :product_name="i.product.name"
          :price="i.product.price"
          :image="i.product.avatar"
          :id="i.product.id"
        />
      </v-col>
    </v-row>

  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import ProductDisplay from '@/components/ProductDisplay'
import HomePageSlider from '@/components/HomePageSlider'
import NewArrival from '~/components/NewArrival.vue'

export default {
  transition: 'default',
  components: {
    ProductDisplay,
    NewArrival,
    HomePageSlider,
    
  },
  data() {
    return {
      page: 1,
      length: 1,
      products: [],
      new_products: [],
      topproducts: [],
      brands: [],
      adminBrands: [],
      topbrands: [],
      loading: true,
      blogs: [],
      categories: [],
      banners: []
      
    }
  },
  computed: {
    ...mapGetters('auth', ['user', 'isAuthenticated']),
  },
  mounted() {
    this.getProducts()
    this.getNewProducts()
    this.getTopProducts()
    this.getblogs()
    this.getTopBrands()
    this.getTopCategories()
    this.getbrands()
    this.getadminBrands()
    this.getBanners()
    this.fetchCart()

  },
  methods: {
     scrollLeft() {
      var elmnt = document.getElementById('topproducts')
      elmnt.scrollLeft += 700
    },
    scrollRight() {
      var elmnt = document.getElementById('topproducts')
      elmnt.scrollLeft -= 700
    },
    scrollLeftDeal() {
      var elmnt = document.getElementById('dealday')
      elmnt.scrollLeft += 700
    },
    scrollRightDeal() {
      var elmnt = document.getElementById('dealday')
      elmnt.scrollLeft -= 700
    },
    async getBanners() {
      this.loading = true
      await this.$store.dispatch('banner/allbanner').then((response) => {
        this.banners = response.data

      })
    },
    async getTopCategories() {
      await this.$store.dispatch('category/top').then((response) => {
        this.categories = response.data
      })
    },
    async getTopBrands() {
      this.loading = true
      await this.$store.dispatch('topbrands/all').then((response) => {
        this.topbrands = response.data
        this.loading = false
      })
    },
    async getblogs() {
      this.loading = true
      await this.$store.dispatch('blog/all').then((response) => {
        this.blogs = response.data

      })
    },

    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
        this.loading = false
      })
    },
    async getadminBrands() {
      await this.$store.dispatch('brand/allBrands').then((response) => {
        this.adminBrands = response.data
        this.loading = false
      })
    },
    async fetchCart(){
      if(this.isAuthenticated){
        this.$store
          .dispatch('products/fetchcart')
      }
    },
    async getProducts() {
      const data = {
        page: this.page,
      }
      await this.$store.dispatch('products/offers', data).then((response) => {
        this.products = response.data.data
        this.length = response.data.last_page
      })
    },
    async getNewProducts() {
      const data = {
        page: this.page,
        category: '',
        brand: '',
        price: ''
      }
      await this.$store.dispatch('products/all', data).then((response) => {
        this.new_products = response.data.data
        this.length = response.data.last_page
      })
    },
    // async getTopProducts() {
    //   const data = {
    //     page: this.page,
    //   }
    //   await this.$store.dispatch('products/topproducts', data).then((response) => {
    //     this.products = response.data.data
    //     this.length = response.data.last_page
    //   })
    // },
    async getTopProducts() {
      await this.$store.dispatch('products/topproducts').then((response) => {
        this.topproducts = response.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.features-box {
  border: 1px solid #d9d9d9;
  .feature-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 0;
    margin-top: 0;
    color: #000;
  }
  .feature-description {
    font-size: 14px;
    color: #666;
  }
}
.deal-text {
  margin-bottom: 0;
  font-size: 24px;
  font-weight: 400;
  margin-right: 70px;
}

.download-app {
  background-color: #f8f8f8;
  h3 {
    margin-bottom: 12px;
    font-size: 30px;
    font-weight: 300;
    margin-top: 0;
  }
  p {
    font-size: 16px;
    color: #666;
    // max-width: 400px;
  }
}
.section-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #e3e3e3;
  h3 {
    margin-bottom: 0;
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    line-height: 1;
  }
}
.top-products-container {
  // border: 1px solid #f5eeee;
  .top-products {
    display: flex;
    flex-flow: row;
    min-height: 392px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: scroll !important;
    .product {
      flex: 0 0 auto;
    }
  }
}
.brands-img,
.cat-card {
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    color: #ff4e50;
  }
}
.blog-container {
  text-align: left;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  position: relative;
  margin: 0 auto 20px;
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 20%);
  transition: box-shadow 0.4s;
  .blog-title {
    background: linear-gradient(0deg, #000, transparent);
    position: absolute;
    bottom: 0;
    text-align: center;
    padding: 13% 2% !important;
    width: 100%;
    z-index: 1;
  }
}

</style>
