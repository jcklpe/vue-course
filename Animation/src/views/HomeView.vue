<script setup>
import { ref } from "vue"
const namesList = ref(['']);
const nameInput = ref('');

const addName = () => {
  namesList.value.unshift(nameInput.value);
  nameInput.value = "";
}
</script>

<template>
  <main>


<div>
<input
v-model="nameInput"
@keyup.enter="addName"
placeholder="Type and press enter"
type="text" name="" id="">
<TransitionGroup name="names">
  <li
  v-for="name in namesList"
  :key="name"
  >
  {{ name }}
  </li>
</TransitionGroup>

</div>


</main>
</template>

<style scoped>
.names-enter-from {
opacity: 0;
}

.names-enter-to {
opacity: 1;
}

.names-enter-active {
transition: all 0.4s ease;
}

.names-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.names-move {
  transition: all 0.3s ease;
}


</style>
