import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./routes/routes.js";

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
