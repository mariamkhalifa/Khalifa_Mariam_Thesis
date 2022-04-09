<template>
  <section>
    <header-comp></header-comp>
    
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>

    <all-lessons :username="username"></all-lessons>
  </section>
</template>

<script>
import axios from 'axios';
import headerComp from './../components/headerComp.vue';
import allLessons from './../components/allLessons.vue';

export default {
  props: ['username'],

  components: {
      headerComp,
      allLessons
  },

  data() {
    return {
      lessons: []
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
        console.log(response.data);
        // this.username = response.data;
      })
    .catch(err=>console.log(err));

    // get user id
    axios.get(`http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.username}`)
    .then(response=>{
        console.log(response.data);
        this.$store.commit('userId', response.data._id);
      })
    .catch(err=>console.log(err));
  }
};


</script>

<style>

</style>
