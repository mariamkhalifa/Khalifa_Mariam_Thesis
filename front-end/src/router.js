import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Quizes from "./views/Quizes.vue";
import Profile from "./views/Profile.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/quizes',
      component: Quizes,
      props: true
    },
    {
      path: '/profile',
      component: Profile,
      props: true
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});
