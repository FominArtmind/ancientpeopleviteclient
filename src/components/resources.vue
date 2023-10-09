<template>
  <div class="resources-area" :style="resourcesAreaMaxWidthStyle">
    <h1 class="font-larger text-center pb-2 pt-2">Resources (deck size: {{ deckSize }})</h1>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in resources">
        <CardResource :card="card" @click="$emit('cardClicked', card)" />
      </div>
      <div></div>
      <template v-for="player in players">
        <div class="adaptive-text-container" v-for="card in player.resources">
          <CardResource :card="card" :player="player.nick" @click="$emit('cardClicked', card, player.nick)" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.resources-area {
  padding-bottom: 0.25rem;
  width: 100%;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../types/game";
import { nickname, game } from "../composables/state";
import CardResource from "./card-resource.vue";

const emit = defineEmits<{
  cardClicked: [card: Card, player?: string]
}>();

const resources = computed(() => {
  return game.value.state.openedResources;
});

const deckSize = computed(() => {
  return game.value.state.resourcesDeckSize;
});

const players = computed(() => {
  const playersN = game.value.players.length;
  const heroIndex = game.value.state.players.findIndex(value => value.nick === nickname.value);

  const result: { nick: string, resources: Card[] }[] = [];
  for(let n = 0; n < playersN; n++) {
    const player = game.value.state.players[(heroIndex + n) % playersN];
    result.push({
      nick: player.nick,
      resources: player.awayResources
    });
  }
  return result;
});

const totalAwayResources = computed(() => {
  return Object.values(players.value).map(value => value.resources.length).reduce((total, amount) => total += amount);
});
const resourcesAreaMaxWidthStyle = computed(() => {
  const columns = resources.value.length + totalAwayResources.value;
  const maxWidth = Math.max(columns, 5) * 160 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(resources.value.length).fill("1fr").join(" ") + " 2rem " + Array(totalAwayResources.value).fill("1fr").join(" ")
}));
</script>