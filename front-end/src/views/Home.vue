<template>
  <section>
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>
    
  </section>
</template>

<script>
import axios from 'axios';

export default {
  //props: ['username'],

  data() {
    return {
      lessons: []
    }
  },

  created() {
    // confirm user is logged
    // let isLogged = this.$store.state.isLogged;

    // if(isLogged === false) {
    //   this.$router.push('/login');
    // }

    // confirm authentication
    axios.get(`http://localhost:${process.env.VUE_APP_API_PORT}/protected`)
    .then(response=>{
        console.log(response);
        this.username = response.data;
      })
      .catch(err=>console.log(err));

    // db call 
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/api/lessons`;

      axios.get(url)
      .then(response=>{
        console.log(response);
        this.lessons = response.data;
      })
      .catch(err=>console.log(err));
  },


};

//use to get id from route this.$route.params.id
</script>

<style>

</style>
