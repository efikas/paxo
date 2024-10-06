<template>
  <v-container fluid>
    <v-card class="pa-8">
      <h2>Withdrawal Request</h2>
      <v-text-field
        outlined
        v-model="search"
        placeholder="Search Withdrawal"
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
          {{ item.user.first_name }} {{ item.user.last_name }}
        </template>
         <template v-slot:item.bank_name="{ item }">
          {{ item.user.bank_code }}
        </template>
        <template v-slot:item.amount="{ item }">
          &#8358;{{ item.amount }}
        </template>
        <template v-slot:item.account_name="{ item }">
          {{ item.user.account_name }}
        </template>
        <template v-slot:item.account_number="{ item }">
          {{ item.user.account_number }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at | formatDate }}
        </template>
        <template v-slot:item.status="{ item }">
        <v-chip
          small
          :color="
            item.status == 'pending'
              ? 'warning'
              : item.status == 'processing'
              ? 'warning'
              : item.status == 'cancelled'
              ? 'error'
              : item.status == 'approved'
              ? 'success'
              : item.status == 'shipping'
              ? 'accent'
              : 'success'
          "
        >
          {{ item.status }}
        </v-chip>
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
                @click="changeRole(item.id, 'approved')"
                class="py-0 my-0"
              >
                <v-list-item-content class="py-0 my-0">
                  <v-list-item-title>Approve </v-list-item-title>
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
        { text: 'Bank Name', value: 'bank_name' },
        { text: 'Account Name', value: 'account_name' },
        { text: 'Account Number', value: 'account_number' },
        { text: 'Amount', value: 'amount' },
        { text: 'Status', value: 'status' },
        { text: 'Created Date', value: 'created_at' },
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
      await this.$store.dispatch('users/wallet', data).then((response) => {
        this.users = response.data
        this.length = response.data.last_page
      })
    },
    async changeRole(id, role) {
      const data = {
        id,
        role,
      }
      await this.$store.dispatch('users/changestatus', data).then((response) => {
       this.getUsers()
      })
    },
  },
}
</script>
