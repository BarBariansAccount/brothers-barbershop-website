<template>
  <v-row>
    <v-col>
      <v-btn @click="onSubmit">Delete Account</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/user";
import Swal from "sweetalert2";

export default {
  data: () => ({
    show4: false,
  }),
  methods: {
    async onSubmit() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            console.log(this.$store.state.token);
            await UserService.deleteUserProfile({
              headers: { Authorization: "Bearer " + this.$store.state.token },
            });

            Swal.fire({
              timer: 1000,
              icon: "success",
              title: "success",
              text: "Account deleted successfully",
            });

            setTimeout(() => {
              this.$store.dispatch("logout");
              this.$router.push("/");
              console.log("Delayed execution complete!");
            }, 1000);
          } catch (error) {
            console.log("error", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "something went wrong",
            });
          }
        }
      });
    },
  },
};
</script>
