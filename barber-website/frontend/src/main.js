import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Routes from "./routes/routes.js";
import store from './stores/index'
// import auth from './middleware/auth'

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

// middleware
router.beforeEach((to, _, next) => {

  // get token
  const token = router.app.$store.state.token
  const role = router.app.$store.state.user?.role

  let publicPages = [];


  // public routes based on role
  if (role == 'ADMIN') publicPages = ['/']
  if (role == 'BARBER') publicPages = ['/']
  if (role == 'CUSTOMER') publicPages = ['/']
  else publicPages = ['/']

  // needed auth routes
  const authRequired = !publicPages.includes(to.path);

  // trying to access a restricted page + no token
  // redirect to home page
  if (authRequired && !!token == false) {
    next('/');
  }

  next()
})

new Vue({
  store,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
