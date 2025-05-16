<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { useUserStore } from "./stores/users";

const userStore = useUserStore();

onMounted(() => {
  userStore.getUser();
});
</script>

<template>
  <main>
    <Nav />
  </main>
  <RouterView />
</template>

<style scoped></style>
