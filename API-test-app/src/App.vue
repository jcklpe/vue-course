<script setup>
import PokeCards from './components/PokeCards.vue';
import RickMortyCards from './components/RickMortyCards.vue';
</script>

<template>
  <main>
<h1>Hero</h1>
<Suspense>
  <template #default>
    <PokeCards/>
  </template>
  <template #fallback>
    <p>....loading</p>
  </template>
</Suspense>
<RickMortyCards/>



  </main>
</template>

<style scoped>

</style>
