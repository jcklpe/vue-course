<script setup>
// composables approach
// import useNumbers from '@/composables/useNumbers';
// const { numbers, filterNumber } = useNumbers();

//Pinia approach
import { useNumbersStore } from '@/stores/numbers';
const { numbers, doubleNumber, filterNumber } = useNumbersStore();
</script>
<template>
    <div>
        <h1>Greatgrandchild Component {{doubleNumber}}</h1>
        <h2>filtered by {{ filterNumber(5) }}</h2>

    </div>
</template>