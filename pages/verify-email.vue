<template>
  <div>
    <v-container pa-16>
      <v-row justify="center" align="center">
        <v-col md="5">

          <v-card flat light class="pa-8 text-center verify-card">
                  <v-icon size="60" color="success">check</v-icon>
                  <p>Your email address has been verified successfuly</p>
                  <p>Click <nuxt-link to="/login">here</nuxt-link> to login</p>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  transition: 'default',
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
.verify-card{
  border: 1px solid #ddd;
  background-color: #fff !important;
}
</style>
