<template>
  <div class="container">
    <slot> </slot>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: space-between;
}
</style>
