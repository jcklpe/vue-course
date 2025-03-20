<script setup>
import carData from "../data/cars.json";
import { RouterLink } from "vue-router";
</script>

<template>
<h1>Home View</h1>
<div class="cars">
    <RouterLink :to="`/cars/${carItem.id}`" v-for="carItem in carData" :key="carItem.id" href="">
        {{ carItem.name }}
    </RouterLink>
</div>
</template>

<style scoped>
.cars {
    display: flex;
}

.cars a {
    text-decoration: none;
    color: black;
    width: 100%;

}
</style>