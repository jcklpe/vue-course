<script setup>
import { defineProps, computed } from 'vue';

// because pokemon and Rick and Morty API are shaped differently, we have to pass the props in like this. And we then pass in the rest of the props with in the individual xxxCards.vue context.
const {coverSrc, title} = defineProps({
    coverSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})



</script>

<template>
    <n-card :title="title">
    <template #cover>
      <img :src="coverSrc">
    </template>
    <slot></slot>
  </n-card>
</template>

<style scoped>
.n-card {
    width: 200px;
    margin: 10px 20px;
    height: 200px;
}

.n-card img {
width: 50%;
}

p {
    font-size: 10px;
}

.jobs {
    display: flex;
    flex-wrap: wrap;
}
</style>