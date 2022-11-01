<template>
  <v-container>

    <v-row class="mb-5">
      <!-- left col -->
      <v-col cols="12" md="2">
        <div class="bg-purp pa-4 " style="height:100%;">
          <div v-for="(item,i) in items" :key="i" class="py-2">
            <router-link :to="item.to" v-text="item.title" class="link"></router-link>
          </div>
        </div>
      </v-col>
      <!-- right col -->
      <v-col cols="12" md="10">

        <router-view></router-view>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

export default {

  data: () => ({
    items: [
      {
        title: 'Profile', to: '/profile'
      },
      {
        title: 'Appontments', to: '/profile/appointments'
      },
      {
        title: 'Orders', to: '/profile/orders'
      },
      {
        title: 'Availabilities', to: '/profile/availabilities'
      },
      {
        title: 'Change Password', to: '/profile/changepassword'
      },
    ]
  }),
  methods: {

  }
}
</script>

<style>
.link {
  text-decoration: none;
  letter-spacing: 1px;
}

.bg-purp {
  background-color: #DBDDEF !important;
}

.router-link-exact-active {
  background-color: white;
  display: block;
  padding: 4px 12px;
  border-radius: 3px;
}
</style>