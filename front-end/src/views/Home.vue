<template>
  <section>
    <h2>Home</h2>
    <h3>Hello {{ username }}</h3>
    <nav-menu></nav-menu>
  </section>
</template>

<script>
import axios from 'axios';
import NavMenu from './../components/navMenu.vue'; 
export default {
  components: {
    NavMenu
  },

  props: ['username'],

  data() {
    return {
      lessons: []
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
