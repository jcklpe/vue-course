<script setup lang="ts">
import { defineProps } from "vue";

const { username, userInfo } = defineProps<{
  username: string;
  userInfo: {
    posts: number;
    followers: number;
    following: number;
  };
}>();
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <a-typography-title :level="2">{{ username }}</a-typography-title>
    </div>
    <div class="bottom-content">
      <a-typography-title :level="5">{{ userInfo.posts }} posts</a-typography-title>
      <a-typography-title :level="5">{{ userInfo.followers }} followers</a-typography-title>
      <a-typography-title :level="5">{{ userInfo.following }} following</a-typography-title>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.userbar-container {
  display: flex;
  flex-direction: row;
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;

  ::v-deep h5 {
    padding: 0;
    margin: 0 25px;
  }
}
</style>
