<template>
  <nav id="mainNav">
    <h2 class="hidden">Main Navigation</h2>
    <ul>
      <router-link to="/">
        <li>Home</li>
      </router-link>

      <router-link to="/profile">
        <li>Profile</li>
      </router-link>

      <router-link to="/logout">
        <li>Logout</li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  
};
</script>


<style lang="scss">

</style>
