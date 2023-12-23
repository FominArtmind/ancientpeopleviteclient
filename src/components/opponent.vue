<template>
  <div class="opponent-area" :class="{ 'opponent-area-multiple-players': totalPlayers > 2 }" :style="opponentAreaMaxWidthStyle">
    <div class="adaptive-text-container">
      <v-menu>
        <template v-slot:activator="{ props }">
          <h1 v-bind="props" id="player-header" class="adaptive-text text-center pt-2 pb-2 cursor-pointer" :class="{'active-player': activePlayer }" @click="dialog = true">
            {{ player.nick }} {{ player.food }}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>
            <span :class="{ 'invention-changed': effectiveCulture !== player.culture }">{{ effectiveCulture }}</span><span class="icon-fix"><Icon name="mdi:fire"/></span>
            <!-- {{ player.awayCardsCount }}<span class="icon-fix"><Icon name="bi:people"/></span> -->
            {{ player.handSize }}<span class="icon-fix"><Icon name="mdi:cards"/></span>
            <span v-if="raidChances"> - <span class="icon-fix"><Icon name="mdi:axe"/></span> {{ raidChances.winRate }}%</span>
            <!--  - {{ timeSpent }} -->
          </h1>
        </template>

        <v-card>
          <v-card-text class="font-medium">
            <div>Food: {{ player.food }}</div>
            <div>Culture: <span :class="{ 'invention-changed': effectiveCulture !== player.culture }">{{ effectiveCulture }}</span></div>
            <div>Hand Size: {{ player.handSize }}</div>
            <div>Deck Size: {{ player.deckSize }}</div>
            <div>Away Cards: {{ player.awayCardsCount }}</div>
            <div v-if="raidChances">
              <div>Raid success chance: {{ raidChances.winRate }}% ({{ raidChances.emotion }})</div>
              <div class="flex w-60 justify-between mb-4 ml-4">
                <div>
                  <div>Win</div>
                  <div v-for="item in raidChances.winCultureGainArray">{{raidFoodGain}}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> {{ item.culture }}<span class="icon-fix"><Icon name="mdi:fire"/></span> - {{ item.chance }}%</div>
                </div>
                <div>
                  <div>Lose</div>
                  <div v-for="item in raidChances.loseCultureGainArray">{{ item.culture }}<span class="icon-fix"><Icon name="mdi:fire"/></span> - {{ item.chance }}%</div>
                </div>
              </div>
            </div>
            <div>Time spent: {{ timeSpent }}</div>
          </v-card-text>
          <!--<v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-menu>
    </div>
    <div class="card-grid w-[calc(100% - 4px)]" :style="gridRowsStyle">
      <div class="adaptive-text-container" v-for="card in player.village">
        <CardUnit :card="card.card" :rotated="card.rotated" />
        <!--<div class="adaptive-text">{{ card.rotated ? 'Rotated' : '' }}</div>-->
      </div>
    </div>
  </div>



 <!-- <v-dialog v-model="dialog" width="auto" location-strategy="connected" location="end" attach="player-header">
    <v-card>
      <v-card-text>
        dialog
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>-->
</template>

<style scoped>
.opponent-area {
  padding-bottom: 0.25rem;
  width: 100%;
}
.opponent-area-multiple-players {
  border: 1px solid white;
}
</style>

<script setup lang="ts">
import { ref, Ref, computed, inject } from "vue";
import { Player } from "../types/game";
import { game } from "../composables/state";
// @ts-ignore
import { DateTime } from "luxon";
import Icon from "./icon.vue";
import CardUnit from "./card-unit.vue";
import { RaidChances } from "../types/menu-action";

const props = defineProps<{ player: Player, effectiveCulture: number, activePlayer: boolean, raidChances: RaidChances, raidFoodGain: number }>();

const dialog = ref(false);

const windowWidth = inject<Ref<number>>("windowWidth", ref(0));
const windowHeight = inject<Ref<number>>("windowHeight", ref(0));

const totalPlayers = computed(() => {
  return game.value.players.length;
});

const timeSpent = computed(() => {
  return DateTime.fromMillis(props.player.timeTakenMs).toFormat("m:ss");
});

const opponentAreaMaxWidthStyle = computed(() => {
  const columns = props.player.village.length;
  const effectiveColumns = Math.max(columns, 5);
  const cardMaxSize = 180; // windowWidth.value > 1366 ? 160 : 120;
  const windowAdaptedCardMaxSize = Math.min(cardMaxSize, Math.round((windowHeight.value / 1080) * (windowHeight.value / windowWidth.value * 1920 / 1080) * cardMaxSize));
  const maxWidth = effectiveColumns * windowAdaptedCardMaxSize + (effectiveColumns + 2) * 4 + 32;
  return {
    "max-width": maxWidth + "px"
  };
});

const gridRowsStyle = computed(() => {
  const opponents = totalPlayers.value - 1;
  let minRowLength = 14;
  switch(opponents) {
    case 0: minRowLength = 7; break;
    case 1: minRowLength = 7; break;
    case 2: minRowLength = 7; break;
    case 3: minRowLength = 5; break;
    case 4: minRowLength = 4; break;
  }

  const rowLength = Math.ceil(props.player.village.length / 2);

  return {
  "grid-template-columns": Array(Math.max(minRowLength, rowLength)).fill("1fr").join(" ")
  };
});

</script>
