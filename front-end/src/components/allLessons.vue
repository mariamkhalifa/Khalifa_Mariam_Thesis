<template>
  <div>
    <ul class="lesson-list">
      <li v-for="(lesson, index) in lessons" :key="index" :id="lesson._id">
        <h4>{{ lesson.name }}</h4>
        <img @click="showVideo" :data-video="lesson.video" :data-id="lesson._id" class="video-placeholder" src="/static/video-placeholder4.svg" alt="video icon">
      </li>
    </ul>

    <div v-if="lightbox" ref="lightbox" class="lightbox" :class="{ visible : lightbox }">
      <div @click="hideVideo" class="close">
        <p>X</p>
      </div>
      <video ref="video" class="video" @ended="lessonEnd" controls>
        <source ref="src1" :src="`/static/any.mp4`" type="video/mp4">
        <source ref="src2" :src="`/static/any.ogg`" type="video/mp4">
        Sorry, Your browser does not support video!
      </video>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      lessons: [],
      lightbox: false
    }
  },

  computed: {
    userId() {
      return localStorage.getItem('userId');
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
      this.lightbox = this.lightbox ? false : true ;

      this.$nextTick(()=>{
        let src = event.currentTarget.dataset.video;
        let id = event.currentTarget.dataset.id;
        
        this.$refs.video.setAttribute('data-lesson', id);
        this.$refs.src1.src = `/static/${src}.mp4`;
        this.$refs.src2.src = `/static/${src}.ogg`;
      });
    },

    hideVideo() {
      console.log('clicked');
      this.lightbox = this.lightbox ? false : true ;
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
        console.log(document.getElementById(finishedLesson));
        document.getElementById(finishedLesson).classList.add('complete');
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
      position: relative;
    }

    h4 {
      text-align: center;
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      margin: auto;
      color: $darkBlue;
      font-size: 1.7em;
      font-weight: bold;
      cursor: pointer;
    }

    .video-placeholder {
      width: 100%;
      cursor: pointer;
    }
  }

  .complete {
    background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5));
  }

  .lightbox {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      padding-bottom: 80px;
      z-index: 20;
      background-color: rgba($color: $darkBlue, $alpha: .3);

      .close {
        position: relative;
        z-index: 100;
        margin-top: 80px;
        padding: 15px 20px;
        border-radius: 50px;
        border: 4px solid $darkBlue;
        @include col;
        align-items: center;
        cursor: pointer;
        @include transitionEase;
        color: $darkBlue;
          font-size: 30px;
          font-weight: bold;

        &:hover {
          background-color: $darkBlue;
          color: $white;
        }
      }

      .video {
        margin-top: 60px;
        width: 80%;
      }
    }

    .lightbox.visible {
      @include col;
      align-items: center;
    }

  
</style>
