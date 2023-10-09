<template>
  <div class="inline">
    {{ name }}
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
defineProps<{ name: string }>();

</script>
