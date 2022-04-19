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
    completed: [],
    totalPoints: [],
    avatar: null,
    dailyPoints: null,
    level: 1
  },
  mutations: {
    updateCompleted(state, myData) {
      state.completed = myData;
    },
    updateTotalPoints(state, myData) {
      state.totalPoints = myData;
    },
    updateAvatar(state, myData) {
      state.avatar = myData;
    },
    updateLevel(state, myData) {
      state.level = myData;
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
    },
    addToLevel(context){
      const level = context.state.level;
      level++
      context.commit('updatelevel', level);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
