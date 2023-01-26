<template>
  <v-container>
    <v-row justify="center" style="width: 100%">
      <v-col>
        <v-expansion-panels popout>
          <v-expansion-panel v-for="faq in faqList" :key="faq.faqid">
            <v-expansion-panel-header>
              <div>
                <v-row>
                  <v-col cols="11">
                    <span>{{ faq.question }}</span>
                  </v-col>
                  <v-col cols="1" class="px-3">
                    <v-icon
                      v-ripple="false"
                      @click.stop="onDeleteFaq(faq.faqid)"
                    >
                      {{
                        adminModificationIconList[0].mdiTrashCanOutline
                      }}</v-icon
                    >

                    <v-icon v-ripple="false" @click.stop="">{{
                      adminModificationIconList[0].mdiPencilOutline
                    }}</v-icon>

                    <v-icon v-ripple="false" @click.stop="">
                      {{
                        adminModificationIconList[0].mdiDragHorizontal
                      }}</v-icon
                    >
                  </v-col>
                </v-row>
              </div></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <span>{{ faq.answer }}</span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiTrashCanOutline,
  mdiPencilOutline,
  mdiDragHorizontal,
} from "@mdi/js";
import faqServices from "@/services/user";
import Swal from "sweetalert2/src/sweetalert2.js";
export default {
  data: () => ({
    faqList: [],
    adminModificationIconList: [
      { mdiPencilOutline, mdiTrashCanOutline, mdiDragHorizontal },
    ],
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
    onDeleteFaq(faqID) {
      console.log("deleting the FAQ ");
      var response = "";
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then(async function (result) {
          if (result.isConfirmed) {
            await faqServices.deleteFaq({
              faqid: faqID,
            });
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            response = result.isConfirmed;
            console.log("response", response);
          }
        })
        .then(() => {
          console.log("response inside the if:", response);
          if (response) {
            console.log("calling  get faq");
            console.log("Before deleting", this.faqList);
            this.getFAQ();
            console.log("After deleting", this.faqList);
          } else {
            console.log("Admin canceled the delete operation");
          }
        });
    },
    async addnewFAQ() {
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
      this.createFAQ(formValues[0], formValues[1]);
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    },
    async createFAQ(question, answer) {
      console.log("Creating the new FAQ");
      try {
        await faqServices.createFaq({
          question: question,
          answer: answer,
        });
      } catch (e) {
        console.log(e);
      }
      this.getFAQ();
      console.log("New FAQ created");
    },
  },
  created() {
    this.getFAQ();
  },
};
</script>
