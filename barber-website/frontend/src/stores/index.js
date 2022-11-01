import Vue from "vue";
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: null,
    token:null
  },
  mutations: {
    setUser(state,p) {
      state.user=p
    },
    setToken(state,p) {
      state.token=p
    },

  },

  plugins: [vuexLocal.plugin]
})

export default store