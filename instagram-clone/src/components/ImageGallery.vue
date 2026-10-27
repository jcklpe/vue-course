<script setup lang="ts">
// Interfaces
interface Post {
  id: number;
  url: string;
}

// make visible to template
const { postList } = defineProps<{
  postList: Post[];
}>();
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in postList"
      :key="post.id"
      :src="`https://tqfefucuxwgfwvzxvggx.supabase.co/storage/v1/object/public/images/${post.url}`"
      alt=""
    />
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
