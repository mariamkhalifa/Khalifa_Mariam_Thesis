<template>
  <section>
    <h2 class="hidden">Profile</h2>
    <header-comp></header-comp>

    <div class="profile-con">
      <img v-if="!userAvatar" class="avatar" src="/static/avatar-default.png" alt="user avatar">
      <img v-if="userAvatar" :key="key" class="avatar" :src="`/static/${this.userAvatar}`" alt="user avatar">
      <img @click="showForm" class="edit-avatar" src="/static/edit.png" alt="pen icon">
      <h3>{{ username }}</h3>

      <p>{{ this.userLevel }}</p>
      
      <total-points-comp></total-points-comp>

      <transition name="fade">
        <avatar-form v-if="visible" @hideForm="hideForm" @updateKey="updateKey"></avatar-form>
      </transition>
    </div>

    <tabs-menu></tabs-menu>
  </section>
</template>

<script>
import axios from 'axios';
import headerComp from './../components/headerComp.vue';
import tabsMenu from './../components/tabsMenu.vue';
import totalPointsComp from './../components/totalPointsComp.vue';
import avatarForm from './../components/avatarForm.vue';

export default {
  computed: {
    username() {
      return localStorage.getItem('username');
    },
    userId() {
      return localStorage.getItem('userId');
    },
    userAvatar() {
      return this.$store.state.avatar;
    },
    userLevel() {
      return this.$store.state.level;
    }
  },

  created() {
    // get user data
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}`;

      axios.get(url)
      .then(response=>{
        //console.log(response);
        this.user = response.data;
        this.$store.commit('updateAvatar', this.user.avatar);
        this.$store.commit('updateTotalPoints', this.user.totalPoints);
      })
      .catch(err=>console.log(err));
  },

  components: {
      headerComp,
      tabsMenu,
      totalPointsComp,
      avatarForm
  },

  data() {
    return {
      user: '',
      key: 3,
      visible: false
    }
  },

  mounted() {
    // confirm auth user
    let token = localStorage.getItem('userToken');
    if (!token) {
      this.$router.push('/login');
    }
  },

  methods: {
    updateKey() {
      this.key ++;
      this.visible = false;
    },

    showForm() {
      this.visible = true;
    },

    hideForm() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
@import './../assets/sass/vars.scss';

  .profile-con {
    margin-top: 80px;
    margin-left: 20px;
    margin-bottom: 150px;
    padding-top: 20px;

    h3, p {
      margin-top: 15px;
      margin-left: 20px;
      color: $darkBlue;
      font-size: 1.5em;
      font-weight: bold;
    }
  }

  .avatar {
    width: 100px;
    border-radius: 100px;
    padding: 10px;
    border: 5px solid $mediumBlue;
  }

  .edit-avatar {
    width: 30px;
    cursor: pointer;
    @include transitionEase;

    &:hover {
      opacity: .8;
      transform: translateY(.5px);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(-50px)
  }

  @media screen and (min-width:700px) {
    .profile-con {
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
      padding-left: 120px;
      padding-bottom: 40px;
      border-left: 5px solid rgba($grey, .5);
    }
  }
  
</style>
