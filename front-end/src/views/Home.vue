<template>
  <section>
    <header-comp></header-comp>
    
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>

    <total-points-comp :key="key"></total-points-comp>

    <all-lessons :username="username" @updateKey="updateKey"></all-lessons>
  </section>
</template>

<script>
import axios from 'axios';
import headerComp from './../components/headerComp.vue';
import allLessons from './../components/allLessons.vue';
import totalPointsComp from './../components/totalPointsComp.vue';

export default {
  props: ['username'],

  components: {
      headerComp,
      allLessons,
      totalPointsComp
  },

  data() {
    return {
      lessons: [],
      key: 0,
    }
  },

  created() {
    // confirm user is logged
    let isLogged = this.$store.state.isLogged;

    if(isLogged === false) {
      this.$router.push('/login');
    }

    // confirm authentication
    axios.get(`http://localhost:${process.env.VUE_APP_API_PORT}/protected`)
    .then(response=>{
        //console.log(response.data);
        // this.username = response.data;
      })
    .catch(err=>console.log(err));

    // get user info
    axios.get(`http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.username}`)
    .then(response=>{
        console.log(response.data);
        this.$store.commit('userId', response.data._id);
        this.$store.commit('updateTotalPoints', response.data.totalPoints);
        this.$store.commit('updateCompleted', response.data.completed);
      })
    .catch(err=>console.log(err));
  },

  methods: {
    updateKey() {
      this.key ++;
    }
  }
};


</script>

<style>

</style>
