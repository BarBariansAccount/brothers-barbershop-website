import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./routes/routes.js";
import store from "./stores/index";
// import auth from "./middleware/auth"

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

// middleware
router.beforeEach((to, _, next) => {
  // get token
  const token = router.app.$store.state.token;
  const role = router.app.$store.state.user?.role;

  let publicPages = ["/", "/gallery", "/appointment", "/products"];

  // public routes based on role
  if (role == "Admin") publicPages = ["/admin", ""];
  if (role == "Barber") publicPages.push('/panel', '/panel/availabilities', '/panel/profile/edit_profile', '/panel/profile/change-password', '/panel/profile/unsubscribe')
  if (role == "Customer") publicPages.push('/panel', '/panel/orders', '/panel/profile/edit_profile', '/panel/profile/change-password', '/panel/profile/unsubscribe')


  // needed auth routes
  const authRequired = !publicPages.includes(to.path);

  // trying to access a restricted page + no token
  // redirect to home page
  if (authRequired && !!token == false) {
    console.log(to)
    next("/");
  }

  next();
});

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
