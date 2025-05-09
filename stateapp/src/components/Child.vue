<script setup>
import Grandchild from './Grandchild.vue';

// inject provide approach
// import { inject } from "vue";
// const numbers = inject("numbers");

// composable approach
// import useNumbers from '@/composables/useNumbers';
// const { numbers, addNumber } = useNumbers();

//Pinia approach
import { useNumbersStore } from '@/stores/numbers';

const { numbers, addNumber } = useNumbersStore();
</script>
<template>
    <div>
        <h1>Child Component{{numbers}}</h1>
        <button @click="addNumber(4)">Add 4</button>
        <div class="line"></div>
        <Grandchild/>
    </div>
</template>