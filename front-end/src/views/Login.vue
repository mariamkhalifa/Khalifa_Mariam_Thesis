<template>
  <section class="user-auth-con">
    <img class="logo" src="/static/logo2.svg" alt="logo">
    <h2 class="main-heading">Login</h2>

    <form ref="loginForm" method="POST">

      <p>{{ error }}</p>

      <label for="username">Username:</label>
      <input v-model="username" id="username" name="username" type="text" placeholder="Enter your username...">

      <label for="password">Password:</label>
      <input v-model="password" id="password" name="password" type="password" placeholder="Enter your password...">

      <input @click.prevent="loginUser" type="submit" value="Login">

      <router-link class="register-link" to="/register">Are you new? Create Account...</router-link>
    </form>

    
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

<style lang="scss">
@import './../assets/sass/vars.scss';

  .register-link {
    margin-top: 20px;
    color: $mediumBlue;
    text-align: left;
    align-self: flex-start;
    @include transitionEase;

    &:hover {
      color: $grey;
      text-decoration: underline;
    }
  }
</style>
