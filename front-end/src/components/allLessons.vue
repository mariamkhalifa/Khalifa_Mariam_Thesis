<template>
  <ul class="lesson-list">
    <li @click="showVideo" v-for="(lesson, index) in lessons" :key="index">
      <h4>{{ lesson.name }}</h4>
      <img class="video-placeholder" src="/static/video-placeholder3.svg" alt="video icon">
      <video v-if="showVideo" @ended="lessonEnd" :data-lesson="lesson._id" controls>
        <source :src="`/static/${lesson.video}.mp4`" type="video/mp4">
        <source :src="`/static/${lesson.video}.ogg`" type="video/mp4"> 
        Your browser does not support video.
      </video>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  props: ['username'],

  data() {
    return {
      lessons: [],
      showVideo: false
    }
  },

  computed: {
    userId() {
      return this.$store.state.userId;
    },
    completed() {
      return this.$store.state.completed;
    }
  },

  created() {
    // db call 
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/api/lessons`;

      axios.get(url)
      .then(response=>{
        //console.log(response);
        this.lessons = response.data;
      })
      .catch(err=>console.log(err));
  },

  methods: {
    showVideo() {
      this.showVideo = true;
    },

    lessonEnd() {
      //console.log('ended');
      //console.log(event.currentTarget);

      //console.log(this.userId);
      //console.log(event.currentTarget.dataset.lesson);
      let finishedLesson = event.currentTarget.dataset.lesson;

      let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}/lesson-end`;

      axios.post(url, {
        finishedLesson
      })
      .then(response=>{
        //console.log(response.data);
        //event.currentTarget.style.opacity = .5;
        this.$store.dispatch('addToCompleted', this.finishedLesson);
        this.$store.dispatch('addToTotalPoints', 5);
        this.$emit('updateKey');
      })
      .catch(err=>console.log(err));
    }
  }
};
</script>


<style lang="scss">
@import './../assets/sass/vars.scss';

  .lesson-list {
    @include row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80vw;
    margin: 40px auto 150px;

    li {
      margin: 0 auto;
      width: 300px;
      cursor: pointer;
    }

    h4 {
      text-align: center;
      position: relative;
      top: 55px;
      color: $darkBlue;
      font-size: 1.7em;
      font-weight: bold;
    }

    .video-placeholder {
      width: 100%;
    }

    video {
      width: 100%;
    }
  }

  
</style>
