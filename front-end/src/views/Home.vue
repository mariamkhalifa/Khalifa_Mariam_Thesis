<template>
  <section>
    <h2>Home</h2>
    <h3>Hello {{ username}}</h3>
  </section>
</template>

<script>

export default {
  props: ['username']
};

//use to get id from route this.$route.params.id
</script>

<style>

</style>
