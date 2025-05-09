<script setup>
import { ref, reactive, provide } from "vue";
import Parent from "./components/Parent.vue";

// const numbers = ref([1, 2, 3]);


// const color = ref({
//   red: 0,
//   blue: 0,
//   green: 0
// })

const color = reactive({
  red: 0,
  green: 0,
  blue: 0
})

// provide("numbers", numbers);
</script>

<template>
  <main>
    <Parent/>
  </main>
<!-- <main :style="{backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue} )`}">
  <label for="red">Red</label>
<input type="number" v-model="color.red" name="red">
<label for="green">Green</label>
<input type="number" v-model="color.green" name="green">
<label for="blue">Blue</label>
<input type="number" v-model="color.blue" name="blue">
</main> -->
</template>

<style scoped>
main {

  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
