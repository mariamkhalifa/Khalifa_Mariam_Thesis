<template>
  <section>
    <header-comp></header-comp>
    
    <h2 class="hidden">Home</h2>
    <h3 class="welcome-msg">Hello {{ username }}</h3>
    <p class="welcome-level">Level {{ this.userLevel }}</p>

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
    },
    userId() {
      return localStorage.getItem('userId');
    },
    userLevel() {
      return this.$store.state.level;
    }
  },

  created() {
    // get user data
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}`;

    axios.get(url)
    .then(response=>{
      //console.log(response.data);
      this.$store.commit('updateCompleted', response.data.completed);
      this.$store.commit('updateTotalPoints', response.data.totalPoints);
      this.$store.commit('updateLevel', response.data.level);
    })
    .catch(err=>{
      console.log(err);
    })
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
      //console.log(this.key);
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
    color: $darkBlue;
  }

  .welcome-level {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 1.2em;
    font-weight: bold;
    color: $mediumBlue;
  }
</style>
