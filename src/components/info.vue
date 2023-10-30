<template>
  <div class="inline" :class="{ 'invention-changed': changed }">
    <v-tooltip activator="parent" location="bottom" max-width="200px" open-delay="750">{{ tooltip + (changed ? " (changed by current invention)" : "") }}</v-tooltip>
    <slot />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ tooltip: string, changed?: boolean }>();

</script>
