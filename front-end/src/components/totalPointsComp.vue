<template>
  <section class="points-con">
    <h4>Exp. Points: <span>{{ totalPoints }}</span></h4>
    <div class="total-points-meter">
      <div ref="bar" class="total-points"></div>
    </div>

    <transition name="fade">
      <div v-if="showLevelUp" class="level-up-con">
        <img src="/static/party.png" alt="party icon">
        <p>Congratulations!</p>
        <p>You've reached Level {{ this.userLevel }}</p>
      </div>
    </transition>
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
    },
    userId() {
      return localStorage.getItem('userId');
    },
    userLevel() {
      return this.$store.state.level;
    }
  },

  data() {
    return {
      showLevelUp: false
    }
  },

  mounted() {
    this.$refs.bar.style.width = `${this.totalPoints}%`;
    this.levelUp();
  }, 

  beforeUpdate() {
    this.$refs.bar.style.width = `${this.totalPoints}%`;
    this.levelUp();
  },

  methods: {
    levelUp() {
      if(this.totalPoints===100) {
        console.log('level up!');
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.showLevelUp = true;
        setTimeout(()=>{
          this.showLevelUp = false;
        }, 5000)
        let nextLevel = this.userLevel + 1;
        //console.log(nextLevel);
        let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}/level-up`;

        axios.post(url, {
          level : nextLevel
        })
        .then(response=>{
          //console.log(response.data);
          this.$store.commit('updateLevel', nextLevel);
          this.$store.commit('updateTotalPoints', [0]);
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }
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

    &:after {
      content: 'Lv. +';
      position: absolute;
      bottom: -5px;
      right: -35px;
      font-size: 14px;
      font-weight: bold;
      color: $mediumBlue;
    }

    .total-points {
      background-color: $lightBlue;
      border-radius: 3px;
      width: 0;
      height: 30px;
    }
  }

  .level-up-con {
    @include col;
    align-items: center;
    position: absolute;
    top: 200px;
    left: 0;
    padding: 50px 0;
    width: 100vw;
    height: 100vh;
    background-color: $white;
    z-index: 100;

    img {
      width: 100px;
    }

    p {
      margin-top: 20px;
      color: $mediumBlue;
      font-weight: bold;
      font-size: 1.5em;
    }
  }
</style>
