<template>
    <v-app>
        <Navbar />
        <v-main>
            <router-view></router-view>
        </v-main>
        <Footer />
    </v-app>
</template>
  
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
    name: "defaultLayout",
    components: { Navbar, Footer },

};
</script>