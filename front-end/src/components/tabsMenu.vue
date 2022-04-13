<template>
  <nav id="mainNav">
    <h2 class="hidden">Main Navigation</h2>
    <ul class="tabs-menu">
      <li>
        <i class="fas fa-book-open"></i>
        <router-link to="/">Lessons</router-link>
      </li>

      <li>
        <i class="fas fa-question"></i>
        <router-link to="/quizes">Quizes</router-link>
      </li>

      <li>
        <i class="fas fa-user"></i>
        <router-link to="/profile">Profile</router-link>
      </li>

    </ul>
  </nav>
</template>

<script>
export default {
  
};
</script>


<style lang="scss" scoped>
@import './../assets/sass/vars.scss';

  .tabs-menu {
    @include row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 10px 0;
    background-color: $white;
    border-top: 1.8px solid rgba($color: #000000, $alpha: .1);

    li {
      padding: 10px 0;
      @include col;
      align-items: center;
      width: 33.333vw;
      cursor: pointer;

      a {
        font-weight: bold;
        color: $mediumBlue;
      }
    }

    li:nth-child(2) {
      border-left: .5px solid $grey;
      border-right: .5px solid $grey;
    }
  }

  .fas {
    color: $mediumBlue;
    font-size: 30px;
    margin-bottom: 8px;
  }

</style>
