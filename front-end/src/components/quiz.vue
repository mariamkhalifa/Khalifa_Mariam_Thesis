<template>
  <div class="quiz-con">
    <div class="close-quiz">X</div>
    <h3>Quiz {{ this.num }}</h3>

    <ul class="questions-con">
      <li class="question" v-for="(question, index) in questions" :key="index">
        <p>{{ question.question }}</p>
        <img :src="`/static/${question.img}`" alt="sign">
        <form>
          <input type="text" v-model="answer">
          <input @click.prevent="checkAnswer" :data-answer="question.answer" type="submit" value="Submit">
        </form>
      </li>
    </ul>

    <div @click="calculate" class="quiz-submit-btn"><p>Submit Quiz</p></div>

    <div v-if="result" class="result">
      <p class="result-percent">{{ this.percentage }} %</p>
      <p class="result-msg">{{ this.resultMessage }}</p>
      <div @click="restartQuiz" class="retake-btn"><p>Retake Quiz</p></div>
      <div @click="endQuiz" class="close-quiz-btn"><p>Close</p></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['num'],

  data() {
    return {
      questions: [],
      total: 0,
      answer: '',
      score: 0,
      percentage: 0,
      result: false,
      resultMessage: '',
    }
  },

  created() {
    let url = `http://localhost:${process.env.VUE_APP_API_PORT}/api/quizes/${this.num}`;

      axios.get(url)
      .then(response=>{
        //console.log(response);
        let unshuffled = response.data;
        this.total = unshuffled.length;
        this.questions = this.shuffleArray(unshuffled);
      })
      .catch(err=>console.log(err));
  },

  methods: {
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      //console.log(arr);
      return arr;
    },

    checkAnswer() {
      let qAnswer = event.currentTarget.dataset.answer;
      //console.log(qAnswer);
      let uAnswer = this.answer.toUpperCase().trim();
      //console.log(uAnswer);

      if(qAnswer === uAnswer) {
        console.log('correct');
        this.score ++;
      } else {
        console.log('false');
      }

      this.answer = '';
    },

    calculate() {
      //console.log('called');
      this.result = true;
      this.percentage = Math.round(this.score / this.total * 100);
      //console.log(this.percentage);

      if(this.percentage >= 70) {
        //console.log('you passed!');
        this.resultMessage = 'You Passed!'
      } else {
        //console.log('please try again!');
        this.resultMessage = 'Sorry you did not pass. You need at least 70%.';
      }
    },

    restartQuiz() {
      this.score = 0;
      this.percentage = 0;
      this.answer = '';
      this.result = false;
      this.resultMessage = ''
    },

    endQuiz() {
      //console.log('end');
      this.$emit('endQuiz');
    }
  }
  
};
</script>


<style scoped lang="scss">
@import './../assets/sass/vars.scss';

  .quiz-con {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100vw;
    background-color: $white;
    @include col;
    align-items: center;
    margin: 120px auto 500px;

    .close-quiz {
      font-size: 2em;
      color: $darkBlue;
      border-radius: 100px;
      padding: 10px 15px;
      border: 2px solid $darkBlue;
      font-weight: bold;
      cursor: pointer;
      @include transitionEase;

      &:hover {
        color: $lightBlue;
        border-color: $lightBlue;
        transform: translateY(1px);
      }
    }

    h3 {
      color: $darkBlue;
      font-weight: bold;
      font-size: 2em;
      margin-top: 40px;
    }
  }

  .question {
    margin-top: 40px;

    p {
      font-size: 1.2em;
      text-align: center;
    }

    img {
      width: 200px;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    form {
      @include col;
      align-items: center;

      input[type=text] {
        padding: 8px;
        border-radius: 4px;
        font-size: 1.1em;
        color: $grey;
        border: 1px solid $mediumBlue;

        &:focus {
          outline: none !important;
          border-color: $lightBlue;
        }
      }

      input[type=submit] {
        border: none;
        background-color: $mediumBlue;
        padding: 15px;
        border-radius: 5px;
        color: $white;
        margin-top: 10px;
        width: 100%;
        cursor: pointer;
        @include transitionEase;

        &:hover {
          background-color: $lightBlue;
          color: $darkBlue;
        }
      }
    }
  }

  .quiz-submit-btn {
    background: $darkBlue;
    color: $white;
    width: 250px;
    padding: 25px;
    border-radius: 5px;
    border: 4px solid $darkBlue;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    margin: 40px auto 200px;
    cursor: pointer;
    @include transitionEase;

    &:hover {
      color: $darkBlue;
      border-color: $lightBlue;
      background-color: $white;
    }
  }

  .result {
    position: absolute;
    width: 100%;
    height: 100vh;
    bottom: 0;
    background-color: $white;
    @include col;
    align-items: center;
  }
  
</style>
