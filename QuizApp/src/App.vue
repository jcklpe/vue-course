<script setup>
import quizData from "./data/quizzes.json";
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { ref, watch } from "vue";

import Card from "./components/card.vue";

const quizGroup = ref(quizData);
const search = ref("");

watch(search, () => {
  quizGroup.value = filter(quizData, (quizItem) => includes(toLower(quizItem.name), toLower(search.value)))
})

</script>

<template>
  <div class="container">
    <header>
      <h1>Quizzes</h1>
      <input
      v-model.trim="search"
      type="text" placeholder="Search...">
    </header>
    <div class="options-container">
      <Card v-for="quizItem in quizGroup"
      :key="quizItem.id" :quizItem="quizItem"/>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto
  }

  header {
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  header h1 {
    font-weight: bold;
    margin-right: 30px;
  }

  header input {
    border: none;
    background-color: rgba(128,128,128,0.1);
    padding: 10px;
    border-radius: 5px;
  }

  .options-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  }


</style>