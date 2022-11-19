<template>
  <div>
    <v-container>
      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n5">
        <v-row>
          <v-col>
            <v-toolbar-title>Edit FAQs</v-toolbar-title>
          </v-col>
          <v-col class="text-end">
            <v-icon @click="addButton()" size="35">{{
              addIcon.mdiPlaylistPlus
            }}</v-icon>
          </v-col>
        </v-row>
      </v-toolbar>
      <FaqCard ref="add" />
    </v-container>
  </div>
</template>
<script>
import { mdiPlaylistPlus } from "@mdi/js";
import FaqCard from "./Pages/Home/Faq/FaqCard.vue";

export default {
  components: { FaqCard },
  data: () => ({
    addButtonTriggered: false,
    addIcon: { mdiPlaylistPlus },
  }),
  methods: {
    async addButton() {
      await this.$refs.add.addnewFAQ();
      this.addButtonTriggered = !this.addButtonTriggered;
    },
  },
};
</script>
<style>
.container {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.card-header-title-input {
  font-size: inherit;
  font-weight: inherit;
  width: 50%;
  display: block;
}

.card-header-title--editable {
  outline: none;
}
</style>
