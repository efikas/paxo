import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  loading: '~/components/loading.vue',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - paxo',
    title:
      'Paxo Health & Beauty | Your Online Beauty Store - Shop Affordable Cosmetics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Shop Affordable Cosmetic Products',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik:100,200,300,400,500,600,700|Material+Icons',
        //https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik',
        //https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css',
      },
    ],
    script: [
      {
        src: '/tagmanager.js',
      },
    ],
    script: [
      {
        src: '/fbpixelcode.js',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss',
    'remixicon/fonts/remixicon.css',
    '~/assets/tailwind.css',
  ],
  styleResources: {
    scss: '~/assets/scss/variables.scss'
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~plugins/ckeditor', ssr: false },
    { src: '~/plugins/flutterwave.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/print.js', ssr: false },
    { src: '~/plugins/idle.js', ssr: false }, 
    // { src: '~/plugins/vue-meta.js', ssr: true },
    '~/plugins/gtm',
    // '~/plugins/vue-tel-input',
    '~/plugins/filters',
    '~/plugins/lodash',
    '~/plugins/clipboard',
    '~/plugins/datepicker',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    [
      'vue-toastification/nuxt',
      {
        timeout: 3000,
        draggable: false,
      },
    ],
    'vue-scrollto/nuxt',

    // Or if you have custom options...
    // ['vue-scrollto/nuxt', { duration: 300 }],
  ],

  // auth: {
  //   strategies: {
  //     google: {
  //       clientId: '868398341408-kva0c9jac4t1hnh3b52i4aj38poo03sq.apps.googleusercontent.com',
  //     },
  //     facebook: {
  //       endpoints: {
  //         userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,first_name,last_name,email,picture{url}'
  //       },
  //       clientId: '3571599042963459',
  //       scope: ['public_profile', 'email']
  //     },
  //   },
  // },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // baseURL: 'https://paxo.masterworkscaraross.io/api/v1',
    baseURL: 'https://staging-api.paxobeauty.com/api/v1',
    // baseURL: 'https://api.paxobeauty.com/api/v1',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#36bdb4',
          accent: '#777777',
          secondary: '#ff4e50',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        // {
        //   name: 'custom',
        //   path: '*',
        //   component: resolve(__dirname, 'pages/404.vue'),
        // },
        {
          name: 'category',
          path: '/category/*',
          component: resolve(__dirname, 'pages/category.vue'),
        },
        {
          name: 'section',
          path: '/section/*',
          component: resolve(__dirname, 'pages/section.vue'),
        },
        {
          name: 'subcategory',
          path: '/subcategory/*',
          component: resolve(__dirname, 'pages/subcategory.vue'),
        },
        {
          name: 'brand products',
          path: '/brands/*',
          component: resolve(__dirname, 'pages/brand.vue'),
        },
        {
          name: 'banner products',
          path: '/banners/*',
          component: resolve(__dirname, 'pages/banners.vue'),
        },
        {
          name: 'single blog',
          path: '/blog/*',
          component: resolve(__dirname, 'pages/single-blog.vue'),
        }
      )
    },
  },
  serverMiddleware: [
    {
      // path: '/',
      handler: (req, res, next) => {
        const paths = ['/single-product']
        // console.log(req.originalUrl)
        // console.log(res);

        if (paths.includes(req.originalUrl)) {
          // Will trigger the "traditional SPA mode"
          res.spa = false
        }
        next()
      },
    },
  ],
}
