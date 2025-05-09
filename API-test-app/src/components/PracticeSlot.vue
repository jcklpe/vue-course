<script setup>

</script>

<template>
    <div class="header">
        <slot name="header"></slot>
    </div>
    <div class="body">
        <h2>title</h2>
        <p>body text</p>
        <slot name="bodytext"></slot>
    </div>
    <div class="footer">
        <slot name="footer"></slot>
    </div>
</template>