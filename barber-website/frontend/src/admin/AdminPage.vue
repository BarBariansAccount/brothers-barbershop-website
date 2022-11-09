<template>
  <!-- testing github integration with jira -->
  <div>
    <v-container>
      <BusyToolBar />
      <v-item-group mandatory class="mt-n4">
        <v-row justify="center">
          <v-col cols="12" md="2" v-for="items in menuItems" :key="items.title">
            <v-item v-slot="{ active, toggle }">
              <v-card
                :color="active ? '#999999' : 'white'"
                class="d-flex align-center rounded-xl"
                dark
                height="200"
                @click="toggle"
                @click.stop="onCardMenuSelect(items.title)"
              >
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-list-item three-line class="mt-10">
                      <v-list-item-content>
                        <div class="mb-4">
                          <v-icon
                            x-large
                            :color="active ? 'white' : '#999999'"
                            >{{ items.icons }}</v-icon
                          >
                        </div>
                        <v-list-item-subtitle
                          :class="active ? 'white--text' : 'black--text'"
                          >{{ items.title }}</v-list-item-subtitle
                        >
                        <v-list-item-title
                          class="headline mb-1"
                          :class="active ? 'white--text' : 'black--text'"
                        >
                          <strong>52</strong>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
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
import BusyToolBar from "@/components/BusyToolbar.vue";
import AdminTable from "@/components/AdminTable.vue";
import Graph from "@/components/AdminGraph.vue";
import BarbersManagementPageVue from "./BarbersManagementPage.vue";
import {
  mdiFinance,
  mdiAccountTie,
  mdiImage,
  mdiInformationOutline,
  mdiCalendar,
  mdiAccountGroupOutline,
} from "@mdi/js";

export default {
  name: "AdminPage",
  components: { BarbersManagementPageVue, Graph, AdminTable, BusyToolBar },

  data() {
    return {
      menuItems: [
        {
          title: "OVERVIEW",
          icons: mdiInformationOutline,
        },
        {
          title: "BARBERS",

          icons: mdiAccountGroupOutline,
        },
        { title: "CLIENTS", icons: mdiAccountTie },
        { title: "APPOINTMENT", icons: mdiCalendar },
        { title: "GALLERY", icons: mdiImage },
        { title: "STATS", icons: mdiFinance },
      ],
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
