<template>
  <div class="draft-area" :style="draftAreaMaxWidthStyle">
    <h1 class="font-larger text-center pb-2 pt-2">Draft</h1>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <CardDevelopment v-for="card in developmentCards" :card="card" @click="$emit('cardClicked', card, true)" @contextmenu="$emit('cardRightClicked', card, true)" />
      <CardUnit v-for="card in draft" :card="card" :location="'draft'" @click="$emit('cardClicked', card, false)" @contextmenu="$emit('cardRightClicked', card, false)" />
    </div>
  </div>
</template>

<style scoped>
.draft-area {
  padding-bottom: 0.25rem;
  width: 100%;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../types/game";
import { game } from "../composables/state";
import { unitCard } from "../composables/content";
import CardDevelopment from "./card-development.vue";
import CardUnit from "./card-unit.vue";
// @ts-ignore
import { DateTime } from "luxon";

const emit = defineEmits<{
  cardClicked: [card: Card, development: boolean]
  cardRightClicked: [card: Card, development: boolean]
}>();

const draft = computed(() => {
  const cards = game.value.state.draftCards.slice();
  cards.sort((a, b) => {
    let aName = a.type;
    let bName = b.type;
    if(aName === bName) {
      return 0;
    }
    let aCost = unitCard(a.type).foodCost;
    let bCost = unitCard(b.type).foodCost;

    if(aCost < bCost) {
      return -1;
    }
    else if(aCost === bCost) {
      if(aName < bName) {
        return -1;
      }
    }

    return 1;
  });

  return cards;
});

// const draftDeckSize = computed(() => {
//   return game.value.state.draftDeckSize;
// });

const developmentCards = computed(() => {
  return game.value.state.developmentCards;
});

const draftAreaMaxWidthStyle = computed(() => {
  const columns = draft.value.length + 3;
  const effectiveColumns = Math.max(columns, 5);
  const maxWidth = effectiveColumns * 160 + (effectiveColumns + 2) * 4;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => {
  const totalCells = draft.value.length + 3;
  // const rowLengthCells = Math.max(totalCells, 10);
  const rowLengthCells = Math.max(totalCells <= 10 ? totalCells : Math.max(Math.ceil(totalCells / 2), 10), 5);
  return {
    "grid-template-columns": `repeat(${rowLengthCells}, 1fr)`
  };
});

</script>
