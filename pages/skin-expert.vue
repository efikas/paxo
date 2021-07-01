<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step step="1"> Introduction </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">Answer a few questions</v-stepper-step>
            <v-divider></v-divider>
            <!-- <v-stepper-step step="3">Upload your selfie</v-stepper-step>
            <v-divider></v-divider> -->
            <v-stepper-step step="3">Results & Recommendations</v-stepper-step>
          </v-stepper-header>
          <v-stepper-content step="1" class="text-center">
           <img src="../static/assets/Skin Expert.jpg" width="100%" alt="">
            <v-btn
              class="primary mt-3"
              @click="isAuthenticated ? (e1 = 2) : (loginDialog = true)"
              text
              x-large
              >Start Now</v-btn
            >
          </v-stepper-content>
          <v-stepper-content step="2">
            <div class="d-md-flex" :class="{'text-center':$vuetify.breakpoint.smAndDown}">
              <div>
                <img src="../static/assets/question.jpeg" height="130" alt="" />
              </div>
              <div class="ml-4">
                <h2 class="primary--text">Answer a few questions</h2>
                <p>
                  Here you will answer some questions about your skin health to
                  help us determine the nature of your skin and to make proper
                  decisions and recommendations.
                </p>
                <p>Please fill the form below correctly!</p>
              </div>
            </div>
            <v-divider></v-divider>
            <v-form class="mt-8" lazy-validation v-model="valid" ref="skin">
              <v-row justify="center">
                <v-col md="7">
                  <v-select
                    class="mb-0 pb-0"
                    label="Select Your Skin Type"
                    v-model="form.skin_type"
                    :items="[
                      'Oily',
                      'Dry',
                      'Normal',
                      'Combination',
                      'Sensitive',
                    ]"
                    outlined
                    required
                    :rules="[(v) => !!v || 'This field is required']"
                    dense
                  >
                  </v-select>
                  <p style="font-size: 13px" class="mt-0 pt-0">
                    You can take a quick
                    <a href="javascript:void(0)" @click="skinTestDialog = true"
                      >Skin Type Test</a
                    >
                    if you are not sure of your skin type.
                  </p>
                  <v-select
                    label="Skincare Option"
                    v-model="form.route"
                    :items="[
                      { text: 'Acne-Prone Skin Treatment', value: 'acne' },
                      { text: 'Normal Skincare Routine', value: 'normal' },
                    ]"
                    outlined
                    required
                    :rules="[(v) => !!v || 'This field is required']"
                    dense
                  >
                  </v-select>
                  <v-select
                    v-if="form.route == 'acne'"
                    label="Skin Condition"
                    v-model="form.head_type"
                    :items="[
                      { text: 'Black Head', value: 'black head' },
                      { text: 'White Head', value: 'white head' },
                      { text: 'Hyperpigmentation', value: 'hyperpigmentation' },
                      { text: 'Sunburn', value: 'sunburn' },
                      {
                        text: 'Pastules',
                        value: 'pastules',
                      },
                      {
                        text: 'Pustules',
                        value: 'pustules',
                      },
                      { text: 'Eczema', value: 'eczema' },
                      { text: 'Redness', value: 'redness' },
                      { text: 'Skin tag', value: 'skin tag' },
                    ]"
                    required
                    :rules="[(v) => !!v || 'This field is required']"
                    outlined
                    dense
                  >
                  </v-select>
                  <v-btn
                    class="primary"
                    :loading="loading"
                    @click="$refs.skin.validate() ? getRecommendation() : null"
                    text
                    block
                    >Get Recommendations</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="3">
            <h3 class="">Recommended Products</h3>
            <p class="">Here are some recommended products for you!</p>
            <v-row
              :class="{
                'px-8': $vuetify.breakpoint.mdAndUp,
                'px-4': $vuetify.breakpoint.smAndDown,
              }"
            >
              <v-col
                cols="6"
                sm="4"
                md="3"
                v-for="(i, index) in recommendations"
                :key="index"
              >
                  <!-- :vendor="i.product.brand ? i.brand.name : null" -->
                <product-display
                  :product_name="i.product.name"
                  rating="5"
                  :price="i.product.price"
                  :image="i.product.avatar"
                  :badge="i.product.stock_status"
                  :description="i.product.description"
                  :short_description="i.product.short_description"
                  :product_object="i.product"
                  :product_id="i.product.id"
                />
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-dialog v-model="skinTestDialog" width="900">
      <v-card class="pa-8">
        <h2>Skin Type Test</h2>
        <p>
          This Test will assist you to determine your skin type.<br />
          Please answer all the questions appropriately
        </p>
        <v-form v-model="valid" ref="test" lazy-validation>
          <ol>
            <li>
              Texture of your skin.
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.texture"
              >
                <v-radio label="Does not shine" value="1"></v-radio>
                <v-radio
                  label="Is dry and sometimes slight flaking may appear"
                  value="2"
                ></v-radio>
                <v-radio label="Shines on the nose" value="3"></v-radio>
                <v-radio label="Shines all over" value="4"></v-radio>
                <v-radio label="Dry and itchy" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              Appearance of pores on your skin
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.appearance"
              >
                <v-radio label="Normal" value="1"></v-radio>
                <v-radio label="Very fine" value="2"></v-radio>
                <v-radio label="Visible" value="3"></v-radio>
                <v-radio label="Very opened" value="4"></v-radio>
                <v-radio label="Normal/Large" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              How does your skin look like?
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.look"
              >
                <v-radio label="Cool, fresh and supple" value="1"></v-radio>
                <v-radio label="Thin and lacking moisture" value="2"></v-radio>
                <v-radio label='Shines on the "T" zone' value="3"></v-radio>
                <v-radio
                  label="Shines and has a tendency for acne"
                  value="4"
                ></v-radio>
                <v-radio label="A bit dry / irritated" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              How does your skin feel when touched?
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.feel"
              >
                <v-radio label="Supple" value="1"></v-radio>
                <v-radio label="Dry or very dry" value="2"></v-radio>
                <v-radio
                  label="Oily on the forehead and nose"
                  value="3"
                ></v-radio>
                <v-radio label="Oily all over" value="4"></v-radio>
                <v-radio label="Scaling / redness" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              How often do you feel tightness around the eyes and mouth area
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.tightness"
              >
                <v-radio label="Very often" value="1"></v-radio>
                <v-radio label="Regularly" value="2"></v-radio>
                <v-radio label="Sometimes" value="3"></v-radio>
                <v-radio label="Never" value="4"></v-radio>
                <v-radio label="Often" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              How often do you have pimples?
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.pinples"
              >
                <v-radio label="Very seldom" value="1"></v-radio>
                <v-radio label="Never" value="2"></v-radio>
                <v-radio label="Sometimes" value="3"></v-radio>
                <v-radio label="Very often" value="4"></v-radio>
                <v-radio label="Not often" value="5"></v-radio>
              </v-radio-group>
            </li>
            <li>
              Do you have facial lines and wrinkles?
              <v-radio-group
                required
                :rules="[(v) => !!v || 'You must answer this question']"
                v-model="test.wrinkles"
              >
                <v-radio label="Very Few" value="1"></v-radio>
                <v-radio label="Very deep" value="2"></v-radio>
                <v-radio label="Expression lines only" value="3"></v-radio>
                <v-radio label="None" value="4"></v-radio>
                <v-radio label="Deep" value="5"></v-radio>
              </v-radio-group>
            </li>
          </ol>
          <h2 v-if="skintype">
            Your Skin Type is
            <span class="primary--text"
              >"{{
                skintype == '1'
                  ? 'Normal Skin'
                  : skintype == '2'
                  ? 'Dry Skin'
                  : skintype == '3'
                  ? 'Combination Skin'
                  : skintype == '4'
                  ? 'Oily Skin'
                  : skintype == '5'
                  ? 'Sensitive Skin'
                  : null
              }}"</span
            >
          </h2>
          <div class="text-center">
            <v-btn
              class="primary"
              @click="$refs.test.validate() ? getSkinResult() : null"
              text
              x-large
              >Get Result</v-btn
            >
          </div>
        </v-form>
        <!-- {{Object.values(test)}} -->
      </v-card>
    </v-dialog>
    <v-dialog v-model="loginDialog" width="450px">
      <v-card class="pa-8">
        <h2 class="text-center mb-8">Login to Continue</h2>
        <v-divider></v-divider>
        <v-form lazy-validation v-model="valid" ref="login">
          <v-text-field
            v-model="form.email"
            outlined
            @keypress.native.enter="$refs.login.validate() ? login() : null"
            required
            :rules="emailRules"
            placeholder="Username or email"
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
            No account yet? <nuxt-link to="/register">Register here</nuxt-link
            ><br />
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loginDialog: false,
      skinTestDialog: false,
      e1: 1,
      skintype: '',

      form: { password: '' },
      recommendations: [],
      valid: true,
      test: {},
      loading: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password number is required',
        (v) => v.length >= 8 || 'Password must be at least eight characters',
      ],
    }
  },
  methods: {
    async login() {
      this.loading = true
      await this.$store
        .dispatch('auth/login', this.form)
        .then((response) => {
          // this.$toast.success(response.message)
          this.loading = false
          this.loginDialog = false

          this.e1 = 2
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
    getSkinResult() {
      const array = Object.values(this.test)
      console.log(array)
      if (array.length == 0) return null
      var modeMap = {}
      var maxEl = array[0],
        maxCount = 1
      for (var i = 0; i < array.length; i++) {
        var el = array[i]
        if (modeMap[el] == null) modeMap[el] = 1
        else modeMap[el]++
        if (modeMap[el] > maxCount) {
          maxEl = el
          maxCount = modeMap[el]
        }
      }
      // return maxEl
      console.log(maxEl)
      this.skintype = maxEl
    },
    async getRecommendation() {
      this.loading = true
      await this.$store
        .dispatch('auth/skinexpert', this.form)
        .then((response) => {
          this.$toast.success(response.message)
          this.recommendations = response.data
          console.log(this.recommendations)
          this.loading = false
          this.e1 += 1
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
          this.loading = false
        })
    },
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
}
</script>
