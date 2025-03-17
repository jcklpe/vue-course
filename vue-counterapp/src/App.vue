<script setup>
import {ref } from "vue";
const count = ref(0);
</script>

<template>
  <main>

<h4>
    The current count is....
</h4>

<h1 id="count">{{ count }}</h1>
<button id="subtract" @click="count--">-</button>
<button id="add" @click="count++">+</button>
</main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>