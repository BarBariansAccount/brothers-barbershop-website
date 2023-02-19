<!-- Testing jira -->
<template>
  <div>
    <v-container>
      <BusyToolBar />
      <AdminMenuCards @theMenuItem="onCardMenuSelect" />
    </v-container>
    <v-container v-if="menuItemSelected == 'BARBERS'">
      <BarbersManagementPageVue />
    </v-container>
    <v-container v-else-if="menuItemSelected == 'STATS'">
      <v-col md="12">
        <Graph />
      </v-col>
    </v-container>
    <v-container v-else-if="menuItemSelected == 'Editable Info'">
      <FaqAdminCardEdit />
    </v-container>
    <v-container v-else-if="menuItemSelected == 'APPOINTMENT'">
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-toolbar-title>View</v-toolbar-title>
      </v-toolbar>
      <v-row>
        <v-col md="12">
          <AdminTable />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="menuItemSelected == 'PRODUCTS'">
      <AdminProducts />
    </v-container>
    <v-container v-else-if="menuItemSelected == 'Barber`s Availability'">
      <AvailabilityTable />

    </v-container>
  </div>
</template>

<script>
import AdminMenuCards from "@/components/AdminMenuCards.vue";
import FaqAdminCardEdit from "@/components/FaqAdminCardEdit.vue";
import BusyToolBar from "@/components/BusyToolbar.vue";
import AdminTable from "@/components/AdminTable.vue";
import AdminProducts from "@/components/AdminProducts.vue";
import Graph from "@/components/AdminGraph.vue";
import BarbersManagementPageVue from "./BarbersManagementPage.vue";
import AvailabilityTable from "@/components/AvailabilityTable.vue";
export default {
  name: "AdminPage",
  components: {
    BarbersManagementPageVue,
    Graph,
    AdminTable,
    BusyToolBar,
    AdminMenuCards,
    FaqAdminCardEdit,
    AdminProducts,
    AvailabilityTable
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