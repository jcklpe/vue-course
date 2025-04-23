<script setup>
import { ref } from "vue"

const showGreet= ref(false);
</script>

<template>
  <main>

    <div class="container">
    <Transition name="fade">
      <h1 v-if="showGreet">Hello World</h1>
      <h1 v-else>Goodbye World</h1>
    </Transition>
  </div>
    <button @click="showGreet = !showGreet">Toggle</button>
  </main>
</template>

<style scoped>
.container {
  position: relative;
}

h1 {
  position: absolute;

}

button {
  margin-top: 50px;
}

.fade-enter-from {
  opacity: 0;

}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.4s ease;
}

.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to{
  opacity: 0;
}
</style>
