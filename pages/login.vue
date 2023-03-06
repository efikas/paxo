<template>
  <div>
    <v-container :pa-16="$vuetify.breakpoint.mdAndUp">
      <v-row justify="center" align="center">
        <v-col md="5">
          <div class="text-center py-5">
            <p>
              <nuxt-link
                :to="
                  '/login' +
                  ($route.query.next ? '?next=' + $route.query.next : '')
                "
                >Login</nuxt-link
              >
              <nuxt-link
                :to="
                  '/register' +
                  ($route.query.next ? '?next=' + $route.query.next : '')
                "
                class="ml-6 black--text"
                >Register</nuxt-link
              >
            </p>
          </div>
          <v-card flat class="pa-8">
            <p>Log In Your Account</p>
            <v-form lazy-validation v-model="valid" ref="login">
              <v-text-field
                v-model="form.email"
                outlined
                @keypress.native.enter="$refs.login.validate() ? login() : null"
                required
                :rules="emailRules"
                placeholder="Phone or email"
              ></v-text-field>
              <v-text-field
                type="password"
                v-model="form.password"
                @keypress.native.enter="$refs.login.validate() ? login() : null"
                required
                :rules="passwordRules"
                placeholder="Please enter your password"
                outlined
              ></v-text-field>
              <v-checkbox label="Remember me" class="my-0"></v-checkbox>
              <v-btn
                block
                :loading="loading"
                @click="$refs.login.validate() ? login() : null"
                large
                text
                class="primary mb-4"
                >Login</v-btn
              >
              <div class="text-center">
                <nuxt-link to="/forgot-password">Forgot Password</nuxt-link
                ><br />
              </div>
              <!-- <v-btn
                class="red mt-4"
                @click="loginWithGoogle()"
                dark
                text
                large
                block
                ><v-icon small>fab fa-google</v-icon>&nbsp;Login with
                Google</v-btn
              >
              <v-btn @click="loginWithFacebook()" class="mt-4 btn-fb" dark text large block
                ><v-icon small>fab fa-facebook-f</v-icon>&nbsp;Login with
                Facebook</v-btn
              >
              <v-btn class="btn-twitter mt-4" dark text large block
                ><v-icon small>fab fa-twitter</v-icon>&nbsp;Login with
                Twitter</v-btn
              > -->
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  transition: 'default',
  middleware: 'isauth',
  data() {
    return {
      emailRules: [
        (v) => !!v || 'Please enter your phone number or email',
        // (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) => v.length >= 8 || 'Password must be at least eight characters',
      ],
      loading: false,
      valid: true,
      form: { password: '' },
    }
  },
  methods: {
    async login() {
      this.loading = true
      await this.$store
        .dispatch('auth/login', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false

          if (this.$route.query.next) {
            this.$router.push('/' + this.$route.query.next)
          } else if (
            response.data.user.role == 'admin' ||
            response.data.user.role == 'superadmin'
          ) {
            this.$router.push('/admin/dashboard')
          } else {
            this.$router.push('/')
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    loginWithGoogle() {
      this.$auth.loginWith('google')
    },
    loginWithFacebook() {
      this.$auth.loginWith('facebook').then((response) => {
        //console.log(response)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  a {
    font-size: 30px;
    font-weight: 600;
    color: #666;
    text-decoration: none;
  }
}
.btn-fb {
  background: #1877f2;
}
.btn-twitter {
  background: #1da1f2;
}
</style>
