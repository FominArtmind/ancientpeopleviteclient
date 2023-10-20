<template>
  <div class="inline" :v-tooltip="tooltip">
    <slot />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ tooltip: string }>();

</script>
