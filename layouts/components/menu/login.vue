<template>
  <div class="d-flex">
  <v-card flat>
    <h3 class="text-center py-4 font-weight-bold" style="background-color: #14adac33">Log In</h3>
    <v-form lazy-validation v-model="valid" ref="login" class="pa-8">
      <v-text-field v-model="form.email" outlined @keypress.native.enter="$refs.login.validate() ? login() : null"
        required :rules="emailRules" placeholder="Phone or email"></v-text-field>
      <v-text-field :type="showPass ? 'text' : 'password'" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPass = !showPass" v-model="form.password"
        @keypress.native.enter="$refs.login.validate() ? login() : null" required :rules="passwordRules"
        placeholder="Please enter your password" outlined>
      </v-text-field>
        
      <div class="d-flex justify-space-between py-0">
        <v-checkbox>
          <template v-slot:label>
            <span class="my-0 text-caption">Remember me</span>
          </template>
        </v-checkbox>
        <nuxt-link to="/forgot-password" class="text-caption mt-4 text-decoration-none" style="color: red">Forgot
          Password?</nuxt-link>
      </div>
      <div class="text-center px-12 text-caption mb-4">
        <v-btn :loading="loading" @click="$refs.login.validate() ? login() : null" large text
          class="primary br-all-10" style="width: 200px !important">Sign In</v-btn>
      </div>
      <div class="text-center px-2 text-caption">
        By Clicking “Sign in” you certify that you agree to Paxo Beauty’s <br />
        <span class="font-weight-bold"><a href="/terms-condition" class="text-decoration-none text-black">Terms and Conditions</a></span> and
        <span class="font-weight-bold"><a href="/privacy-policy" class="text-decoration-none text-black">Privacy Policy.</a></span>
      </div>
    </v-form>
    <div class="text-center py-4 text-caption" style="background-color: #14adac33">
      Don't have an account?
      <a @click="clickRegister"><span class="font-weight-bold text-caption text-decoration-none"
          style="color: black">Sign
          Up</span></a><br />
    </div>
  </v-card>
    <span @click="closeAllPopUp()" class="cursor-pointer"><CloseIcon  class="ml-5" /></span>
  </div>
</template>
<script>
import mixpanel from 'mixpanel-browser'
import CloseIcon from '../../../components/icons/close.vue'
export default {
  transition: 'default',
  middleware: 'isauth',
  props: ['clickRegister', "closeAllPopUp"],
  components: { CloseIcon },
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
      showPass: false,
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

          mixpanel.init('e8933091d8272d61b9c4c16a619ab0e2', {
            track_pageview: true,
          })
          mixpanel.track('Sign in', {
            user_email: this.form.email,
          })

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

          this.closeAllPopUp();
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
<style lang="scss">
.v-sheet.v-card {
  border-radius: 10px;
}
.cursor-pointer {
  cursor: pointer !important;
}
</style>
