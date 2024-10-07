<template>
    <div>
        <v-bottom-navigation fixed color="#36bdb4" :value="selectedTab" grow>
            <v-btn color="#36bdb4 accent-4" text value="Home" to="/">
                <span>Home</span>

                <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.25 24.0625C2.49375 24.0625 1.84658 23.7935 1.3085 23.2554C0.7695 22.7164 0.5 22.0688 0.5 21.3125V8.9375C0.5 8.50208 0.597625 8.08958 0.792875 7.7C0.987208 7.31042 1.25625 6.98958 1.6 6.7375L9.85 0.55C10.1021 0.366667 10.3656 0.229167 10.6406 0.1375C10.9156 0.0458332 11.2021 0 11.5 0C11.7979 0 12.0844 0.0458332 12.3594 0.1375C12.6344 0.229167 12.8979 0.366667 13.15 0.55L21.4 6.7375C21.7438 6.98958 22.0133 7.31042 22.2085 7.7C22.4028 8.08958 22.5 8.50208 22.5 8.9375V21.3125C22.5 22.0688 22.231 22.7164 21.6929 23.2554C21.1539 23.7935 20.5063 24.0625 19.75 24.0625H14.25V14.4375H8.75V24.0625H3.25Z"
                        fill="currentColor" />
                </svg>
            </v-btn>
            <v-btn color="#36bdb4 accent-4" text to="/category" value="Categories">
                <span>Categories</span>

                <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.168 9.33301C20.3771 9.33301 22.168 7.54215 22.168 5.33301C22.168 3.12387 20.3771 1.33301 18.168 1.33301C15.9588 1.33301 14.168 3.12387 14.168 5.33301C14.168 7.54215 15.9588 9.33301 18.168 9.33301Z"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M4.83398 22.666C7.04312 22.666 8.83398 20.8752 8.83398 18.666C8.83398 16.4569 7.04312 14.666 4.83398 14.666C2.62485 14.666 0.833984 16.4569 0.833984 18.666C0.833984 20.8752 2.62485 22.666 4.83398 22.666Z"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M14.1673 14.6663H22.1673V21.333C22.1673 21.6866 22.0268 22.0258 21.7768 22.2758C21.5267 22.5259 21.1876 22.6663 20.834 22.6663H15.5007C15.147 22.6663 14.8079 22.5259 14.5578 22.2758C14.3078 22.0258 14.1673 21.6866 14.1673 21.333V14.6663ZM0.833984 1.33301H8.83398V7.99967C8.83398 8.3533 8.69351 8.69243 8.44346 8.94248C8.19341 9.19253 7.85427 9.33301 7.50065 9.33301H2.16732C1.8137 9.33301 1.47456 9.19253 1.22451 8.94248C0.97446 8.69243 0.833984 8.3533 0.833984 7.99967V1.33301Z"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </v-btn>
            <v-btn color="#36bdb4 accent-4" text to="/all-brands" value="Brands">
                <span>Brands</span>

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M23 10.8937V3.42136C23 2.77918 22.7449 2.16329 22.2908 1.7092C21.8367 1.25511 21.2208 1 20.5786 1H13.1063C12.4642 1.00014 11.8484 1.25533 11.3944 1.70946L1.70894 11.3949C1.25501 11.849 1 12.4648 1 13.1068C1 13.7489 1.25501 14.3647 1.70894 14.8187L9.18127 22.2911C9.63535 22.745 10.2511 23 10.8932 23C11.5352 23 12.151 22.745 12.6051 22.2911L22.2905 12.6056C22.7447 12.1516 22.9999 11.5358 23 10.8937Z"
                        stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="1.105" cy="1.105" r="1.48" transform="matrix(-1 0 0 1 18.7617 5.2373)"
                        stroke="currentColor" stroke-width="0.75" />
                </svg>

            </v-btn>

            <v-btn color="#36bdb4 accent-4" text @click="clickWishlist" value="Wishlist">
                <span>Wishlist</span>

                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.2455 18.7752L10.2448 18.7746C7.40244 16.1409 5.08316 13.9912 3.46847 11.974C1.85982 9.96443 1 8.14545 1 6.18188C1 2.98595 3.44825 0.5 6.55 0.5C8.30853 0.5 10.0073 1.33896 11.1159 2.66922L11.5 3.1301L11.8841 2.66922C12.9927 1.33896 14.6915 0.5 16.45 0.5C19.5517 0.5 22 2.98595 22 6.18188C22 8.14545 21.1402 9.96445 19.5314 11.9756C17.9199 13.9901 15.6067 16.1381 12.7721 18.7701L12.7558 18.7852L12.7548 18.7862L11.5013 19.9433L10.2455 18.7752Z"
                        stroke="currentColor" />
                </svg>

            </v-btn>

            <v-btn color="#36bdb4 accent-4" text @click="clickDashboard" value="My Profile">
                <span>My Profile</span>

                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6.44456 16.8923C10.2093 16.3423 12.8015 16.3896 16.5712 16.9116C16.8442 16.9511 17.0936 17.0882 17.2735 17.2973C17.4533 17.5065 17.5514 17.7737 17.5496 18.0495C17.5496 18.3135 17.4589 18.5698 17.295 18.77C17.0093 19.1191 16.7166 19.4623 16.4172 19.7996H17.8697C17.961 19.6907 18.0529 19.5796 18.1458 19.4669C18.472 19.0668 18.65 18.5663 18.6496 18.0501C18.6496 16.9363 17.8367 15.9766 16.7219 15.8226C12.8631 15.2885 10.1659 15.2374 6.28561 15.8044C5.15921 15.9689 4.34961 16.9435 4.34961 18.0649C4.34961 18.5627 4.51186 19.0549 4.81931 19.4537C4.91006 19.5714 4.99971 19.6869 5.08881 19.8002H6.50616C6.22754 19.4666 5.95579 19.1274 5.69106 18.7827C5.53374 18.5763 5.44887 18.3238 5.44961 18.0644C5.44961 17.472 5.87531 16.9754 6.44456 16.8923ZM11.4996 11.5496C11.933 11.5496 12.3621 11.4643 12.7625 11.2984C13.1628 11.1326 13.5266 10.8895 13.8331 10.5831C14.1395 10.2766 14.3826 9.91284 14.5484 9.51247C14.7143 9.11209 14.7996 8.68297 14.7996 8.24961C14.7996 7.81625 14.7143 7.38713 14.5484 6.98675C14.3826 6.58638 14.1395 6.22259 13.8331 5.91616C13.5266 5.60972 13.1628 5.36665 12.7625 5.20081C12.3621 5.03497 11.933 4.94961 11.4996 4.94961C10.6244 4.94961 9.78503 5.29729 9.16616 5.91616C8.54729 6.53503 8.19961 7.3744 8.19961 8.24961C8.19961 9.12482 8.54729 9.96419 9.16616 10.5831C9.78503 11.2019 10.6244 11.5496 11.4996 11.5496ZM11.4996 12.6496C12.6666 12.6496 13.7857 12.186 14.6109 11.3609C15.436 10.5357 15.8996 9.41656 15.8996 8.24961C15.8996 7.08266 15.436 5.9635 14.6109 5.13834C13.7857 4.31318 12.6666 3.84961 11.4996 3.84961C10.3327 3.84961 9.2135 4.31318 8.38834 5.13834C7.56318 5.9635 7.09961 7.08266 7.09961 8.24961C7.09961 9.41656 7.56318 10.5357 8.38834 11.3609C9.2135 12.186 10.3327 12.6496 11.4996 12.6496Z"
                        fill="currentColor" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.5 20.9C16.9676 20.9 21.4 16.4676 21.4 11C21.4 5.53245 16.9676 1.1 11.5 1.1C6.03245 1.1 1.6 5.53245 1.6 11C1.6 16.4676 6.03245 20.9 11.5 20.9ZM11.5 22C17.5753 22 22.5 17.0753 22.5 11C22.5 4.9247 17.5753 0 11.5 0C5.4247 0 0.5 4.9247 0.5 11C0.5 17.0753 5.4247 22 11.5 22Z"
                        fill="currentColor" />
                </svg>

            </v-btn>
        </v-bottom-navigation>


        <v-dialog v-model="loginDialog" width="500px">
            <v-card>
                <Login :clickRegister="clickRegister" :closeAllPopUp="closeAllPopUp" />
            </v-card>
        </v-dialog>
        <v-dialog v-model="registerDialog" width="800px">
            <v-card>
                <Register :clickLogin="clickLogin" :closeAllPopUp="closeAllPopUp" />
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from './menu/login.vue'
import Register from './menu/register.vue'
export default {
    components: {
        Login,
        Register,
    },
    data() {
        return {
            loginDialog: false,
            registerDialog: false,
        }
    },
    methods: {
        clickLogin: function () {
            this.registerDialog = false;
            this.loginDialog = true;
        },
        clickRegister: function () {
            this.loginDialog = false;
            this.registerDialog = true;
        },
        closeAllPopUp: function () {
            this.loginDialog = false;
            this.registerDialog = false;
        },
        clickDashboard() {
            if (this.isAuthenticated) {
                this.$router.push('/dashboard')
            }
            else {
                this.loginDialog = true;
            }
        },
        clickWishlist() {
            if (this.isAuthenticated) {
                this.$router.push('/my-wishlist')
            }
            else {
                this.loginDialog = true;
            }
        },
    },
    watch: {
        isAuthenticated: function () {
            this.isAuthenticated ? null : window.location.reload()
        },
    },
    onIdle() { },
    onActive() { },
    computed: {
        ...mapGetters('products', ['StoreCart', 'cartItem']),
        ...mapGetters('auth', ['isAuthenticated', 'user']),

    },
    mounted() { },

    beforeMount() { },
    created() { },
}
</script>
<style lang="scss" scoped></style>