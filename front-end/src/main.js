import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import "./assets/css/reset.css";
import "./assets/css/main.css";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogged: false,
  },
  mutations: {
    isLogged(state, status) {
      state.isLogged = status;
    }
  },
  actions: {}
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
