<script setup lang="ts">
interface Post {
  id: number;
  image: string;
}
const { postList } = defineProps<{
  postList: Post[];
}>();
</script>

<template>
  <div class="image-gallery-container">
    <img v-for="post in postList" :key="post.id" :src="post.image" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.image-gallery-container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;

  :deep(img) {
    margin: 5px;
    width: 200px;
  }
}
</style>
