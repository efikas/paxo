<template>
    <div
        fixed
        style="height: 50px; position: fixed; z-index: 1; width: 100%"
        flat
        class="
          white
          px-3
          d-lg-flex d-md-flex
          justify-space-between
          align-center
          second-nav
          hidden-sm-and-down
        "
      >
        <v-menu
          open-on-hover
          bottom
          v-model="showBrand"
          offset-y
          :close-on-content-click="false"
          origin="top left"
          open-delay="500"
          max-width="100vw"
          class="elevation-0"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn class="nav-btn-brand px-3" v-bind="attrs" v-on="on" text>
              Brands</v-btn
            >
          </template>

          <v-list
            dense
            flat
            style="width: 100vw"
            min-height="400px"
            max-height="400px"
            class="py-0 elevation-0"
          >
            <v-row>
              <v-col cols="12" class="pa-8">
                <div class="d-flex justify-space-between">
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
                <v-divider></v-divider>
              </v-col>
            </v-row>
            <div class="brands-container pa-10 pt-0">
              <div
                v-for="(i, index) in brandlength"
                :key="index"
                style="width: 300px"
                class="brands"
              >
                <div class="sub-menu">
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
        </v-menu>
        <v-menu
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
                  <p
                    class="primary--text font-weight-bold"
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
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
      console.log(startsWithN)
    },
  },
  watch: {
    isAuthenticated: function () {
      this.isAuthenticated ? null : window.location.reload()
    },
  },
  onIdle() {
    
  },
  onActive() {
    
  },
  computed: {
    ...mapGetters('products', ['StoreCart', 'cartItem']),
    ...mapGetters('auth', ['isAuthenticated', 'user']),

    brandlength() {
      return Math.ceil(this.brands.length / 7)
    },
  },
  mounted() {
   
  },

  beforeMount() {
    this.getbrands()
    this.getSections()
  },
  created() {
   
  },
}
</script>
<style lang="scss" scoped>

</style>
