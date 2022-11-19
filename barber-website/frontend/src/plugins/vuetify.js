import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import CustomPlusIcon from "@/components/Pages/Home/Faq/PlusIconComponent.vue";
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    values: {
      custom: { // name of our custom icon
        component: CustomPlusIcon, // our custom component
      },
    },
  }
  // theme: {
  //     themes: {
  //       light: {
  //         primary: '#5F6BBA',
  //         secondary: '#b0bec5',
  //         accent: '#8c9eff',
  //         error: '#b71c1c',
  //       },
  //     },
  //   },
});
