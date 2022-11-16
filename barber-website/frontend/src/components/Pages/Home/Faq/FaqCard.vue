<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="" v-for="faq in faqList" :key="faq.faqid">
        <v-card
          class="mx-auto rounded-xl"
          color="#F7F7F7"
          max-height="500px"
          height="300"
        >
          <v-card-text class="text-center">
            <p class="my-2 text-center font-weight-bold text-h5">
              {{ faq.question }}
            </p>

            <div contentEditable="True" class="text-center mt-6 text-h6">
              {{ faq.answer }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SavedFAQs from "@/services/user";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    faqsDict: {},
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
        this.getTheFAQsValues(response.data);
        console.log(this.faqList);
      } catch (error) {
        console.log(error);
      }
    },
    getTheFAQsValues(faqData) {
      for (var i = 0; i < faqData.length; i++) {
        this.faqList.push(faqData[i]);
      }
    },
  },
  created() {
    this.getFAQ();
  },
};
</script>
