<template>
  <section>
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>
    <p>{{ isLogged }}</p>
  </section>
</template>

<script>
import axios from 'axios';
import NavMenu from './../components/navMenu.vue'; 
export default {
  props: ['username'],

  created() {
    
    let isLogged = this.$store.state.isLogged;

    if(isLogged === false) {
      this.$router.push('/login');
    }
  },

  created() {
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/api/lessons`;

      axios.get(url)
      .then(response=>{
        console.log(response);
        this.lessons = response.data;
      })
      .catch(err=>console.log(err));
  }
};


</script>

<style>

</style>
