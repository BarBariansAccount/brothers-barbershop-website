import Vue from "vue";
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state,p) {
      state.user=p
    },

  },

  plugins: [vuexLocal.plugin]
})

export default store