<template>
    <v-card flat>
        <h3 class="text-center py-4" style="background-color: #14adac33">
            Sign Up
        </h3>
        <v-form lazy-validation v-model="valid" ref="register" class="pa-8">
            <v-row justify="center" align="center">
                <v-col cols="12" md="6">
                    <v-text-field outlined required v-model="form.first_name"
                        :rules="(v) => !!v || 'This field is required'" placeholder="Jane" label="First Name"
                        color="green" base-color="purple" rounded tile="false" shaped></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field outlined required v-model="form.last_name"
                        :rules="(v) => !!v || 'This field is required'" placeholder="Thomas"
                        label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field outlined required @input="emailerror = ''" :error-messages="emailerror"
                        v-model="form.email" :rules="emailRules" placeholder="Email address"
                        label="Email Address"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field outlined required @input="phoneerror = ''" :error-messages="phoneerror"
                        v-model="form.mobile" :rules="(v) => !!v || 'This field is required'" placeholder="Mobile"
                        label="Phone Number"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-text-field outlined required :rules="[(v) => !!v || 'Date of birth  is required']"
                                :value="form.dob" clearable placeholder="Date of Birth" label="Date of Birth" readonly
                                v-on="on"></v-text-field>
                        </template>
                        <v-date-picker light v-model="form.dob" @change="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select outlined :items="[
                        { text: 'Male', value: 'male' },
                        { text: 'Female', value: 'female' },
                        { text: 'Others', value: 'others' },
                    ]" v-model="form.sex" placeholder="Gender" label="Gender" required
                        :rules="[(v) => !!v || 'This field is required']"></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field type="password" placeholder="Password" label="Password" outlined
                        v-model="form.password" required :rules="passwordRules"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field outlined required v-model="form.password_confirmation" :rules="passwordConfirmRules"
                        placeholder="Confirm Password" label="Confirm Password" type="password"></v-text-field>
                </v-col>
            </v-row>

            <div class="text-center px-12 text-caption">
                <v-btn :loading="loading" @click="$refs.register.validate() ? register() : null" large text
                    class="primary mb-4 br-all-5">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sign Up&nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;</v-btn>
            </div>

            <div class="text-center px-4 text-caption">
                By Clicking “Sign Up” you certify that you agree to Paxo
                Beauty’s
                <span class="font-weight-bold"><a href="/terms-condition">Terms and Conditions</a></span> and
                <span class="font-weight-bold"><a href="/privacy-policy">Privacy Policy.</a></span>
            </div>
        </v-form>
        <div class="text-center py-4 text-caption" style="background-color: #14adac33">
            Already have an account?
            <a  @click="clickLogin"><span class="font-weight-bold text-caption text-decoration-none" style="color: black">Log
                    In</span></a><br />
        </div>
    </v-card>
</template>
<script>
import mixpanel from "mixpanel-browser";
import { mapGetters } from 'vuex'
export default {
    transition: 'default',
    props: ["clickLogin", "closeAllPopUp"],
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
            // (this.form.first_name = this.form.full_name
            //   .split(' ')
            //   .slice(0, -1)
            //   .join(' ')),
            //   (this.form.last_name = this.form.full_name
            //     .split(' ')
            //     .slice(-1)
            //     .join(' ')),
            //console.log(this.form)
            await this.$store
                .dispatch('auth/register', this.form)
                .then((response) => {
                    this.$toast.success(response.message)
                    this.loading = false
                    mixpanel.init("e8933091d8272d61b9c4c16a619ab0e2", { track_pageview: true });
                    mixpanel.track("Sign up", {
                        user_email: this.form.email,
                    });

                    this.$router.push(
                        this.$route.query.next ? '/' + this.$route.query.next : '/dashboard'
                    )
                    this.closeAllPopUp();
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