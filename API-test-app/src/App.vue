<script setup>
import PokeCards from './components/PokeCards.vue';
import RickMortyCards from './components/RickMortyCards.vue';
import PracticeSlot from './components/PracticeSlot.vue';
</script>

<template>
  <main>
<h1>Hero</h1>
<Suspense>
  <template #default>
    <PokeCards/>
  </template>
  <template #fallback>
    <div class="cards spinner">
      <NSpin> size="large"</NSpin>
    </div>
  </template>
</Suspense>
<RickMortyCards/>
<PracticeSlot>
  <template #header>
   <h1>This is the header for the PracticeSlot component</h1>
  </template>
  <template #bodytext>
    <p>this is more body text for the body</p>
  </template>
  <template #footer>
    <p>this is the footer text</p>
  </template>
</PracticeSlot>


  </main>
</template>

<style scoped>

</style>
