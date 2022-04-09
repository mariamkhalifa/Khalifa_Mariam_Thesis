<template>
  <ul>
    <li v-for="(lesson, index) in lessons" :key="index">
      <h4>{{ lesson.name }}</h4>
      <video @ended="lessonEnd" :data-lesson="lesson._id" controls>
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
      complete: false
    }
  },

  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },

  created() {
    // db call 
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/api/lessons`;

      axios.get(url)
      .then(response=>{
        console.log(response);
        this.lessons = response.data;
      })
      .catch(err=>console.log(err));
  },

  methods: {
    lessonEnd() {
      console.log('ended');
      console.log(event.currentTarget);

      //console.log(this.userId);
      //console.log(event.currentTarget.dataset.lesson);
      let finishedLesson = event.currentTarget.dataset.lesson;

      let url = `http://localhost:${process.env.VUE_APP_API_PORT}/user/${this.userId}/lesson-end`;

      axios.post(url, {
        finishedLesson
      })
      .then(response=>{
        console.log(response.data);
        this.complete = true
      })
      .catch(err=>console.log(err));
    }
  }
};
</script>


<style lang="scss">
  video {
    width: 100%;
  }
</style>
