<template>
  <div class="hero-area-container" :class="{ 'active-player': heroTurn }">
    <div class="hero-area" :style="heroAreaMaxWidthStyle">
      <div class="adaptive-text-container">
        <h1 class="adaptive-text text-center pb-2 pt-2">Village {{ hero.food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> <span :class="{ 'invention-changed': effectiveCulture !== hero.culture }">{{ effectiveCulture }}</span><span class="icon-fix"><Icon name="mdi:fire"/></span> away {{ hero.awayCardsCount }} deck {{ hero.deckSize }} - {{ timeSpent }}<span class="inline-block pl-2" :class="{ 'action-required': action }">{{ action ? action : 'Wait for other players' }}</span></h1>
      </div>
      <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
        <div class="adaptive-text-container" v-for="card in hero.village">
          <CardUnit :card="card.card" :location="'village'" :rotated="card.rotated" @click="$emit('cardClicked', card, 'village')" @contextmenu="$emit('cardRightClicked', card, 'village')" />
          <!--<div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div> -->
        </div>
        <template v-if="handLoaded && hand.length > 0">
          <div class="flex justify-center items-center">
            <div class="hand-arrow"><Icon name="mdi:arrow-left-bold-outline"/></div>
          </div>
          <div class="adaptive-text-container" v-for="card in hand">
            <CardUnit :card="card" :location="'hand'" :suggested="heroTurn && hero.state.playingCard" @click="$emit('cardClicked', card, 'hand')" />
            <!--<div class="adaptive-text">Hand</div> -->
          </div>
        </template>
      </div>
    </div>
  </div>
  <!--<table class="table-fixed w-[calc(100% - 4px)]">
    <tr>
      <td class="px-1" v-for="card in village"><CardUnit :card="card.card" /></td>
      <td></td>
      <td class="px-1" v-for="card in hand"><CardUnit :card="card" /></td>
    </tr>
    <tr class="text-center">
      <td class="px-1 adaptive-text-container" v-for="card in village"><div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div></td>
      <td></td>
      <td class="px-1 adaptive-text-container" :colspan="hand.length"><div class="adaptive-text">Hand</div></td>
    </tr>
  </table> -->
</template>

<style scoped>
.hero-area-container {
  border-top: 1px solid white;
  padding-bottom: 0.25rem;
  width: 100%;
}
.hero-area {
  width: 100%;
  /* position: absolute;
  bottom: 0;
  width: calc(80% - 2px); */
}

.hand-arrow {
  font-size: 1.5rem;
}
@media (max-width: 1023px) {
  .hand-arrow {
    font-size: 1rem;
  }
}
@media (min-width: 1024px) and (max-width: 1365px) {
  .hand-arrow {
    font-size: 1.25rem;
  }
}

@keyframes move { 
  50% { color: #c4ecf8; transform: translate(2px, 0px); } 
}
.action-required {
  animation: move 1.75s infinite ease;
}
</style>

<script setup lang="ts">
import { ref, Ref, computed, inject } from "vue";
import { Player, Card, VillageCard } from "../types/game";
import { nickname, game, handLoaded, hand } from "../composables/state";
// @ts-ignore
import { DateTime } from "luxon";
import CardUnit from "./card-unit.vue";
import Icon from "./icon.vue";
import { unitCards } from "../composables/content";

const emit = defineEmits<{
  cardClicked: [card: Card | VillageCard, location: "village" | "hand"]
  cardRightClicked: [card: Card | VillageCard, location: "village" | "hand"]
}>();

const windowWidth = inject<Ref<number>>("windowWidth", ref(0));
const windowHeight = inject<Ref<number>>("windowHeight", ref(0));

const hero = computed(() => {
  return game.value.state.players.find(value => value.nick === nickname.value) as Player;
});
const heroTurn = computed(() => {
  return game.value.state.players[game.value.state.actor].nick === nickname.value;
});

const phase = computed(() => {
  return game.value.state.phase;
});

const effectiveCulture = computed(() => {
  if(phase.value !== "development") {
    return hero.value.culture;
  }
  let additionalCultureLevel = 0;
  for(const unitCard of hero.value.village) {
    const unit = unitCards().find(value => value.title === unitCard.card.type);
    if(unit?.properties?.cultureLevelIncrease) {
      additionalCultureLevel += unit.properties.cultureLevelIncrease;
    }
  }

  return hero.value.culture + additionalCultureLevel;
});

const timeSpent = computed(() => {
  return DateTime.fromMillis(hero.value.timeTakenMs).toFormat("m:ss");
});

const action = computed(() => {
  if(!heroTurn.value) {
    return "";
  }

  if(hero.value.state.playingCard) {
    return "Play card from hand";
  }
  if(hero.value.state.pathfindingChoose) {
    return "Select pathfinding card";
  }
  if(hero.value.state.sociality) {
    return "Select sociality card(s) to return";
  }

  if(phase.value === "living") {
    const unity = hero.value.state.unity && hero.value.village.map(value => value.card.type).includes(hero.value.state.unity);
    if(hero.value.state.leadership.length > 0) {
      if(unity) {
        return "Play extra " + hero.value.state.unity + " or leadership card, hunt, raid or pass";
      }
      
      return "Play extra leadership card, hunt, raid or pass";
    }
    else if(unity) {
      return "Play extra " + hero.value.state.unity + " card, hunt, raid or pass";
    }
  
    return "Hunt, raid or pass";
  }
  else {
    return "Buy, upgrade, develop or pass";
  }
});

const heroAreaMaxWidthStyle = computed(() => {
  const columns = hero.value.village.length + hand.value.length;
  const effectiveColumns = Math.max(columns, 5);
  const cardMaxSize = 180; // windowWidth.value > 1366 ? 180 : 120;
  const windowAdaptedCardMaxSize = Math.min(cardMaxSize, Math.round((windowHeight.value / 1080) * (windowHeight.value / windowWidth.value * 1920 / 1080) * cardMaxSize));
  const maxWidth = effectiveColumns * windowAdaptedCardMaxSize + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});
const gridRowsStyle = computed(() => ({
  "grid-template-columns": Array(hero.value.village.length).fill("1fr").join(" ") + " 2rem " + Array(hand.value.length).fill("1fr").join(" ")
}));

// function onClicked(card: Card | VillageCard, location: "village" | "hand") {
//   emit("cardClicked", card, location);
// }

</script>
