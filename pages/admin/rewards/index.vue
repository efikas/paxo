<template>
<div>
 <v-overlay v-if="loading" :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
      color="white"
    ></v-progress-circular>
  </v-overlay>
  <v-container v-else py-16>
    <h2>Edit Rewards Content</h2>
    <v-divider class="py-6"></v-divider>
    <v-form lazy-validation v-model="valid" ref="form">
      <v-file-input
        @change="onImageSelect()"
        v-model="form.file"
        outlined
        label="Upload Featured Image"
        prepend-inner-icon="attach_file"
        prepend-icon=""
        required
        :rules="[(v) => !!v || 'Please upload featured image']"
      >
      </v-file-input>
      <v-img
        height="400"
        v-if="imagesrc"
        :src="imagesrc || form.featured_image "
      ></v-img>

      <client-only placeholder="loading...">
        <ckeditor-nuxt v-model="form.content" :config="editorConfig" />
      </client-only>
      <v-btn class="primary" block x-large @click="updateReward()" :loading="loading">Update</v-btn>
    </v-form>
  </v-container>
</div>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      form: {},
      imagesrc: null,
      loading: true
    }
  },
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  mounted() {
    this.getContent()
  },
  methods: {
    onImageSelect(e) {
      if (this.form.file) {
        const file = this.form.file
        this.imagesrc = URL.createObjectURL(file)
      } else {
        this.imagesrc = null
      }
    },
    async updateReward() {
      this.loading = true
      let formData = new FormData()
      formData.append('featured_image', this.form.file)
      formData.append('content', this.form.content)
      formData.append('id', this.form.id)
      await this.$store
        .dispatch('auth/updatereward', formData)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    async getContent() {
      await this.$store
        .dispatch('auth/rewardcontent')
        .then((response) => {
          this.form = response.data
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
