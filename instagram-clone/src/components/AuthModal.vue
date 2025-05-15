<script setup lang="ts">
import { ref, defineProps, computed, reactive } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

//- Props
const { isLogin } = defineProps<{ isLogin: boolean }>();

//- Stores
const userStore = useUserStore();

const { errorMessage } = storeToRefs(userStore);
const { handleSignup } = userStore;

const userCredentials = reactive({
  email: "",
  password: "",
  username: "",
});

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
  // visible.value = false;
  handleSignup(userCredentials);
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
        v-model:value="userCredentials.username"
        placeholder="Username"
        name="username"
      />

      <label for="email">Email</label>
      <a-input
        id="email"
        v-model:value="userCredentials.email"
        placeholder="youremail@email.com"
        name="email"
      />

      <label for="password">Password</label>
      <a-input
        id="password"
        type="password"
        v-model:value="userCredentials.password"
        placeholder="Password"
        name="password"
      />
      <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
    </a-modal>
  </div>
</template>
