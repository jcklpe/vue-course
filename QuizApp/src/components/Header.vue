<script setup>
const { questionStatus, barPercentage } = defineProps(['questionStatus', 'barPercentage']);
</script>

<template>
   <header>
        <h4>
            Question {{ questionStatus }}
        </h4>
        <div class="bar">
            <div class="completion"></div>
        </div>
    </header>
</template>

<style scoped>
header {
    margin-top: 20px;
}

header h4{
    font-size: 30px;
}

.bar {
    width: 300px;
    height: 50px;
    border: 3px solid goldenrod;

}
.completion {
    height: 100%;
    width: v-bind(barPercentage);
    background-color: goldenrod;
}
</style>