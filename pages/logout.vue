<template>

</template>
<script>
export default {

  methods: {
    logout () {
      this.$store.dispatch('products/clearcart')
      this.$store.dispatch('auth/logout')
    }
  },
  mounted () {
    this.logout()
  }
}
</script>
