<template>
  <div class="flex flex-col justify-between p-2 border-b-2 border-white" @contextmenu="$event.preventDefault()">
    <template v-if="gameLoaded">
      <div class="flex justify-between flex-wrap">
        <div>Turn {{ game.state.turn }}, {{ game.state.phase }} phase</div>
        <div>Victory: {{ victory }}</div>
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="pr-2"><Icon name="mdi:weather-sunny" /></div>
        <div class="font-semibold px-1">{{ inventions[0] }}</div>
        <div class="px-1">{{ inventions[1] }}</div>
        <div class="px-1">{{ inventions[2] }}</div>
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="pr-2"><Icon name="mdi:account-supervisor" /></div>
        <div v-for="(player, index) in game.state.players" class="px-1" :class="{ 'font-semibold': index === game.state.actor }">{{ player.nick.substring(0, 10) }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { computed } from "vue";
import { gameLoaded, game } from "../composables/state";
import Icon from "./icon.vue";

const victory = computed(() => {
  return game.value.options.find(value => value.name === "victoryCulture")?.value;
});

const inventions = computed(() => {
  return game.value.inventions.slice(game.value.state.turn - 1, game.value.state.turn + 2);
});

</script>