<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <p class="display-3 font-weight-light	text-center pa-4">User List</p>
  
    <br>
    
    <v-data-table
    :headers="headers"
    :items="users"
    sort-by="name"
    class="elevation-1"
    >
    <template v-slot:[`item.isAdmin`]="{ item }">
      <div v-if="item.isAdmin==true">Admin</div>
      <div v-else>User</div>
    </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <padding></padding>
  
  </div>
</template>

<script>
import Padding from './EmptyBox'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  components: {
    Padding
  },
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Contacts', value: 'phonenumber' },
        { text: 'Type', value: 'isAdmin' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      users: [],
    }
  },
  async created () {
    const response = (await AuthenticationService.getAllUsers()).data
    this.users = response
  },
  methods: {
    editItem (item) {
      this.$router.push({
        name: 'UserEdit',
        params: {
          name: item.name
        }
      })
    },

    async deleteItem (item) {
      try {
        await AuthenticationService.delete(item.name)
        this.users = (await AuthenticationService.getAllUsers()).data
      } catch (err) {
        console.log(err.response.data.error)
      }
    },
  }
}
</script>

<style>

</style>