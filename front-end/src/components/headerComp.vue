<template>
  <header class="header">
    <img class="logo" src="/static/logo2.svg" alt="logo">
    <div @click="logout" class="logout-con">
      <p>Logout</p>
      <img src="/static/logout.png" alt="icon">
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/login');
    }
  }
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

  .logout-con {
    @include row;
    width: fit-content;
    height: fit-content;
    align-items: center;
    cursor: pointer;
    @include transitionEase;

    &:hover {
      transform: translateY(1px);
      opacity: .7;
    }

    p {
      color: $darkBlue;
      font-size: .9em;
      margin-right: 10px;
    }

    img {
      width: 20px;
      height: auto;
    }
  }
</style>
