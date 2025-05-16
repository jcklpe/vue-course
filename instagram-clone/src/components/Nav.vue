<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";

const router = useRouter();
const userStore = useUserStore();

//- Refs
const searchParam = ref("");
const { user } = storeToRefs(userStore);
const isAuthenticated = computed(() => !!user.value);

//- Event Functions
const onSearch = () => {
  if (searchParam.value) {
    router.push(`/profile/${searchParam.value}`);
    searchParam.value = "";
  }
};
</script>

<template>
  <a-layout-header>
    <Container>
      <div class="left-content">
        <RouterLink to="/">InstaClone</RouterLink>
        <a-input-search
          v-model:value="searchParam"
          placeholder="Search..."
          style="width: 200px"
          @search="onSearch"
        />
      </div>
      <div v-if="!isAuthenticated" class="right-content">
        <AuthModal :isLogin="false" />
        <AuthModal :isLogin="true" />
      </div>
      <div v-if="isAuthenticated" class="right-content">
        <a-button type="primary">Profile</a-button>
        <a-button type="primary" @click="userStore.handleLogout()">Logout</a-button>
      </div>
    </Container>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.left-content {
  margin: 0 auto;
  display: flex;
  gap: 25px;
  align-items: center;
}

.right-content {
  margin: 0 auto;
  display: flex;
  gap: 25px;
  align-items: center;
}
</style>
