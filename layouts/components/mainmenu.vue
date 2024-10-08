<template>
  <div fixed
    style="height: 50px; position: fixed; z-index: 2; width: 100%; border-top: 2px solid rgba(16, 2, 2, 0.1) !important"
    flat class="
      white
      px-3
      py-0
      d-lg-flex d-md-flex
      justify-center
      align-center
      second-nav
      hidden-sm-and-down
    ">
    <v-menu open-on-click bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0 my-0">
      <template v-slot:activator="{ attrs, on }">

        <v-btn class="nav-btn px-3 pt-3" active-class="no-active" v-bind="attrs" v-on="on" text style="height: 50px">
          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 1.4484C0 1.27159 0.0702374 1.10203 0.195262 0.977001C0.320286 0.851977 0.489856 0.781738 0.666667 0.781738H11.3333C11.5101 0.781738 11.6797 0.851977 11.8047 0.977001C11.9298 1.10203 12 1.27159 12 1.4484C12 1.62522 11.9298 1.79478 11.8047 1.91981C11.6797 2.04483 11.5101 2.11507 11.3333 2.11507H0.666667C0.489856 2.11507 0.320286 2.04483 0.195262 1.91981C0.0702374 1.79478 0 1.62522 0 1.4484ZM11.3333 6.11507H3.33333C3.15652 6.11507 2.98695 6.18531 2.86193 6.31033C2.7369 6.43536 2.66667 6.60493 2.66667 6.78174C2.66667 6.95855 2.7369 7.12812 2.86193 7.25314C2.98695 7.37817 3.15652 7.44841 3.33333 7.44841H11.3333C11.5101 7.44841 11.6797 7.37817 11.8047 7.25314C11.9298 7.12812 12 6.95855 12 6.78174C12 6.60493 11.9298 6.43536 11.8047 6.31033C11.6797 6.18531 11.5101 6.11507 11.3333 6.11507ZM11.3333 11.4484H5.77778C5.60097 11.4484 5.4314 11.5186 5.30637 11.6437C5.18135 11.7687 5.11111 11.9383 5.11111 12.1151C5.11111 12.2919 5.18135 12.4615 5.30637 12.5865C5.4314 12.7115 5.60097 12.7817 5.77778 12.7817H11.3333C11.5101 12.7817 11.6797 12.7115 11.8047 12.5865C11.9298 12.4615 12 12.2919 12 12.1151C12 11.9383 11.9298 11.7687 11.8047 11.6437C11.6797 11.5186 11.5101 11.4484 11.3333 11.4484Z"
              fill="currentColor" />
          </svg>
          SHOP CATEGORIES
        </v-btn>
      </template>
      <div style="width: 100vw" flat class="
            white
            px-3 py-3
            d-lg-flex d-md-flex
            justify-center
            align-center
            second-nav
            hidden-sm-and-down another
          ">
        <v-menu v-for="(i, index) in sections.slice(0, 12)" :key="index" open-on-hover bottom offset-y
          :close-on-content-click="false" origin="top left" open-delay="500" max-width="100vw" nudge-left="0px"
          class="elevation-0" content-class="m5m menu-content">
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="nav-btn px-3 pt-3" active-class="no-active" :to="'/section/' + i.name + '?sectionId=' + i.id"
              v-bind="attrs" v-on="on" text>
              {{ i.name }}</v-btn>
          </template>

          <v-list dense flat style="width: 80vw; margin-right: 10%; left: 0px;" min-height="150px"
            class="pb-0 pt-0 mt-3 elevation-0">
            <v-row>
              <v-col cols="2"  style="background-color: #F0F0F0;" class="d-flex flex-column">
                <div v-for="(j, index) in i.category.filter((val, ind)=> ind % 3 == 1)" :key="index" class="px-8 pt-8 pb-3 flex-grow-1" style="width: 100%">
                  <!-- <p v-if="i.category.length == 0">No categories found</p> -->
                  <nuxt-link :to="'/category/' + j.name + '?categoryId=' + j.id"
                    style="text-decoration: none; margin-bottom: 0 !important">
                    <p class="primary--text font-weight-500" style="font-size: 13px">
                      {{ j.name }}
                    </p>
                  </nuxt-link>
                  <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
                    <nuxt-link :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id">{{ k.name }}</nuxt-link>
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex flex-column">
                <div v-for="(j, index) in i.category.filter((val, ind)=> ind % 3 == 2)" :key="index" class="px-8 pt-8 pb-3 flex-grow-1" style="width: 100%">
                  <!-- <p v-if="i.category.length == 0">No categories found</p> -->
                  <nuxt-link :to="'/category/' + j.name + '?categoryId=' + j.id"
                    style="text-decoration: none; margin-bottom: 0 !important">
                    <p class="primary--text font-weight-500" style="font-size: 13px">
                      {{ j.name }}
                    </p>
                  </nuxt-link>
                  <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
                    <nuxt-link :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id">{{ k.name }}</nuxt-link>
                  </div>
                </div>
              </v-col>
              <v-col style="background-color: #F0F0F0;" class="d-flex flex-column">
                <div v-for="(j, index) in i.category.filter((val, ind)=> ind % 3 == 0)" :key="index" class="px-8 pt-8 pb-3 flex-grow-1" style="width: 100%">
                  <!-- <p v-if="i.category.length == 0">No categories found</p> -->
                  <nuxt-link :to="'/category/' + j.name + '?categoryId=' + j.id"
                    style="text-decoration: none; margin-bottom: 0 !important">
                    <p class="primary--text font-weight-500" style="font-size: 13px">
                      {{ j.name }}
                    </p>
                  </nuxt-link>
                  <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
                    <nuxt-link :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id">{{ k.name }}</nuxt-link>
                  </div>
                </div>
              </v-col>
              <v-col cols="4"></v-col>
              <!-- <v-col
                  md="2"
                  v-for="(j, index) in i.category"
                  :key="index"
                  class="px-8 pt-8 pb-3"
                  :style="(index % 2 == 0)? 'background-color: #F0F0F0; height: 100%' : 'height: 100%'"
                >
                  <p v-if="i.category.length == 0">No categories found</p>
                  <nuxt-link
                    :to="'/category/' + j.name + '?categoryId=' + j.id"
                    style="text-decoration: none; margin-bottom: 0 !important"
                  >
                    <p
                      class="primary--text font-weight-500"
                      style="font-size: 13px"
                    >
                      {{ j.name }}
                    </p></nuxt-link
                  >
                  <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
                    <nuxt-link
                      :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id"
                      >{{ k.name }}</nuxt-link
                    >
                  </div>
                </v-col> -->
            </v-row>
          </v-list>
        </v-menu>
      </div>
    </v-menu>

    <!-- BRAND MENU -->
    <v-menu open-on-click bottom v-model="showBrand" offset-y :close-on-content-click="false" origin="top left"
      open-delay="500" max-width="100vw" nudge-left="0px" class="elevation-0" content-class="m5m menu-content">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-3" active-class="no-active" style="height: 50px" v-bind="attrs" v-on="on" text>
          BRANDS</v-btn>
      </template>

      <!-- <v-list
        dense
        flat
        style="width: 100vw; background-color: white; padding: 0px 0px !important;"
        min-height="400px"
        max-height="400px"
        class="py-0 px-0 elevation-0"
      > -->
      <div style="width:100%" class="
            white
            px-3 py-3
            d-lg-flex d-md-flex
            justify-center
            align-center
            second-nav
            hidden-sm-and-down
          ">
        <v-row class="py-0 px-0">
          <v-col cols="3" class="py-0 px-0">
            <!-- <div class="d-flex justify-space-between">
              <v-btn
                @click="orderedBrands = _.orderBy(brands, 'name')"
                icon
                small
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
            <v-divider></v-divider> -->
            <div height="400px">
              <div class="brands-container pa-10 pt-0">
                <div class="brands py-5">
                  <v-text-field style="width: 300px;" prepend-inner-icon="search" clearable v-model="filterText"
                    @input="filterBrands" placeholder="Search your brand">
                  </v-text-field>
                  <div class="sub-menu">
                    <div v-for="(j, _index) in filteredOrderedBrands" :key="j.id">
                      <div style="color: #14ADAC;" v-if="getAlphabetHeading(filteredOrderedBrands, _index) == true"> {{
                        j.name.charAt(0).toUpperCase() }}</div>
                      <a href="javascript:void(0)" class="nav-" @click="
                          ; (showBrand = false),
                        $router.push('/brands/' + j.name + '?brandId=' + j.id)
                        " style="
                          text-decoration: none;
                          margin-bottom: 0 !important;
                          color: black;
                        ">
                        <p class="" style="font-size: 13px">
                          {{ j.name }}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          <v-col cols="9" class="">
            <div class="search-container">
            </div>
          </v-col>
        </v-row>
      </div>
      <!-- </v-list> -->

    </v-menu>

    <v-menu open-on-hover bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-6" active-class="no-active" v-bind="attrs" v-on="on" text to="/deals"
          style="height: 50px">
          DEALS</v-btn>
      </template>
    </v-menu>
    <v-menu open-on-hover bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-6" active-class="no-active" style="height: 50px" v-bind="attrs" v-on="on" text
          to="/shop-all">
          SHOP ALL</v-btn>
      </template>
    </v-menu>
    <v-menu open-on-hover bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-6" active-class="no-active" v-bind="attrs" v-on="on" text to="/new"
          style="height: 50px">
          NEW</v-btn>
      </template>
    </v-menu>
    <v-menu open-on-hover bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-6" active-class="no-active" v-bind="attrs" v-on="on" text to="/skin-expert"
          style="height: 50px">
          SKIN EXPERT</v-btn>
      </template>
    </v-menu>
    <v-menu open-on-hover bottom offset-y origin="top left" open-delay="500" max-width="100vw" class="elevation-0">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="nav-btn px-3 pt-6" active-class="no-active" v-bind="attrs" v-on="on" text to="/paxo-reward"
          style="height: 50px">
          PAXO BEAUTY REWARD</v-btn>
      </template>
    </v-menu>
    <!-- <v-menu
      v-for="(i, index) in sections.slice(0, 12)"
      :key="index"
      open-on-hover
      bottom
      offset-y
      origin="top left"
      open-delay="500"
      max-width="100vw"
      class="elevation-0"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="nav-btn px-3 pt-3"
          :to="'/section/' + i.name + '?sectionId=' + i.id"
          v-bind="attrs"
          v-on="on"
          text
        >
          {{ i.name }}</v-btn
        >
      </template>

      <v-list
        dense
        flat
        style="width: 100vw"
        min-height="400px"
        class="pb-0 pt-8 elevation-0"
      >
        <v-row>
          <v-col
            md="2"
            v-for="(j, index) in i.category"
            :key="index"
            class="px-8 pt-0 pb-3"
          >
            <p v-if="i.category.length == 0">No categories found</p>
            <nuxt-link
              :to="'/category/' + j.name + '?categoryId=' + j.id"
              style="text-decoration: none; margin-bottom: 0 !important"
            >
              <p class="primary--text font-weight-bold" style="font-size: 13px">
                {{ j.name }}
              </p></nuxt-link
            >
            <div v-for="k in j.subcategory" :key="k.id" class="sub-menu">
              <nuxt-link
                :to="'/subcategory/' + k.name + '?subCategoryId=' + k.id"
                >{{ k.name }}</nuxt-link
              >
            </div>
          </v-col>
        </v-row>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ShopCat from '../../static/assets/svg/shop.svg';
export default {
  components: {
    ShopCat
  },
  data() {
    return {
      paymentMethodDialog: false,
      open1MinuteDialog: false,
      is1MinuteDue: false,
      showBrand: false,
      fab: false,
      drawer: null,
      fixed: false,
      sticky: false,
      searchDialog: null,
      pageloading: true,
      orderedBrands: [],
      filteredOrderedBrands: [],
      filterText: '',
      brands: [],
      brandsize: 7,
      sections: [],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      form: {},
      valid: true,
      loading: false,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'login',
          title: 'Sign in',
          to: '/login',
        },
        {
          icon: 'app_registration',
          title: 'Sign Up',
          to: '/register',
        },

        {
          icon: 'medication',
          title: 'Skin Expert',
          to: '/skin-expert',
        },
        {
          icon: 'trending_up',
          title: 'Track Order',
          to: '/track-order',
        },
        {
          icon: 'spa',
          title: 'About Us',
          to: '/about-us',
        },
        {
          icon: 'contact_support',
          title: 'Contact Us',
          to: '/contact-us',
        },
      ],
    }
  },
  methods: {
    close1MinuteDialog() {
      this.is1MinuteDue = false
      this.open1MinuteDialog = false
      this.paymentMethodDialog = false
    },
    getAlphabetHeading(mainList, currentIndex) {
      if (mainList.length < 1) {
        return false;
      } else if (currentIndex == 0) {
        return true;
      } else {
        if (
          mainList[currentIndex].name.charAt(0).toUpperCase() !=
          mainList[currentIndex - 1].name.charAt(0).toUpperCase()
        ) {
          return true;
        }
        return false;
      }
    },
    scroller() {
      if (window.scrollY > 500) {
        this.fab = true
      } else {
        this.fab = false
      }
    },
    stickyNav() {
      var position = document.documentElement.scrollTop

      document.addEventListener('scroll', function () {
        var scroll = document.documentElement.scrollTop
        // console.log(this.sticky)

        if (window.scrollY > 100) {
          this.sticky = true
        } else {
          this.sticky = false
        }
      })
    },
    async subscribeNewsletter() {
      this.loading = true
      await this.$store
        .dispatch('auth/subscribenewsletter', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    async getCategories() {
      await this.$store.dispatch('category').then((respnose) => {
        // this.categories =
      })
    },
    async getbrands() {
      await this.$store.dispatch('brand/all').then((response) => {
        this.brands = response.data
        // this.pageloading = false
        this.orderedBrands = _.orderBy(this.brands, 'name')
        this.filteredOrderedBrands = _.orderBy(this.brands, 'name')
      })
    },
    async getSections() {
      await this.$store.dispatch('section/all').then((response) => {
        this.sections = response.data
        this.pageloading = false
      })
    },
    getApp() {
      if (navigator.userAgent.match(/Android/i)) {
        window.location.href =
          'https://play.google.com/store/apps/details?id=com.paxo.shop'
      } else if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i)
      ) {
        window.location.href =
          'https://apps.apple.com/ng/app/paxo-beauty/id1534936621'
      }
    },
    sortBrands(alpha) {
      // this.orderedBrands = this.orderedBrands.filter((brand) => brand.name.startsWith(alpha))
      // console.log(this.orderedBrands)
      let startsWithN = this.brands.filter(function (brand) {
        return brand.name[0].toLowerCase() === alpha
      })
      this.orderedBrands = startsWithN
      this.filteredOrderedBrands = startsWithN
      // console.log(startsWithN)
    },

    filterBrands: function (event) {
      if (this.filterText == null || this.filterText.length == 0) {
        this.filteredOrderedBrands = [...this.orderedBrands];
      }
      else {
        this.filteredOrderedBrands = [...this.orderedBrands.filter((brand) => brand.name.toLowerCase().includes(this.filterText.toLowerCase()))]
      }

    },
  },
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated ? null : window.location.reload()
    },
  },
  onIdle() { },
  onActive() { },
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),

    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },
  },
  mounted() { },

  beforeMount() {
    this.getbrands()
    this.getSections()
  },
  created() { },
}
</script>
<style lang="scss" scoped>
.nav-btn {
  color: #000;
  background: none !important;
  display: block;
  font-size: 13px;
  cursor: pointer;
  font-weight: 400;
  border-radius: 0;

  &-brand {
    border: 1px solid #000;
  }

  &:hover {
    border-bottom: 3px solid #36bdb4;
    color: #36bdb4;
  }

  &:hover::before {
    background: transparent !important;
  }

  // &:active {
  //   border-bottom: 3px solid #36bdb4;
  //   color: #36bdb4;
  //   background: transparent !important;
  // }
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
  background: none !important;
}

.nav-btn-small {
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #ff4e50;
  }
}

.v-btn--active {
  border-bottom: 3px solid #36bdb4 !important;
  color: #36bdb4 !important;
  background: none !important;
}

.sub-menu a {
  text-decoration: none;
  color: #000;
  font-size: 14px;

  &:hover {
    color: #ff4e50;
  }
}

.brands-container {
  display: flex;
  flex-flow: row;
  background-color: #F0F0F0 !important;
  height: 400px;
  // min-height: 1000px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  overflow-x: scroll !important;

  .brands {
    flex: 0 0 auto;
  }
}

.menu-content {
  width: 80% !important;
  margin-right: 10% !important;
  margin-left: 10% !important;
  left: 0px !important;
}
</style>
