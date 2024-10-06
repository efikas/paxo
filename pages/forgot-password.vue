<template>
<v-container>

  <v-layout row wrap justify-center align-center>
    <v-flex md5 py-16>
      <v-card flat outlined class="pa-6">
        <div class="text-center">
          <h2>Forgot Password</h2>
          <p>Kindly enter your email address below to recover your password</p>

          <v-form lazy-validation ref="form" v-model="valid">
            <v-text-field label="Email" outlined class="mt-8" v-model="form.email" required :rules="[v=>!!v || 'Please enter your email']">

            </v-text-field>
            <v-btn class="primary" text block large @click="$refs.form.validate() ? forgotPassword() : null" :loading="loading">Submit</v-btn>
          </v-form>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>
<script>
export default {
  data () {
    return {
      form:{},
      loading: false,
    }
  },
  methods: {
    async forgotPassword () {
      this.loading = true
      await this.$store.dispatch('auth/forgotpassword',this.form).then(response => {
        this.$toast.success(response.message)
        this.$refs.form.reset()
        this.loading = false
      }).catch(error => {
        this.$toast.error(error.response.data.message)
        this.loading = false
      })
    }
  }
}
</script>
