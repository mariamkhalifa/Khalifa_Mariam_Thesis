<template>
  <section class="points-con">
    <h4>Exp. Points: <span>{{ totalPoints }}</span></h4>
    <div class="total-points-meter">
      <div ref="bar" class="total-points"></div>
    </div>
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
  },

  mounted() {
    this.$refs.bar.style.width = `${this.totalPoints}%`;
  }

  
};
</script>


<style lang="scss">
@import './../assets/sass/vars.scss';
  .points-con {
    @include row;
    align-items: center;
    margin-top: 40px;
    margin-left: 22px;
    font-size: 1.2em;

    h4 {
      font-weight: bold;
      color: $mediumBlue;
    }
  }

  .total-points-meter {
    width: 200px;
    height: 30px;
    border-radius: 5px;
    border: 2px solid $mediumBlue;
    //margin-top: 30px;
    margin-left: 60px;
    position: relative;

    &:before {
      content: 'Lv. 1';
      position: absolute;
      top: -5px;
      left: -35px;
      font-size: 12px;
      color: $mediumBlue;
    }

    &:after {
      content: 'Lv. 2';
      position: absolute;
      bottom: -5px;
      right: -35px;
      font-size: 12px;
      color: $mediumBlue;
    }

    .total-points {
      background-color: $lightBlue;
      border-radius: 3px;
      width: 0;
      height: 30px;
    }
  }
</style>
