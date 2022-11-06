<template>
  <v-card class="mb-4 rounded-xl">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="9"
      item-key="name"
      height="480"
      max-height="450"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
      }"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "AdminTable",

  data() {
    return {
      headers: [
        {
          text: "Barbers",
          align: "start",
          value: "name",
        },
        { text: "Active", value: "category" },
      ],
      desserts: [
        {
          name: "TK",
          category: "Active",
        },
        {
          name: "Ten-Hag",
          category: "Active",
        },
        {
          name: "Booba",
          category: "Not Active",
        },
        {
          name: "Zidane",
          category: "Not Active",
        },
        {
          name: "Barthez",
          category: "Not Active",
        },
        {
          name: "Rick",
          category: "Active",
        },
        {
          name: "Ali",
          category: "Active",
        },
        {
          name: "Abdi",
          category: "Not Active",
        },
        {
          name: "Nafis",
          category: "Not Active",
        },
        {
          name: "Yousha",
          category: "Not Active",
        },
      ],
    };
  },
  methods: {},
};
</script>
