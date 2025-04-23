<script setup>
import quizData from "@/data/quizzes.json";
import { RouterLink } from "vue-router";

import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import { ref, watch } from "vue";

import Card from "@/components/Card.vue";

const quizGroup = ref(quizData);
const search = ref("");

// search function
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
        :key="quizItem.id" :quizItem="quizItem" />
</div>

  </div>
</template>
