<template>
<transition name="fade">
  <form class="avatar-form">
    <span @click="closeForm" class="close-form">x</span>
    <label for="avatar">Pick Your Avatar</label>

    <ul>
      <li @click="pickAvatar"><img src="/static/avatar-b-1.png" alt="avatar 1"></li>
      <li @click="pickAvatar"><img src="/static/avatar-g-1.png" alt="avatar 2"></li>
      <li @click="pickAvatar"><img src="/static/avatar-b-2.png" alt="avatar 3"></li>
      <li @click="pickAvatar"><img src="/static/avatar-g-2.png" alt="avatar 4"></li>
      <li @click="pickAvatar"><img src="/static/avatar-b-3.png" alt="avatar 5"></li>
      <li @click="pickAvatar"><img src="/static/avatar-g-3.png" alt="avatar 6"></li>
    </ul>

    <input class="hidden" id="avatar" name="avatar" v-model="avatar" type="text">

    <input @click.prevent="addAvatar" type="submit" value="Submit">
  </form>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  computed: {
    userId() {
      return localStorage.getItem('userId');
    }
  },

  data() {
    return {
      avatar: '',
    }
  },

  methods: {
    closeForm() {
      this.$emit('hideForm');
    },

    pickAvatar() {
      event.currentTarget.firstElementChild.classList.toggle('selected');
      let imgSrc = event.currentTarget.firstElementChild.src.slice(29);
      
      this.avatar = this.avatar ? null : imgSrc;
      console.log(this.avatar);
    },

    addAvatar() {
      let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}/avatar`;

      axios.post(url, {
        avatar: this.avatar
      })
      .then(response=>{
        //console.log(response.data);
        this.$emit('updateKey');
        this.$store.commit('updateAvatar', this.avatar);
      })
      .catch(err=>console.log(err));
    }
  }
};
</script>


<style scoped lang="scss">
@import './../assets/sass/vars.scss';

  .avatar-form {
    @include col;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $white;
    padding-top: 100px;

    .close-form {
      display: block;
      margin: 0 auto;
      text-align: center;
      font-size: 1.5em;
      font-weight: bold;
      color: $mediumBlue;
      padding: 2px 5px 5px;
      width: 22px;
      border-radius: 60px;
      border: 2px solid $darkBlue;
      cursor: pointer;
      @include transitionEase;

      &:hover {
        border-color: $lightBlue;
        color: $lightBlue;
        transform: translateY(.5px);
      }
    }

    label {
      color: $darkBlue;
      font-size: 2em;
      font-weight: bold;;
      margin-top: 30px;
    }

    input[type=submit] {
      border: none;
      margin-top: 30px;
      background-color: $darkBlue;
      color: $white;
      font-size: 1.5em;
      font-weight: bold;
      width: 150px;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      @include transitionEase;

      &:hover {
        background-color: $lightBlue;
        color: $darkBlue;
      }
    }

    ul {
      margin-top: 20px;
      display: grid;
      grid-template-columns: repeat(3,1fr);

      li {
        width: 70px;
        margin: 20px;
        cursor: pointer;
        @include transitionEase;

        &:hover {
          transform: translateY(1px);
        }

        img {
          width: 100%;
          padding: 8px;
          border-radius: 70px;
          border: 2px solid $mediumBlue;
          @include transitionEase;

          &:hover {
            border-color: $lightBlue;
            opacity: .8;
          }
        }
      }

      .selected {
        border: 2px solid $lightBlue;
        background-color: rgba($color: $lightBlue, $alpha: .4);
        transform: translateY(1px);
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(-50px)
  }
 
  
</style>
