<script setup lang="ts">
import { ref, defineProps, computed } from "vue";

//- Props
const { isLogin } = defineProps<{ isLogin: boolean }>();

//- Refs
const visible = ref(false);
const username = ref("");
const password = ref("");
const emailAddress = ref("");

//- Event functions
const showModal = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};

//- Computed Values
const title = computed(() => {
  if (isLogin) {
    return "Login";
  }
  return "Signup";
});
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal"> {{ title }} </a-button>

    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <label v-if="!isLogin" for="username">Username</label>
      <a-input
        v-if="!isLogin"
        id="username"
        v-model:value="username"
        placeholder="Username"
        name="username"
      />

      <label for="email">Email</label>
      <a-input
        id="email"
        v-model:value="emailAddress"
        placeholder="youremail@email.com"
        name="email"
      />

      <label for="password">Password</label>
      <a-input
        id="password"
        type="password"
        v-model:value="password"
        placeholder="Password"
        name="password"
      />
    </a-modal>
  </div>
</template>
