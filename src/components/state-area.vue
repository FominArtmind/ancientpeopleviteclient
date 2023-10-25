<template>
  <div class="flex flex-col justify-between p-2 border-b-2 border-white" @contextmenu="$event.preventDefault()">
    <template v-if="gameLoaded">
      <div class="flex justify-between flex-wrap">
        <Info :tooltip="game.state.phase === 'living' ? 'In living phase players play cards from hand one by one, gather resources and raid other players with already played ones' : 'In development phase players improve their deck by buying and upgrading units, develop to gain culture for the food collected'"><div>Round {{ game.state.turn }}, {{ game.state.phase }} phase</div></Info>
        <Info :tooltip="`You need to gain ${victory} culture to win`"><div>Victory: {{ victory }}<Icon name="mdi:fire"/></div></Info>
      </div>
      <div class="flex justify-between flex-wrap">
        <Info :tooltip="'Inventions provide temporal effects for the round, inventions for the current and the next two rounds are shown, the current round invention highlighted'"><div class="pr-2"><Icon name="mdi:weather-sunny" /></div></Info>
        <template v-for="(invention, index) in inventions">
          <Info :tooltip="invention.description"><div class="px-1" :class="{ 'font-semibol': index === 0 }">{{ invention.name }}</div></Info>
        </template>
      </div>
      <div class="flex justify-between flex-wrap">
        <Info :tooltip="'Players turn order, the current active player is highlighted'"><div class="pr-2"><Icon name="mdi:account-supervisor" /></div></Info>
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
  const NAMES: {[invention: string]: string } = {
    fishingHook: "Fishing hook",
    fishingNet: "Fishing net",
    foodPit: "Food pit",
    flint: "Flint",
    bolas: "Bolas",
    javelin: "Javelin",
    atlatl: "Atlatl",
    bow: "Bow",
    handle: "Handle",
    basket: "Basket",
    needle: "Needle",
    paints: "Paints",
    microlits: "Microlits",
    dwelling: "Dwelling",
    dog: "Dog",
    totem: "Totem"
  };
  const DESCRIPTIONS: {[invention: string]: string } = {
    fishingHook: "Fish food output is increased up to 2, at least 3 fishes are opened",
    fishingNet: "At least 5 fishes are opened",
    foodPit: "Village actions food gain is doubled",
    flint: "Cards can't be rotated in raids. Inhabitant cost equals 1 on draft",
    bolas: "Defense is ignored in raids",
    javelin: "Deer food output is increased up to 5, at least 2 deers opened",
    atlatl: "Aurochs food output is increased up to 10, at least one aurochs opened",
    bow: "Two additional resource cards opened, units can use attack for hunting",
    handle: "Every non-home gains +1 to both attack and hunting",
    basket: "Every unit raid food steal is increased by 2, village actions provide additional 2 food",
    needle: "Village actions culture gain is doubled",
    paints: "Every non-home gains +1 to culture exchange, village actions provide you with one extra culture",
    microlits: "Culture level is increased by 3, development food cost is decreased by 1",
    dwelling: "Players start turn with 2 extra cards on hand",
    dog: "Raid food steal disabled",
    totem: "Culture value of every unit is increased by 1, units with leadership provide you with extra culture equal to their leadership on playing"
  };

  return game.value.inventions.slice(game.value.state.turn - 1, game.value.state.turn + 2).map(value => ({
    name: NAMES[value],
    description: DESCRIPTIONS[value]
  }));
});

</script>