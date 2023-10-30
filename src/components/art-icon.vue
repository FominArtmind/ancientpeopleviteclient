<template>
  <div class="bg-contain bg-no-repeat text-center w-12 h-8 inline-block" :style="{ 'background-image': 'url(./gamedata/' + (kind === 'resource' ? 'resources' : (kind === 'development' ? 'actions' : 'units')) + '/views/' + type + '-icon-white.png)' }">
    <v-tooltip activator="parent" location="bottom" max-width="200px" open-delay="750">{{ type }}</v-tooltip>
  </div>
</template>

<style scoped>
.icon-box {
  height: 50px;
  /* background-size: 152px 232px; */
}
</style>

<script setup lang="ts">
defineProps<{ type?: string, kind?: "unit" | "resource" | "development" }>();

</script>
