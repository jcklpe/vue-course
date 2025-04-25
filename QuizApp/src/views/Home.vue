<script setup>
import quizData from "@/data/quizzes.json";
import { RouterLink } from "vue-router";

import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';
import gsap from "gsap";
import { ref, watch } from "vue";

import Card from "@/components/Card.vue";

const quizGroup = ref(quizData);
const search = ref("");

// search function
watch(search, () => {
  quizGroup.value = filter(quizData, (quizItem) => includes(toLower(quizItem.name), toLower(search.value)))
})

const beforeEnter = (element) =>  {
  element.style.opacity = 0;
}

const enter = (element) => {
  gsap.to(element, {
    opacity: 1,
    duration: 0.4,
    delay: element.dataset.index * 0.2
  })

}

const afterEnter = (element) =>  {

}
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
      <TransitionGroup
      name="card"
      appear
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      >
        <Card
        v-for="(quizItem, quizIndex) in quizGroup"
        :data-index="quizIndex"
        :key="quizItem.id" :quizItem="quizItem" />
      </TransitionGroup>

</div>

  </div>
</template>

<style scoped>
/* .card-enter-from{
  opacity:0;

}
.card-enter-to{
opacity: 1;
}
.card-enter-active{
transition: all 0.4s ease;
} */

</style>
