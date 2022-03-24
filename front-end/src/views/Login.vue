<template>
  <section>
    <h2 class="main-heading">Login</h2>

    <form ref="loginForm" method="POST">

      <div class="form-group">
        <label for="username">Username:</label>
        <input id="username" name="username" type="text" placeholder="Enter your username...">
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="Enter your password...">
      </div>

      <input @click.prevent="loginUser" type="submit" value="Login">

    </form>
  </section>
    
</template>


<script>
export default {
  data() {
    return {
      errors: null,
      processing: null,

    }
  },

  methods: {
    loginUser() {

      let formData = new FormData(this.$refs.loginForm);

      fetch("http://localhost:3002/login",{
        method: 'POST',
        body: formData
      })
      .catch(err=>console.log(err));
    }
  }
};


</script>

<style>

</style>
