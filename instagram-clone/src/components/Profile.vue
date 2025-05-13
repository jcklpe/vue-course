<script setup lang="ts">
import Container from "./Container.vue";
import Card from "./Card.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";

const postList = [
  {
    id: 1,
    username: "flowers",
    image:
      "https://images.unsplash.com/photo-1485560994238-db4592aa1a6e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "",
  },
  {
    id: 2,
    username: "flowerspink",
    image:
      "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "hello world",
  },
];
</script>

<template>
  <Container class="profile-container">
    <UserBar
      username="jcklpe"
      :userInfo="{
        posts: 4,
        followers: 100,
        following: 4142,
      }"
    />
    <ImageGallery :postList="postList" />
  </Container>
</template>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
