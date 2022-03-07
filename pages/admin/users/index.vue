<template>
  <v-container fluid>
    <v-card class="pa-8">
      <h2>Users</h2>
      <v-text-field
        outlined
        v-model="search"
        placeholder="Search User"
        class="mt-10"
        dense
        prepend-inner-icon="search"
        style="width: 300px"
      >
      </v-text-field>
      <v-data-table
        :search="search"
        :items-per-page="15"
        :items="users"
        :headers="headers"
      >
        <template v-slot:item.fullname="{ item }">
          {{ item.first_name }} {{ item.last_name }}
        </template>
        <template v-slot:item.balance="{ item }">
          &#8358;{{ item.balance | formatPrice }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-menu
            bottom
            left
            offset-y
            origin="top right"
            transition="scale-transition"
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn v-bind="attrs" v-on="on" small class="" icon
                ><v-icon>more_horiz</v-icon></v-btn
              >
            </template>

            <v-list dense width="200px" class="py-0">
              <v-list-item
                dense
                @click="changeRole(item.id, 'user')"
                class="py-0 my-0"
              >
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Change Role to User </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense @click="changeRole(item.id, 'wholesaler')">
                <v-list-item-content>
                  <v-list-item-title
                    >Change Role to Wholesaler
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense @click="changeRole(item.id, 'staff')">
                <v-list-item-content>
                  <v-list-item-title>Change Role to Staff </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense @click="changeRole(item.id, 'next_champ')">
                <v-list-item-content>
                  <v-list-item-title>Change to Next Champ </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item dense @click="changeRole(item.id, 'admin')">
                <v-list-item-content>
                  <v-list-item-title>Change Role to Admin </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="length"
        @input="getUsers()"
      ></v-pagination>
    </v-card>
  </v-container>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      users: [],
      page: 1,
      length: 1,
      headers: [
        { text: 'Full Name', value: 'fullname' },
        // {text: 'Last Name', value: 'last_name'},
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'mobile' },
        { text: 'Gender', value: 'gender' },
        { text: 'Role', value: 'role' },
        { text: 'Points', value: 'points' },
        { text: 'Balance', value: 'balance' },
        { text: 'Join Date', value: 'created_at' },
        { text: 'Action', value: 'action' },
      ],
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const data = {
        page: this.page,
      }
      await this.$store.dispatch('users/all', data).then((response) => {
        this.users = response.data
        this.length = response.data.last_page
      })
    },
    async changeRole(id, role) {
      const data = {
        id,
        role,
      }
      await this.$store.dispatch('users/changerole', data).then((response) => {
       this.getUsers()
      })
    },
  },
}
</script>
