<template>
  <section>
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>
    <p>{{ isLogged }}</p>
  </section>
</template>

<script>

export default {
  props: ['username'],

  created() {
    
    let isLogged = this.$store.state.isLogged;

    if(isLogged === false) {
      this.$router.push('/login');
    }
  },


};

//use to get id from route this.$route.params.id
</script>

<style>

</style>
