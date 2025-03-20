<script setup>
import {useRoute} from "vue-router";
import find from "lodash/find";
import carData from "@/data/cars.json"

const route = useRoute();

const carItem = find(carData, { id: parseInt(route.params.id) });


</script>


<template>
<h1>
    Contact Info
</h1>

<p>{{carItem.contact.dealer}}</p>
<p>{{carItem.contact.number}}</p>

</template>