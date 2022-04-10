import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex"
import "./assets/css/reset.css";
import "./assets/css/main.css";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogged: false,
    userId: null,
    completed: [],
    totalPoints: [],
    dailyPoints: null,
    dailyGoal: null
  },
  mutations: {
    isLogged(state, status) {
      state.isLogged = status;
    },
    userId(state, id) {
      state.userId = id;
    },
    updateCompleted(state, myData) {
      state.completed = myData;
    },
    updateTotalPoints(state, myData) {
      state.totalPoints = myData;
    }
  },
  actions: {
    addToCompleted(context, payload) {
      const completed = context.state.completed;
      completed.push(payload);
      context.commit('updateCompleted', completed);
    },
    addToTotalPoints(context, payload){
      const totalPoints = context.state.totalPoints;
      totalPoints.push(payload);
      context.commit('updateTotalPoints', totalPoints);
    } 
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
