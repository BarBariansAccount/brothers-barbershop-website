<template>
  <v-row>
    <!--Instagram section-->
    <InstaSection></InstaSection>
  </v-row>
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
.crt-post .crt-post-content-image:hover IMG {
  transform: scale(1.3);
}
.crt-post .crt-post-content-image IMG{
  transition: all 0.5s ease-in-out;

}
.crt-widget .crt-post-text  ,.crt-widget .crt-post-header {
  display: none;
}


</style>