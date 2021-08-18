<template>
  <v-container py-16>
    <h1 class="text-center">{{singleblog.title}}</h1>
    <p style="opacity: 0.5" class="text-center mt-5">{{singleblog.created_at | formatDate}}</p>
    <v-img :src="singleblog.avatar" height="400">

    </v-img>
    <div v-html="singleblog.description" class="mt-8" >

    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      singleblog: [],
    }
  },
  mounted () {
    this.getSingleBlog()
  },
  methods: {
    async getSingleBlog() {
      const data = {
        page: this.page,
        id: this.$route.query.blogid,
      }
      await this.$store.dispatch('blog/singleblog', data).then((response) => {
        response.data ? (this.singleblog = response.data) : null
      })
    },
  },
}
</script>
