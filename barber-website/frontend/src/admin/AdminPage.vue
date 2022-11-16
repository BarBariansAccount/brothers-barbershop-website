<template>
  <!-- Testing jira -->
  <div>
    <v-container>
      <BusyToolBar />
      <AdminMenuCards @theMenuItem="onCardMenuSelect" />
    </v-container>
    <v-container v-if="menuItemSelected == 'BARBERS'">
      <BarbersManagementPageVue />
    </v-container>
    <v-container v-else>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title>View</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col md="6">
          <AdminTable />
        </v-col>
        <v-col md="6">
          <Graph />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AdminMenuCards from "@/components/AdminMenuCards.vue";
import BusyToolBar from "@/components/BusyToolbar.vue";
import AdminTable from "@/components/AdminTable.vue";
import Graph from "@/components/AdminGraph.vue";
import BarbersManagementPageVue from "./BarbersManagementPage.vue";

export default {
  name: "AdminPage",
  components: {
    BarbersManagementPageVue,
    Graph,
    AdminTable,
    BusyToolBar,
    AdminMenuCards,
  },

  data() {
    return {
      menuItemSelected: "",
    };
  },
  methods: {
    onCardMenuSelect(menuItem) {
      console.log(menuItem);
      this.menuItemSelected = menuItem;
    },
  },
};
</script>

<style></style>
