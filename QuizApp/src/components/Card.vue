<script setup>
import { defineProps } from "vue";
import {useRouter, useRoute } from "vue-router";
const props = defineProps(["quizItem"]);

const router = useRouter();
const route = useRoute();

const navigateToQuiz = () => {
  router.push(`/quiz/${props.quizItem.id}`);
};

</script>
<template>
<div class="card" @click="navigateToQuiz">
        <img :src="quizItem.img" alt="">
        <div class="card-text">
          <h2>{{ quizItem.name }}</h2>
          <p>{{ quizItem.questions.length }} questions</p>
        </div>
      </div>
</template>

<style scoped>
.card {
    width: 310px;
    overflow: hidden;
    border-radius: 2%;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.1);
    margin-bottom: 35px;
    margin-right: 20px;
    cursor: pointer;
  }

  .card img {
    width: 100%;
    height: 190px;
    margin: 0
  }

  .card .card-text {
    padding: 0 5px
  }

  .card .card-text h2 {
    font-weight: bold;
  }
</style>