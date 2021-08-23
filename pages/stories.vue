<template>
  <v-container fluid>
    <h2 class="text-center my-8">Our Blogs</h2>
    <v-row
      :class="{
        'px-8': $vuetify.breakpoint.mdAndUp,
        'px-4': $vuetify.breakpoint.smAndDown,
      }"
    >
      <v-col md="3" v-for="i in blogs" :key="i">
      <nuxt-link :to="'/blog/' + i.title + '?blogid=' + i.id">
        <v-img
          @click="$router.push('/blog/' + i.title + '?blogid=' + i.id)"
          class="blog-container"
          :src="i.avatar"
          height="320"
        >
          <div class="blog-title white--text">
            <p class="font-weight-bold">{{ i.title }}</p>
            <v-btn
              :to="'/blog/' + i.title + '?blogid=' + i.id"
              class="primary"
              small
              text
              >Read More</v-btn
            >
          </div>
        </v-img>

      </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      blogs: [],
    }
  },
  mounted() {
    this.getblogs()
  },
  methods: {
    async getblogs() {
      this.loading = true
      await this.$store.dispatch('blog/all').then((response) => {
        this.blogs = response.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
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
