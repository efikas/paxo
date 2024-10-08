<template>
  <div>
    <v-container :pa-16="$vuetify.breakpoint.mdAndUp">
      <v-row justify="center" align="center">
        <v-col md="6">
          <!-- <div class="text-center py-5">
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
          </div> -->
          <v-card flat >
            <!-- <p>Log In Your Account</p> -->
            <h3 class="text-center py-4" style="background-color: #14ADAC33;">Log In</h3>
            <v-form lazy-validation v-model="valid" ref="login" class="pa-8">
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
              <div class="d-flex justify-space-between">
                <v-checkbox label="Remember me" class="my-0 text-caption"></v-checkbox>
                <nuxt-link to="/forgot-password" class="text-captionk my-1 text-decoration-none">Forgot Password</nuxt-link>
              </div>
              <div class="text-center px-12 text-caption">
              <v-btn
                block
                :loading="loading"
                @click="$refs.login.validate() ? login() : null"
                large
                text
                class="primary mb-4 br-all-5"
                >Login</v-btn
              >
            </div>
            <div class="text-center px-2 text-caption">
          By Clicking “Sign in” you certify that you agree to Paxo Beauty’s <span class="font-weight-bold">Terms and Conditions</span> and
          <span class="font-weight-bold">Privacy Policy.</span></div> 
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
            <div class="text-center py-4 text-caption" style="background-color: #14ADAC33;">
            Don't have an account? <nuxt-link :to="
                  '/register' +
                  ($route.query.next ? '?next=' + $route.query.next : '')
                "><span class="font-weight-bold text-caption text-decoration-none" style="color: black;">Sign Up</span></nuxt-link
            ><br />
          </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import mixpanel from "mixpanel-browser";

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

          mixpanel.init("e8933091d8272d61b9c4c16a619ab0e2", {track_pageview: true});
          mixpanel.track("Sign in", {
            user_email: this.form.email,
          });

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
