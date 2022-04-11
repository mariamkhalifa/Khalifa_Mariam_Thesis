<template>
  <header class="header">
    <img class="logo" src="/static/logo2.svg" alt="logo">
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
@import './../assets/sass/vars.scss';

  .header {
    @include row;
    justify-content: space-between;
    padding: 20px;
  }
  .logo {
    width: 80px;
  }
</style>
