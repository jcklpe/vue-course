<script setup>
import { defineProps, computed } from 'vue';
const { pokemon } = defineProps({
    pokemon: Object,
    required: true
}

)
// pull data out from pokemon object
const image = computed(() => pokemon.sprites.front_default)
const types = computed(() =>
  pokemon.types.map(entry => entry.type.name)
)
const name = computed(() => pokemon.name)

</script>

<template>
    <n-card title="Card with Cover">
    <template #cover>
      <img :src="image">
    </template>
    <h3>{{ name }}</h3>
    <p v-for="type in types"
    :key="type"
    >{{ type }}</p>
  </n-card>
</template>

<style scoped>
.n-card {
    width: 200px;
    margin: 10px 20px;

}

.n-card img {
    height: 250px
}

p {
    font-size: 10px;
}

.jobs {
    display: flex;
    flex-wrap: wrap;
}
</style>