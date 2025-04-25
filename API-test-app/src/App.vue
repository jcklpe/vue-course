<script setup>
import Cards from './components/Cards.vue';
</script>

<template>
  <main>
<h1>Hero</h1>
<Suspense>
  <template #default>
    <Cards/>
  </template>
  <template #fallback>
    <p>....loading</p>
  </template>
</Suspense>



  </main>
</template>

<style scoped>

</style>
