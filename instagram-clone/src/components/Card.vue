<script setup lang="ts">
import { defineProps } from "vue";

//- Props
const { post } = defineProps<{
  post: {
    url: string;
    username: string;
    caption: string;
  };
}>();
</script>
<template>
  <a-card hoverable style="width: 240px" class="card">
    <template #cover>
      <img alt="example" :src="post.url" />
    </template>
    <a-card-meta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>

<style lang="scss" scoped>
.card {
  margin: 25px;
}
</style>
