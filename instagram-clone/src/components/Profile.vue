<script setup lang="ts">
// library imports
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

// local imports
import { useUserStore } from "@/stores/users";
import { supabase } from "@/supabase";

// component imports
import Container from "./Container.vue";
import Card from "./Card.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";

// expose to template
const userStore = useUserStore();
const route = useRoute();
const { username } = route.params;

// Interfaces
interface Post {
  id: number;
  content: string;
  image: string;
}
interface ProfileUser {
  id: string;
  auth_uuid: string;
  username: string;
}

//refs
const postList = ref<Post[]>([]);
const profileUser = ref<ProfileUser | null>(null);
const { user } = storeToRefs(userStore);

// const userPostData = ref(null);

// Event functions
const addNewPost = (post: Post) => {
  postList.value.unshift(post);
};

const fetchData = async () => {
  /* 1️⃣ find the user whose page we’re on */
  const { data, error } = await supabase
    .from("users")
    .select("id, auth_id, username")
    .eq("username", username as string)
    .single();

  if (error || !data) return; // bail-out if profile not found

  profileUser.value = data; // save for template

  /* 2️⃣ fetch that user’s posts */
  const { data: posts } = await supabase
    .from("posts")
    .select("*") // …then select()
    .eq("owner_id", data.auth_id) // filter first…
    .select("*");

  postList.value = posts || [];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container class="profile-container">
    <UserBar
      v-if="profileUser"
      :key="profileUser.username"
      :username="profileUser.username"
      :userInfo="{
        posts: postList.length,
        followers: 100,
        following: 4142,
      }"
      :addNewPost="addNewPost"
    />
    <ImageGallery :postList="postList" :addNewPost="addNewPost" />
  </Container>
</template>

<style lang="scss" scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
