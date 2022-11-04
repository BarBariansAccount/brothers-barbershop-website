<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
      <v-list-item-group v-model="group">
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-toolbar >
           <v-icon @click="$emit('toggle')" v-if="toggle">
        mdi-dots-vertical
      </v-icon>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click.stop="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <img src="@/assets/barbershop-logo.png" class="logo-img" />
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="app-title">{{ appTitle }}</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn  text v-for="item in menuItems" :key="item.title" :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu :offset-y="true" width="150px" left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>{{ icons.mdiAccount }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!user">
            <SignIn />
          </v-list-item>
          <v-list-item v-if="user">
            {{user.firstname + ' ' + user.lastname }}
          </v-list-item>
          <v-divider v-if="user"></v-divider>
          <v-list-item v-if="user" to="/panel">
            user panel
          </v-list-item>
          <v-list-item v-if="user" @click="logout">
            Log Out
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";
import SignIn from "@/components/SignIn.vue";
export default {
  name: "Navbar-component",
  components: { SignIn },
  data() {
    return {
      appTitle: "Brothers' Barbershop",
      userRole: "",
      sidebar: false,
      group: null,
      profileItemsDialog: false,
      profileItems: [{ title: "Sign Out" }, { title: "Profile" }],
      menuItems: [
        { title: "Home", path: "/" },
        { title: "Products" },
        {
          title: "Appointment Booking",
          path: "/appointment",
        },
        { title: "Gallery", path: "/gallery" },
      ],
      icons: { mdiAccount },
      watch: {
        group() {
          this.sidebar = false;
        },
      },
    };
  },
  props:['toggle'] ,
  mounted() {
    window.addEventListener("resize", this.onWindowResize);
    this.onUserRoleMenu();
  },
  unmounted() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    onWindowResize() {
      if (window.innerWidth >= 600) {
        this.sidebar = false;
      }
    },
    onUserRoleMenu() {
      if (this.userRole == "Admin") {
        this.menuItems.push({ title: "Admin", path: "/admin" });
      }
    },
    // profileItemsPopup(title) {
    //   console.log(this.profileItemsDialog);
    //   if (title == "Sign In") {
    //     this.profileItemsDialog = true;
    //     console.log(this.profileItemsDialog);
    //   }
    // },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  }
};
</script>
<style scoped>
.app-title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
}

.logo-img {
  width: 25px;
  height: 45px;
  margin-right: 3px;
}

.v-menu__content {
  width: 150px;
}
</style>
