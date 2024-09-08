<template>
  <v-container pt-16>
    <v-row :class="{
              'p10p': $vuetify.breakpoint.mdAndUp,
              'px-4': $vuetify.breakpoint.smAndDown,
    }">
      <v-col md="4">
        <UserSideBar />
      </v-col>
      <v-col md="8">
        <h2 class="font-weight-bold">Become an Affiliate</h2>
        <v-divider color="#14ADAC99"></v-divider>
        <p class="mt-8">
          Being an Affiliate on PAXO means you can earn whenever people you
          refer make purchases on the Paxo platform.
        </p>
        <p>
          However, there are conditions to be met in order to start enjoying
          this benefit.
        </p>
        <h3 class="mt-6 font-weight-bold">
          Referral/Affiliate Logic for points (Web App)
        </h3>

        <p>
          For every time you refer someone, you get the 4% off there initial and
          ONLY initial order.
        </p>

        <!-- <h3 class="primary--text">Purchase/Reward logic for points (Web App)</h3>
    <p>Same as above but with 5% instead of 4%</p>

    <h3 class="primary--text">Referral/Affiliate Logic for points (Mobile App)</h3>
    <p>Same as above but with 5% instead of 4%</p> -->

        <div v-if="user.isAffiliate">
          <p>Your Referral Link:</p>
          <!-- <p>{{domain + '/register?ref='+user.referer_id}}</p>
 -->
          <v-text-field
            outlined
            :value="domain + '/register?ref=' + user.referer_id"
          >
            <template #append>
              <v-btn
                color="primary"
                @click="copyLink()"
                type="submit"
                value="Subscribe"
                height="50px"
                style="margin-top: -15px; margin-right: -10px"
                class="br-all-10"
              >
                Copy
              </v-btn>
            </template>
          </v-text-field>
        </div>
        <div v-else>
          <p class="mt-8">
            Ready to become an affiliate? Click the button below.
          </p>

          <v-btn
            class="primary"
            large
            text
            :loading="loading"
            @click="becomeAffiliate()"
            >Become an Affiliate</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import UserSideBar from '~/components/UserSideBar.vue'
export default {
  components: { UserSideBar },
  data() {
    return {
      loading: false,
      selectedItem: '',
      domain: window.location.host,
    }
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    copyLink() {
      this.$clipboard(this.domain + '/register?ref=' + this.user.referer_id)
      this.$toast.success('Referral Link Copied', 'Success')
    },
    async becomeAffiliate() {
      this.loading = true
      await this.$store
        .dispatch('auth/becomeaffiliate')
        .then((response) => {
          this.$toast.success(response.message)
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
<style lang="scss" scoped>
.sidebar {
  background: transparent !important;
  .v-list-item:not(:first-child) {
    border-top: 1px solid #ddd;
  }
}
</style>
