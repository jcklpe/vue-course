<script setup lang="ts">
import { defineProps, computed } from "vue";
import { GENDER, type Invitee } from "../types";

const { invitee } = defineProps<{
  invitee: Invitee
}>()

const genderClass = computed(() => {
  if (invitee.gender === GENDER.MALE) {
    return 'male'
  }
  return 'female'
})



</script>

<template>
   <div :class="['card', genderClass]">
    {{invitee.name}}
   </div>
</template>

<style scoped>
.card {
  padding: 0.5rem 1rem;
  color: white;
}
.male   { background-color: rgb(0, 35, 208); }
.female { background-color: rgba(185, 0, 105, 0.89); }
</style>