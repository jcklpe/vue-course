<script setup lang="ts" >
import Card from "./components/Card.vue";
import { ref, computed } from "vue";
import { GENDER, type Invitee } from "./types";



const name = ref("");
const gender = ref<GENDER>(GENDER.MALE);



const inviteeList = ref < Invitee[] > ([])

const addInvitee = () => {
  if (name.value) {
    inviteeList.value.push({
      id: Math.floor(Math.random() * 100000000),
      name: name.value,
      gender: gender.value
    });
    name.value = "";
    gender.value = GENDER.MALE;
}
}
// this was Laith's solution but I find it quite hard to read
// const count = computed<{
//   female: number,
//   male: number
// }>(() => {
//   return inviteeList.value.reduce((countObject, invitee) => {
//     if (invitee.gender === GENDER.MALE) {
//       return {
//         ...countObject,
//         male: countObject.male + 1
//       };
//     } else {
//       return {
//         ...countObject,
//         female: countObject.female + 1
//       };
//     }
//   }, { male: 0, female: 0 });
// })

const count = computed(() => ({
  male:   inviteeList.value.filter(i => i.gender === GENDER.MALE).length,
  female: inviteeList.value.filter(i => i.gender === GENDER.FEMALE).length
}))



</script>

<template>
  <main>
<h1>People invited to my party</h1>
<div class="input-container">
  <label for="name">Name</label>
  <input
  type="text"
  name="name"
  @keypress.enter="addInvitee"
  v-model="name">
  <select
  @keypress.enter="addInvitee"
  v-model="gender">
    <option :value="GENDER.MALE">male</option>
    <option :value="GENDER.FEMALE">female</option>
  </select>
  <Card v-for="invitee in inviteeList" :key="invitee.id" :invitee="invitee"/>
  <p>Females: {{ count.female }}</p>
  <p>Males: {{ count.male }}</p>
</div>



  </main>
</template>

<style scoped>
main {
  margin: 25px 50px;
}
.input-container {
  width: 300px;
  display: flex;
  flex-direction: column;
}
</style>
