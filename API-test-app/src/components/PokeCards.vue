<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import Card from './Card.vue';

const pokemonList = ref([]);
// the PokeAPI returns just a name and url by default so you have to do this second step to extract the details from it
const pokemonDetails = ref([])

const page = ref(0);

// initial load of data
const listResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=8")
pokemonList.value = listResponse.data.results;

// Fetching details
const detailPromises = pokemonList.value.map(pokeEntry => axios.get(pokeEntry.url).then(detailResponse => detailResponse.data))
pokemonDetails.value = await Promise.all(detailPromises);


// watch for page changes
watch(page, async () => {
    const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${page.value * 8}`);

    pokemonList.value = listResponse.data.results;

    // Fetching details
const detailPromises = pokemonList.value.map(pokeEntry => axios.get(pokeEntry.url).then(detailResponse => detailResponse.data))
pokemonDetails.value = await Promise.all(detailPromises);
} )

</script>

<template>

<div class="container">
    <div class="cards">
        <Card
        v-for="pokemon in pokemonDetails"
        :key="pokemon.id"
        :coverSrc="pokemon.sprites.front_default"
        :title="pokemon.name">
            <p v-for="entry in pokemon.types" :key="entry.slot"> {{ entry.type.name }} </p>
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