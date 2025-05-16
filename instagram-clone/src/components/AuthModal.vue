<script setup lang="ts">
import { ref, defineProps, computed, reactive } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

//- Props
const { isLogin } = defineProps<{ isLogin: boolean }>();

//- Stores
const userStore = useUserStore();

const { errorMessage, user } = storeToRefs(userStore);
const { handleSignup, clearErrorMessage, handleLogin } = userStore;

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

//- Helper functions
const clearUserCredentialsInput = () => {
  userCredentials.email = "";
  userCredentials.password = "";
  userCredentials.username = "";
  clearErrorMessage();
};

//- Event functions
const showModal = () => {
  visible.value = true;
};
const handleOk = async () => {
  if (isLogin) {
    await handleLogin({
      password: userCredentials.password,
      email: userCredentials.email,
      username: userCredentials.username,
    });
  } else {
    await handleSignup(userCredentials);
  }

  if (user.value && !errorMessage.value) {
    visible.value = false;
    clearUserCredentialsInput();
  }
};

const handleCancel = () => {
  visible.value = false;
  clearUserCredentialsInput();
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
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button v-if="isLogin" key="login" type="primary" @click="handleOk">Login</a-button>
        <a-button v-else key="signup" type="primary" @click="handleOk">Signup</a-button>
      </template>
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
