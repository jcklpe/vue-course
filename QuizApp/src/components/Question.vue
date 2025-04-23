<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["selectOption"]);

const { question } = defineProps(['question']);
const emitSelectedOption = (isCorrect) => {
    emit("selectOption", isCorrect)
}
</script>

<template>
   <div class="question-container">
            <h1 class="question">
               {{ question.text}}
            </h1>
            <div class="options-container">
                <div v-for="option in question.options"
                :key="option.id"
                @click="emitSelectedOption(option.isCorrect)"
                class="option">
                    <div class="option-label"> {{ option.label }} </div>
                    <div class="option-value">
                            <p>
                                {{ option.text }}
                            </p>
                       </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
.question-container {
    margin-top: 20px;
}

.question {
    font-size: 40px;
    margin-bottom: 20px;
}

.option {
    display: flex;
    margin-bottom: 20px;
    cursor: pointer;
    width: 50%;
    margin-right: 50px;
}

.option-label {
    background-color: goldenrod;
    width: 60px;
    height: 60px;
    font-size: 30px;
    display: flex;
    justify-content: center;
}

.option-value {
    background-color: rgb(244, 244, 244) ;
    width: 100%;
    font-size: 30px;
    padding: 5px 20px;
}

</style>