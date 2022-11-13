<template>
  <v-card class="mx-auto rounded-xl" color="#F7F7F7">
    <v-card-text class="text-center">
      <p
        contentEditable="True"
        class="my-2 text-center font-weight-bold text-h5"
      >
        <slot></slot>
      </p>

      <div
        contentEditable="True"
        class="text-center mt-6 text-h6"
        @click="getFAQ()"
      >
        {{}}
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import SavedFAQs from "@/services/user";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    faqList: [],
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    async getFAQ() {
      try {
        console.log("Getting the list of FAQs");
        const response = await SavedFAQs.getAllFaqs();
        console.log("retrieved the FAQs");
        var faqData = response.data[0];
        this.faqList.push(response.data[0]);
        console.log(faqData.answer);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
