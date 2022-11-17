<template>
  <v-container>
    <v-row justify="center" style="width: 100%">
      <v-col>
        <v-expansion-panels popout>
          <v-expansion-panel v-for="faq in faqList" :key="faq.faqid">
            <v-expansion-panel-header>
              <div>
                <span>{{ faq.question }}</span>
              </div></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <span>{{ faq.answer }}</span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row
      v-if="
        this.$store.state.user?.userrole == 'Admin' && isAdminEditableComponent
      "
    >
      <v-col cols="12">
        <v-btn color="black" class="mb-6 mt-2" @click="addFAQ()" outlined
          >ADD</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import faqServices from "@/services/user";
import Swal from "sweetalert2/src/sweetalert2.js";
export default {
  props: {
    isAdminEditableComponent: Boolean,
  },
  data: () => ({
    faqList: [],
  }),

  methods: {
    async getFAQ() {
      try {
        console.log("Getting the list of FAQs");
        const response = await faqServices.getAllFaqs();
        console.log("retrieved the FAQs");
        this.getTheFAQsValues(response.data);
        console.log(this.faqList);
      } catch (error) {
        console.log(error);
      }
    },
    getTheFAQsValues(faqData) {
      this.faqList = [];
      for (var i = 0; i < faqData.length; i++) {
        this.faqList.push(faqData[i]);
      }
    },
    async addFAQ() {
      const { value: formValues } = await Swal.fire({
        title: "New FAQ",
        html:
          '<input placeholder="Question" id="swal-input1" class="swal2-input" style="width: 18em">' +
          '<textarea placeholder="Answer" id="swal-input2" class="swal2-input" style="width: 18em">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
          ];
        },
      });

      if (formValues) {
        this.createFAQ(formValues[0], formValues[1]);
        Swal.fire(JSON.stringify(formValues));
      }
    },

    async createFAQ(question, answer) {
      try {
        faqServices.createFaq({
          question: question,
          answer: answer,
        });
        this.getFAQ();
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.getFAQ();
  },
};
</script>
