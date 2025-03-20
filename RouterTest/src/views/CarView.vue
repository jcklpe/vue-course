<script setup>
import {useRoute, useRouter, RouterView} from "vue-router";
import find from "lodash/find";
import carData from "../data/cars.json";


const route =  useRoute();
const router = useRouter();

const carID = parseInt(route.params.id);

// extracting the specific car data based on the route parameter
const carItem = find(carData, { id: carID });

const goToContact = () => {
  router.push(`/cars/${carID}/contact`);
};

</script>

<template>
   <div v-if="carItem">
    <h1>
        Car name
    </h1>
    <p>
        {{carItem.name}}
    </p>
    <p>
        {{carItem.year}}
    </p>
    <p>
        {{carItem.price}}
    </p>
    <button @click="goToContact">Click for contact</button>
    <RouterView />
</div>
<div v-else>
    <h1> car not found</h1>
</div>
</template>