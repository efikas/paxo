<template>
  <v-container py-16>
    <h2>Edit Rewards Content</h2>
    <v-divider class="py-6"></v-divider>
    <client-only placeholder="loading...">
      <ckeditor-nuxt v-model="form.description" :config="editorConfig" />
    </client-only>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  mounted () {
    this.getContent()
  },
  methods: {
    async getContent() {
      await this.$store.dispatch('auth/rewardcontent').then(response => {
        this.form.description = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
