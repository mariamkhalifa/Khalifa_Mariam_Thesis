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

    <router-link to="/register">Register instead?</router-link>
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
      axios.defaults.withCredentials = true;
      axios.post(url, { 
        'username': this.username,
        'password': this.password
       })
      .then(response=>{
        //console.log(response.data);
        if(response.data === 'failed') {
          this.error = 'User does not exist. Please regsiter first.';
        }
        else {
          //console.log(response.data.token);
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('userId', response.data._id);
          this.$router.push('/');
        }
      })
      .catch(err=>console.log(err));
      
    }
  }
};


</script>

<style>

</style>
