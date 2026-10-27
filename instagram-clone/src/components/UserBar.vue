<script setup lang="ts">
// library imports
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
// component imports
import UploadPhotoModal from "./UploadPhotoModal.vue";
// stores imports
import { useUserStore } from "@/stores/users";
// exposing stuff to template
const route = useRoute();
const { username: profileUsername } = route.params;
const userStore = useUserStore();
const { username, userInfo, addNewPost } = defineProps<{
  username: string;
  userInfo: {
    posts: number;
    followers: number;
    following: number;
  };
  addNewPost: () => void;
}>();
//refs
const { user } = storeToRefs(userStore);
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <a-typography-title :level="2">{{ username }}</a-typography-title>
      <UploadPhotoModal v-if="user && profileUsername === user.username" :addNewPost="addNewPost" />
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

  :deep(h5) {
    padding: 0;
    margin: 0 25px;
  }
}
</style>
