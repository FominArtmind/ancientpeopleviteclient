<template>
  <div data-te-toggle="tooltip" v-bind:title="type" class="bg-contain bg-no-repeat text-center w-12 h-8 inline-block" :style="{ 'background-image': 'url(/gamedata/' + (kind === 'resource' ? 'resources' : (kind === 'development' ? 'actions' : 'units')) + '/views/' + type + '-icon-white.png)' }">
  </div>
</template>

<style scoped>
.icon-box {
  height: 50px;
  /* background-size: 152px 232px; */
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
// @ts-ignore
import { Tooltip, initTE } from "tw-elements";

onMounted(() => {
  initTE({ Tooltip });
});

defineProps<{ type?: string, kind?: "unit" | "resource" | "development" }>();
</script>