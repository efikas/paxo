<template>
  <v-container>
    <v-layout row wrap justify-center align-center>
      <v-flex md5 py-16>
        <v-card flat outlined class="pa-6">
          <div class="text-center">
            <h2>Reset Password</h2>
            <p>Please reset your password below</p>

            <v-form lazy-validation ref="form" v-model="valid">
              <v-text-field
                label="New Password"
                type="password"
                outlined
                class="mt-8"
                v-model="form.password"
                required
                :rules="[(v) => !!v || 'This field is required']"
              >
              </v-text-field>
              <v-text-field
                label="Confirm Password"
                type="password"
                outlined
                class="mt-8"
                v-model="form.password_confirmation"
                required
                :rules="passwordRules"
              >
              </v-text-field>
              <v-btn
                class="primary"
                text
                block
                large
                @click="$refs.form.validate() ? resetPassword() : null"
                :loading="loading"
                >Submit</v-btn
              >
            </v-form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      form: {password:''},
      loading: false,
      passwordRules: [
      (v) => !!v || 'This field is required',
      (v) => v == this.form.password
      ]
    }
  },
  methods: {
    async resetPassword() {
      this.loading = true
      this.form.token = this.$route.query.token
      this.form.email = this.$route.query.email
      await this.$store
        .dispatch('auth/resetpassword', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.$refs.form.reset()
          this.loading = false
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
  },
}
</script>
