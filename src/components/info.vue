<template>
  <div class="inline">
    <v-tooltip activator="parent" location="bottom" max-width="200px" open-delay="1000">{{ tooltip }}</v-tooltip>
    <slot />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ tooltip: string }>();

</script>
