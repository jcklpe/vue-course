<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
    <RouterLink active-class="active" to="/">Home</RouterLink>
    <RouterLink active-class="active" to="/about">About</RouterLink>


</template>

<style scoped>
.active {
    font-weight: 900;
}
</style>