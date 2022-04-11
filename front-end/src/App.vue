<template>
  <main>
    <h1 class="hidden">ASL Learning App</h1>
    <router-view />
  </main>
</template>

<script>

export default {
  name: "app",
};
</script>

<style lang="scss">
@import './assets/sass/vars.scss';

  body {
    color: $black;
    background: $white;
  }

  a {
    color: $black;
  }

</style>
