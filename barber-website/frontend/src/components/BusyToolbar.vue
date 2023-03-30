<template>
  <div>
    <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n1">
      <v-spacer></v-spacer>

      <v-item-group v-model="activeItem" mandatory class="mt-n4">
        <v-row justify="center">
          <v-col v-for="(status, index) in statusItems" :key="status.title">
            <v-item v-slot="{ active, toggle }">
              <v-btn
                :color="active ? 'green' : '#999999'"
                rounded
                dark
                class="rounded-xl"
                elevation="20"
                @click.stop="onToggle(toggle, index, status.title)"
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
        { title: "Empty", isActive: true },
        { title: "Busy", isActive: false },
        { title: "Not Busy", isActive: false },
      ],
      activeItem: "",
    };
  },
  methods: {
    onSelect(status) {
      this.updateStatus(status);
    },

    async onToggle(toggle, index, status) {
      this.$store.state.activeElement = index;
      await BarbershopStatusService.updateStatus({ Status: status });
      toggle(true);
    },
  },
  mounted() {
    // Get the active item from local storage
    const storedActiveItem = this.$store.state.activeElement;
    if (storedActiveItem) {
      this.activeItem = storedActiveItem; // Set the active item if it exists
    }
  },
};
</script>
