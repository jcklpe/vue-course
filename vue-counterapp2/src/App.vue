<script setup>
import { ref } from "vue";
let count = ref(0);

const subtractFromCount = () => {
  count.value = count.value - 1;
}

const addToCount = () => {
  count.value = count.value + 1;
}

</script>

<template>
  <h4>the current count is...</h4>
  <h1>{{ count }}</h1>
  <button @click="subtractFromCount">-</button>
  <button @click="addToCount">+</button>
</template>