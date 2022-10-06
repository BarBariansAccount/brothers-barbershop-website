<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
      <v-list-item-group v-model="group">
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click.stop="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="app-title">{{ appTitle }}</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-btn to="/profile" icon
        ><v-icon>{{ icons.mdiAccount }}</v-icon></v-btn
      >
    </v-toolbar>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";
export default {
  name: "Navbar-component",
  data() {
    return {
      appTitle: "Brothers' Barbershop",
      userRole:'',
      sidebar: false,
      group: null,
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
    },onUserRoleMenu(){
      if(this.userRole == "Admin"){
        this.menuItems.push({ title: "Admin", path: "/somewhere" });
      }
    }
  },
};
</script>
<style>
.app-title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
}
</style>
