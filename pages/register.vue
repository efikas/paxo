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
            <p>Register an Account</p>
            <v-form lazy-validation v-model="valid" ref="register">
              <v-text-field
                outlined
                required
                v-model="form.full_name"
                :rules="(v) => !!v || 'This field is required'"
                placeholder="Jane Thomas"
              ></v-text-field>
              <!-- <v-text-field
                outlined
                required
                v-model="form.last_name"
                :rules="(v) => !!v || 'This field is required'"
                placeholder="Last Name"
              ></v-text-field> -->
              <v-text-field
                outlined
                required
                @input="phoneerror = ''"
                :error-messages="phoneerror"
                v-model="form.mobile"
                :rules="(v) => !!v || 'This field is required'"
                placeholder="Mobile"
              ></v-text-field>
              <v-text-field
                outlined
                required
                @input="emailerror = ''"
                :error-messages="emailerror"
                v-model="form.email"
                :rules="emailRules"
                placeholder="Email address"
              ></v-text-field>
              <!-- <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    required
                    :rules="[(v) => !!v || 'Date of birth  is required']"
                    :value="form.dob"
                    clearable
                    placeholder="Date of Birth"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  light
                  v-model="form.dob"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu> -->
              <v-select
                outlined
                :items="[
                  { text: 'Male', value: 'male' },
                  { text: 'Female', value: 'female' },
                  { text: 'Others', value: 'others' },
                ]"
                v-model="form.sex"
                placeholder="Gender"
                required
                :rules="[(v) => !!v || 'This field is required']"
              ></v-select>
              <v-text-field
                type="password"
                placeholder="Password"
                outlined
                v-model="form.password"
                required
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                outlined
                required
                v-model="form.password_confirmation"
                :rules="passwordConfirmRules"
                placeholder="Confirm Password"
                type="password"
              ></v-text-field>

              <v-btn
                block
                :loading="loading"
                @click="$refs.register.validate() ? register() : null"
                large
                text
                class="primary mb-4"
                >Register</v-btn
              >
              Already have an account? <nuxt-link to="/login">Login</nuxt-link>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  transition: 'default',
  data() {
    return {
      menu1: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) => v.length >= 8 || 'Password must be at least eight characters',
      ],
      passwordConfirmRules: [
        (v) => !!v || 'Password Confirmation is required',
        (v) => v == this.form.password || 'The two passwords must match',
      ],
      loading: false,
      valid: true,
      emailerror: '',
      phoneerror: '',
      form: {
        password: '',
        role: 'user',
        referred_by: this.$route.query.ref || '',
        referral_id: '',
      },
    }
  },
  computed: {
    ...mapGetters('products', ['referal']),
  },
  mounted() {
    this.form.referred_by = this.$route.query.ref
      ? this.$route.query.ref
      : this.referal
  },
  methods: {
    async register() {
      this.loading = true
      ;(this.form.first_name = this.form.full_name
        .split(' ')
        .slice(0, -1)
        .join(' ')),
        (this.form.last_name = this.form.full_name
          .split(' ')
          .slice(-1)
          .join(' ')),
        //console.log(this.form)
      await this.$store
        .dispatch('auth/register', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.loading = false
          this.$router.push(
            this.$route.query.next ? '/' + this.$route.query.next : '/dashboard'
          )
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
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
</style>
