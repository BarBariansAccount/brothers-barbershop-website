<template>
    <v-app app>
        <main>
            <Navbar @toggle="show=!show" :toggle="true" />
            <div class="menu-wrap ">
                <SideBar v-show="show" />
                <router-view class="router-view"></router-view>
            </div>
        </main>
    </v-app>
</template>
  
<script>
// import TopNav from '@/components/Layouts/Panel/TopNav.vue'
import Navbar from "@/components/Layouts/Default/Navbar.vue";
import SideBar from '@/components/Layouts/Panel/SideBar.vue'
export default {
    name: "panelLayout",
    components: {
        Navbar,
        SideBar
    },
    data() {
        return {
            drawer: false,
            show: true
        }
    }
};
</script>
<style scoped>
#app {
    background-color: #EFF3F8;
}

main {
    height: 100%;
    display: flex;
    flex-direction: column !important;

}

header {
    flex-grow: 0;

}

.menu-wrap {
    display: flex;
    /* height: 100%; */
    flex-grow: 1 !important;
}

.router-view {
    /* height: 100%; */
    flex-grow: 1;
    margin: 30px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
}
</style>