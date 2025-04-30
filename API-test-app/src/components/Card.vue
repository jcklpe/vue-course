<script setup>
import { defineProps, computed } from 'vue';



// pass in the pokemon object as an object. Laith does this as individual props but I think it's probably cleaner to do it as an object like this.
const { pokemon } = defineProps({
    pokemon: Object,
    required: true
}

)
// pull data out from pokemon object.
const image = computed(() => pokemon.sprites.front_default)
const types = computed(() =>
  pokemon.types.map(entry => entry.type.name)
)
const name = computed(() => pokemon.name)

</script>

<template>
    <n-card>
    <template #cover>
      <img :src="image">
    </template>
    <h3>{{ name }}</h3>
    <slot></slot>
  </n-card>
</template>

<style scoped>
.n-card {
    width: 200px;
    margin: 10px 20px;
    height: 200px;
}

.n-card img {
width: 50%;
}

p {
    font-size: 10px;
}

.jobs {
    display: flex;
    flex-wrap: wrap;
}
</style>