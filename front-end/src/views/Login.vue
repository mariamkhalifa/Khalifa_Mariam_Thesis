<template>
  <section>
    <h2 class="main-heading">Login</h2>

    <form ref="loginForm" method="POST">

      <p>{{ error }}</p>

      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" id="username" name="username" type="text" placeholder="Enter your username...">
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" id="password" name="password" type="password" placeholder="Enter your password...">
      </div>

      <input @click.prevent="loginUser" type="submit" value="Login">

    </form>

    <router-link to="/register">Or register first?</router-link>
  </section>
    
</template>


<script>
import axios from 'axios';
export default {
  data() {
    return {
      error: null,
      processing: null,
      username: null,
      password: null

    }
  },

  methods: {
    loginUser() {

      let url = `http://localhost:${process.env.VUE_APP_API_PORT}/login`;

      axios.post(url, { 
        'username': this.username,
        'password': this.password
       })
      .then(response=>{
        console.log(response);
        if(response.data === 'failed') {
          this.error = 'User does not exist. Please regsiter first.';
        }
        else {
          this.$store.commit('isLogged', true);
          this.$router.push({name: 'home', params: { username: response.data }});
        }
      })
      .catch(err=>console.log(err));
      
    }
  }
};


</script>

<style>

</style>
