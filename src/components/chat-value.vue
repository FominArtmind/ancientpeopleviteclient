<template>
<div v-if="value !== undefined" class="inline-block text-justify m-1">{{ value }}</div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ value: string | number | undefined }>();

</script>