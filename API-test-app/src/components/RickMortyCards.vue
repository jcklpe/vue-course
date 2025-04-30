<script setup>
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';
import Card from './Card.vue';

const rickMortyList = ref([]);
const page = ref(1);

onMounted( async () => {
    const response = await axios.get("https://rickandmortyapi.com/api/character");
    rickMortyList.value = response.data.results;
})



watch(page, async () => {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page.value}`);

    rickMortyList.value = response.data.results;


} )

</script>

<template>

<div class="container">
    <div class="cards">
        <Card
        v-for="character in rickMortyList"
        :key="character.id"
        :character="character">

        </Card>
    </div>
    <div class="button-container">
        <button @click="page = page - 1">Back</button>
        <button @click="page = page + 1">Next</button>
    </div>

</div>




</template>

<style scoped>
.container {
    background-color: rgb(27, 26, 26);
    padding: 30px
}
.cards {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    height: 400px
}
.cards h3 {
    font-weight: bold;
}
.cards p {
    font-size: 10px;
}
.jobs {
    display: flex;
    flex-wrap: wrap;
}
.button-container {
    display: flex;
    justify-content: center;
    padding-top: 30px
}
.button-container button {
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 0 5px;
    cursor: pointer;
}
.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>