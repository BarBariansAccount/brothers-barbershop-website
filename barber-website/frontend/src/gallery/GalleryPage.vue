<template>
  <div><h1>Gallery Page</h1>
    <v-row>
     <!--Istagram section-->
     <InstaSection></InstaSection>
    </v-row>
  </div>
</template>

<script>
import InstaSection from "@/components/Pages/Home/Instagram/InstagramSec.vue";
export default {
  name: "GalleryPage",
  components: {
    InstaSection,
  },

  InstaSection,
}
</script>
<style>

</style>