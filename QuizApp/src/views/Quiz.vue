<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";
import find from "lodash/find";
import quizData from "@/data/quizzes.json";

import Question from "@/components/Question.vue";
import Header from "@/components/Header.vue";
import Result from "@/components/Result.vue";

const route =  useRoute();

const quizID = parseInt(route.params.id);
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);

const quizItem = find(quizData, { id: quizID });

const questionStatus = computed(() => `${currentQuestionIndex.value}/${quizItem.questions.length}`)
const barPercentage = computed(() => `${currentQuestionIndex.value / quizItem.questions.length * 100}%`)

const onOptionSelected = (isCorrect) => {
    if (isCorrect) {
        numberOfCorrectAnswers.value++
    }
    currentQuestionIndex.value++
    }

</script>

<template>
    <Header :questionStatus="questionStatus"
            :barPercentage="barPercentage"
    />
    <Question v-if="parseFloat(barPercentage) < 99" :question="quizItem.questions[currentQuestionIndex]"
    @selectOption="onOptionSelected"/>
    <Result v-else
    :quizQuestionLength="quizItem.questions.length"
    :numberOfCorrectAnswers="numberOfCorrectAnswers"
    />

</template>
