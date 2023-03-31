import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: null,
    selectedImageData: null,
    selectedImageFile: null,
    token: null,
    activeElement:null,
  },
  mutations: {
    setBarbershopStateToggle(state,p){
      state.activeElement = p
    },
    setUser(state, p) {
      state.user = p;
    },
    setSelectedImageData(state, p) {
      state.selectedImageData = p;
    },
    setSelectedImageFile(state, p) {
      state.selectedImageFile = p;
    },
    resetSelectedImageData(state) {
      state.selectedImageData = null;
    },
    resetSelectedImageFile(state) {
      state.selectedImageFile = null;
    },
    setToken(state, p) {
      state.token = p;
    },
  },
  actions: {
    logout({ commit }) {
      commit("setUser", null);
      commit("setToken", null);
    },
  },
  plugins: [vuexLocal.plugin],
});

export default store;
