<template>
  <div class="inline">
    <v-tooltip activator="parent" location="bottom" width="200px">{{ tooltip }}</v-tooltip>
    <slot />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ tooltip: string }>();

</script>
