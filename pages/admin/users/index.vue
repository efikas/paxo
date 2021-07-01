<template>
  <v-container fluid>
    <v-card class="pa-8">

      <h2>Users</h2>
      <v-data-table hide-default-footer :items-per-page="15" :items="users" :headers="headers">
      <template v-slot:item.balance="{item}">
      &#8358;{{item.balance | formatPrice}}
      </template>
      <template v-slot:item.created_at="{item}">
      {{item.created_at | formatDate}}
      </template>
      </v-data-table>
      <v-pagination v-model="page" :length="length" @input="getUsers()"></v-pagination>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      users: [],
      page: 1,
      length: 1,
      headers: [
        {text: 'First Name', value: 'first_name'},
        {text: 'Last Name', value: 'last_name'},
        {text: 'Email', value: 'email'},
        {text: 'Phone', value: 'mobile'},
        {text: 'Gender', value: 'gender'},
        {text: 'Points', value: 'points'},
        {text: 'Balance', value: 'balance'},
        {text: 'Join Date', value: 'created_at'},

      ]
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const data = {
        page: this.page
      }
      await this.$store.dispatch('users/all',data).then(response => {
        this.users = response.data.data
        this.length = response.data.last_page
      })
    }
  }
}
</script>
