import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/index.js';
import VueRouter from "vue-router";
import Routes from "./routes/routes.js";
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

// middleware
router.beforeEach((to, _, next) => {
  // get token
  const token = router.app.$store.state.token;
  // const role = router.app.$store.state.user?.role;

  let publicPages = ["HomeRoute", "Home", 'BarbersManagement', 'Gallery', 'Appointment', 'AppointmentDetail'];

  // public routes based on role
  // if (role == "Admin") publicPages.push(["/panel/admin", ""]);
  // if (role == "Barber") publicPages.push('/panel/barber', '/panel/availabilities', '/panel/profile/edit_profile', '/panel/profile/change-password', '/panel/profile/unsubscribe')
  // if (role == "Customer") publicPages.push('/panel', '/panel/orders', '/panel/profile/edit_profile', '/panel/profile/change-password', '/panel/profile/unsubscribe')


  // needed auth routes
  const authRequired = !publicPages.includes(to.name);

  // trying to access a restricted page + no token
  // redirect to home page
  if (authRequired && !!token == false) {
    console.log(to)
    next("/");
  }

  next();
});

new Vue({
  store: store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
