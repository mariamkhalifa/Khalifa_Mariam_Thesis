<template>
  <nav id="mainNav">
    <h2 class="hidden">Main Navigation</h2>
    <ul>
      <li>
        <router-link to="/">Lessons</router-link>
      </li>

      <li>
        <router-link to="/quizes">Quizes</router-link>
      </li>

      <li>
        <router-link to="/profile">Profile</router-link>
      </li>

      <li @click.prevent="logout">
        <router-link to="#">Logout</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    logout() {
      axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/logout`)
      .then(()=>{
        this.$router.push('/login');
      })
    }
  }
};
</script>


<style lang="scss">

</style>
