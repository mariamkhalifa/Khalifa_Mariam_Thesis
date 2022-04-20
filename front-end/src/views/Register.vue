<template>
  <section class="user-auth-con">
    <img class="logo" src="/static/logo2.svg" alt="logo">
    <h2 class="main-heading">Create Account</h2>

    <form ref="registerForm" method="POST">

       <p>{{ error }}</p>

      <label for="username">Username:</label>
      <input v-model="username" id="username" name="username" type="text" placeholder="Enter your username...">
    
      <label for="email">Email:</label>
      <input v-model="email" id="email" name="email" type="email" placeholder="Enter your email...">
    
      <label for="password">Password:</label>
      <input v-model="password" id="password" name="password" type="password" placeholder="Enter your password...">
      
      <input @click.prevent="regsiterUser" type="submit" value="Register">

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
      password: null,
      email: null
    }
  },

  methods: {
    regsiterUser() {
      
      let url = `http://localhost:${process.env.VUE_APP_API_PORT}/register`;

      axios.post(url, { 
        'username': this.username,
        'email': this.email,
        'password': this.password
      })
      .then(response=>{
        console.log(response);
        if(response.data === 'Failed') {
          this.error = 'Sorry! something went wrong!'
        }
        else {
          console.log(response.data.token);
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

.user-auth-con {
  @include col;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 150px;

  h2 {
    color: $darkBlue;
    font-weight: bold;
    font-size: 1.5em;
    margin-top: 40px;
  }

  form {
    margin-top: 40px;
    @include col;
    width: 60vw;
    max-width: 400px;

    label {
      color: $darkBlue;
      font-weight: bold;
      font-size: 1.2em;
      margin-top: 20px;

      &:after {
        content: '*';
      }
    }

    input:not([type=submit]) {
      padding: 8px;
      border: 2px solid $grey;
      border-radius: 4px;
      margin-top: 15px;
      color: $darkBlue;
      font-size: 1.1em;

      &:focus {
        outline: none;
        border: 2px solid $lightBlue;
      }
    }

    input[type=submit] {
      margin-top: 40px;
      border: none;
      background-color: $mediumBlue;
      color: $white;
      font-size: 1.2em;
      font-weight: bold;
      font-family: $font;
      padding: 15px;
      border-radius: 5px;
      cursor: pointer;
      @include transitionEase;

      &:hover {
        background-color: $lightBlue;
        color: $darkBlue;
      }
    }
  }
}
</style>
