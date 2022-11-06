<template>
  <div>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n1">
      <v-spacer></v-spacer>

      <v-item-group mandatory class="mt-n4">
        <v-row justify="center">
          <v-col v-for="status in statusItems" :key="status.title">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                :color="active ? 'green' : '#999999'"
                rounded
                dark
                class="rounded-xl"
                elevation="20"
                @click="toggle"
                @click.stop="onSelect(status.title)"
              >
                <!--TODO: add selectStatus(status.title) -->
                {{ status.title }}
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-toolbar>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
      <v-toolbar-title>Overview</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
import BarbershopStatusService from "@/services/barbershopStatus";

export default {
  name: "BusyToolBar",
  data() {
    return {
      statusItems: [
        { title: "Empty" },
        { title: "Busy" },
        { title: "Not Busy" },
      ],
    };
  },
  methods: {
    onSelect(status) {
      this.updateStatus(status);
    },
    async updateStatus(status) {
      await BarbershopStatusService.updateStatus({ Status: status });
      console.log(status);
    },
  },
};
</script>
