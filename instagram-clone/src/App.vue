<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
</script>

<template>
  <main>
    <Nav />
  </main>
  <RouterView />
</template>

<style scoped></style>
