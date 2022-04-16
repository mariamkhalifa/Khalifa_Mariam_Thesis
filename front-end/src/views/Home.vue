<template>
  <section>
    <header-comp></header-comp>
    
    <h2 class="hidden">Home</h2>
    <h3 class="welcome-msg">Hello {{ username}}</h3>

    <tabs-menu></tabs-menu>

    <total-points-comp :key="key"></total-points-comp>

    <all-lessons :username="username" @updateKey="updateKey"></all-lessons>
  </section>
</template>

<script>
import axios from 'axios';
import headerComp from './../components/headerComp.vue';
import tabsMenu from './../components/tabsMenu.vue';
import allLessons from '../components/allLessons.vue';
import totalPointsComp from './../components/totalPointsComp.vue';

export default {
  computed: {
    username() {
      return localStorage.getItem('username');
    }
  },

  components: {
      headerComp,
      tabsMenu,
      allLessons,
      totalPointsComp
  },

  data() {
    return {
      lessons: [],
      key: 0,
    }
  },

  mounted() {
    // confirm auth user
    let token = localStorage.getItem('userToken');
    if (!token) {
      this.$router.push('/login');
    }
  },

  methods: {
    updateKey() {
      this.key ++;
    }
  }
};
</script>

<style lang="scss">
@import './../assets/sass/vars.scss';
  .welcome-msg {
    margin-left: 20px;
    margin-top: 40px;
    font-size: 1.5em;
    font-weight: bold;
    color: $mediumBlue;
  }
</style>
