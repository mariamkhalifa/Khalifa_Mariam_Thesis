<template>
  <section>
    <h4>Total Points</h4>
    <p>{{ totalPoints }}</p>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    totalPointsArray() {
      return this.$store.state.totalPoints;
    },
    totalPoints() {
      let initialV = 0;
      return this.totalPointsArray.reduce((previousV,currentV)=>previousV + currentV, initialV);
    }

  }

  
};
</script>


<style lang="scss">
  
</style>
