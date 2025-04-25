<script setup>
import axios from 'axios';
import { ref } from 'vue';

const pokemon = ref(null)

const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=8")
pokemon.value = response.data.results;
console.log(response);
</script>

<template>

    <div>
        <h1>Poke-Cards</h1>
<p>
    {{ pokemon }}
</p>
<button>Back</button>
<button>Next</button>
    </div>
</template>