<template>
  <section>
    <h2 class="main-heading">Register</h2>

    <form ref="registerForm" method="POST">

      <p>{{ error }}</p>

      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" id="username" name="username" type="text" placeholder="Enter your username...">
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" id="email" name="email" type="email" placeholder="Enter your email...">
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" id="password" name="password" type="password" placeholder="Enter your password...">
      </div>

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
          this.$store.commit('isLogged', true);
          this.$router.push({name: 'home', params: { username: response.data } });
        }
      })
      .catch(err=>console.log(err));
      
    }
  }
};


</script>

<style>

</style>
