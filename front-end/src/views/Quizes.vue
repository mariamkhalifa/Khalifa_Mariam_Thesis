<template>
  <div>
    <header-comp></header-comp>

    <section class="quiz-main">
      <h2>Quizes</h2>
      <p class="quiz-list-title">Pick a quiz...</p>
      
      <ul class="quiz-list">
        <li class="quiz-name-con" @click="pickQuiz" data-num="1">
            <p>Quiz 1</p>
            <p>Alphabets</p>
        </li>
        <li class="quiz-name-con" @click="pickQuiz" data-num="2">
          <p>Quiz 2<p>
          <p>Numbers 1 - 20</p>
        </li>
      </ul>

      <div class="quiz-btn" @click="startQuiz"><p>Start Quiz</p></div>
      <quiz v-if="quiz" :num="this.quizNum" @endQuiz="endQuiz"></quiz>
      
    </section>

    <tabs-menu></tabs-menu>
  </div>
</template>

<script>
import axios from 'axios';
import headerComp from './../components/headerComp.vue';
import tabsMenu from './../components/tabsMenu.vue';
import Quiz from './../components/quiz.vue';


export default {
  components: {
    headerComp,
    tabsMenu,
    Quiz
  },

  data() {
    return {
      quiz: false,
      quizNum: null,
      picked: false
    }
  },

  methods: {
    pickQuiz() {
      this.quizNum = this.quizNum ? null : event.currentTarget.dataset.num ;
      event.currentTarget.classList.toggle('picked');
    },

    startQuiz() {
      this.quiz = true;
    },

    endQuiz() {
      this.quiz = false;
      console.log('fired');
    },
  }
};


</script>

<style lang="scss">
@import './../assets/sass/vars.scss';

.quiz-main {
  h2 {
    margin-top: 40px;
    text-align: center;
    font-size: 2em;
    color: $darkBlue;
    font-weight: bold;
  }
  
  .quiz-list-title {
    text-align: center;
    font-size: 1.3em;
    color: $mediumBlue;
    margin-top: 60px;
  }
}

.quiz-list {
  @include row;
  width: fit-content;
  gap: 10%;
  margin: 30px auto 20px;
}

.quiz-name-con {
  margin: 10px;
  padding: 40px 20px;
  width: 150px;
  border-radius: 5px;
  border: 4px solid $mediumBlue;
  color: $mediumBlue;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  @include transitionEase;

  &:hover {
    border: 4px solid $lightBlue;
    color: $darkBlue;
  }
  
  p:last-child {
    margin-top: 10px;
  }
}

.quiz-name-con.picked {
  border: 4px solid $lightBlue;
  color: $darkBlue;
  background-color: rgba($color: $lightBlue, $alpha: .2);
}

.quiz-btn {
  background-color: $mediumBlue;
  color: $white;
  font-weight: bold;
  width: 250px;
  padding: 30px 0;
  border-radius: 5px;
  border: 4px solid $mediumBlue;
  @include col;
  align-items: center;
  margin: 50px auto 200px;
  cursor: pointer;
  @include transitionEase;

  &:hover {
    background-color: $white;
    border-color: $darkBlue;
    color: $darkBlue;
  }
}

</style>
