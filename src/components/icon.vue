<template>
  <div class="inline">
    <v-icon :icon="parsedName"></v-icon>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ name: string }>();

const parsedName = computed(() => {
  return props.name.replace(":", "-");
});

</script>
