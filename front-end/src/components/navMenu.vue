<template>
  <nav id="mainNav">
    <h2 class="hidden">Main Navigation</h2>
    <i @click="toggleNav" class="fa fa-bars" :class="{ rotated : isVisible}"></i>
    <ul class="menu-list" :class="{ visible : isVisible }">
      <li>
        <router-link to="#">Account</router-link>
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
  data() {
    return {
      isVisible:  false
    }
  },

  methods: {
    logout() {
      axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/logout`)
      .then(()=>{
        this.$router.push('/login');
      })
    },

    toggleNav() {
      this.isVisible = this.isVisible ? false : true;
    }
  }
};
</script>


<style lang="scss">
@import './../assets/sass/vars.scss';

  .fa-bars {
    @include transitionEase;
    color: $darkBlue;
    font-size: 40px;
    margin-top: 10px;
    cursor: pointer;
    width: fit-content;
  }

  .fa-bars.rotated {
    transform: rotate(90deg);
  }

  .menu-list {
    display: none;
    @include transitionEase;
    text-align: right;
  }

  .menu-list.visible {
    display: block;
  }
</style>
