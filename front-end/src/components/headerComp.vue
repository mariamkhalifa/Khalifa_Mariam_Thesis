<template>
  <header>
    <img class="logo" src="/static/logo.svg" alt="logo">
    <nav-menu></nav-menu>
  </header>
</template>

<script>
import navMenu from './../components/navMenu.vue';
export default {
  components: {
      navMenu
  },
};
</script>


<style lang="scss">
  .logo {
    width: 50px;
  }
</style>
