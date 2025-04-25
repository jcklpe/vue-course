<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import Card from './Card.vue';

const pokemonList = ref([]);
// the PokeAPI returns just a name and url by default so you have to do this second step to extract the details from it
const pokemonDetails = ref([])
const page = ref(0);

const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=8")
pokemonList.value = response.data.results;

// Fetching details
const detailPromises = pokemonList.value.map(pokemon => axios.get(pokemon.url).then(detailResponse => detailResponse.data))
pokemonDetails.value = await Promise.all(detailPromises);

console.log('details:', pokemonDetails.value)


watch(page, async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${page.value * 8}`);

    pokemonList.value = response.data.results;
} )

</script>

<template>

<div class="container">
    <div class="cards">
        <Card
        v-for="pokemon in pokemonDetails"
        :key="pokemon.id"
        :pokemon="pokemon"
        />
        <n-button type="primary">Button</n-button>
    </div>

</div>


<button @click="page = page - 1">Back</button>
<button @click="page = page + 1">Next</button>

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