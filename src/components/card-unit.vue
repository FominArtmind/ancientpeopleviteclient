<template>
  <CardBody :selected="selected" :suggested="suggested" :rotated="rotated">
    <div class="">
      <Info class="unit-cost" :tooltip="`${unit?.title} costs ${unit?.foodCost} food on draft`">
        <div class="food-cost">{{unit?.foodCost}}</div>
      </Info>
      <div class="unit-title">{{ unit?.title }}</div>
      <Info v-if="unit?.cultureLevel" class="unit-culture-level" :tooltip="`${unit?.title} requires at least one player having culture level of ${unit?.cultureLevel} or higher to appear on draft, you must have culture level of ${unit?.cultureLevel} or higher to be able to buy/upgrade to this card`">
        {{unit?.cultureLevel}}<span class="icon-fix"><Icon name="bi:fire"/></span>
      </Info>
    </div>
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(./gamedata/units/views/' + card.type + '-icon-white.png)' }"></div>
    <div>
      <template v-if="unit?.hunting"><Info :tooltip="`${unit?.title} has hunting ${unit?.hunting} (needed for deer, aurochs, mammoth)`"><Icon v-for="n in unit?.hunting" name="teenyicons:arrow-up-outline"/></Info></template>
      <template v-if="unit?.attack"><Info :tooltip="`${unit?.title} has attack ${unit?.attack} (needed in raids, increases raid attack dice throw by ${unit?.attack})`"><Icon v-for="n in unit?.attack" name="mdi:axe"/></Info></template>
      <template v-if="unit?.cultureExchange"><Info :tooltip="`${unit?.title} has culture exchange ${unit?.cultureExchange} (needed in raids, increases raid difference for determining culture gain by ${unit?.cultureExchange})`"><Icon v-for="n in unit?.cultureExchange" name="mdi:torch"/></Info></template>
      <template v-if="unit?.defense"><Info :tooltip="`${unit?.title} has defense ${unit?.defense} (needed in raids defending, increases raid defense dice throw by ${unit?.defense})`"><Icon v-for="n in unit?.defense" name="ic:round-shield"/></Info></template>
      <template v-if="unit?.raidFoodSteal"><Info :tooltip="`${unit?.title} has raid food steal ${unit?.hunting}`"><Icon name="uil:corner-up-right-alt"/>{{ unit?.raidFoodSteal }}</Info></template>
      <template v-if="unit?.unique"><Info :tooltip="`${unit?.title} is unique - you can possess only one unit of such type in your deck`"><Icon name="mdi:star-four-points-outline"/></Info></template>
    </div>
    <div v-if="extraCards"><Info :tooltip="`${unit?.title} adds ${extraCards} extra unit cards from the deck to your hand`"><Icon v-for="n in extraCards" class="font-larger" name="mdi:plus-thick"/></Info></div>
    <div v-if="community"><Info :tooltip="`${unit?.title} opens ${community} unit cards from the deck, adds ${unit?.title} ones to your hand, other card types are put under the deck`">Community{{ community > 1 ? " " + community : "" }}</Info></div>
    <div v-if="migration"><Info :tooltip="`${unit?.title} opens ${migration} resource cards and adds them to your resources`">Migration{{ migration > 1 ? " " + migration : "" }}</Info></div>
    <div v-if="scent"><Info :tooltip="`${unit?.title} opens ${scent.value} resource cards and adds all ${scent.type} to your resources`">{{ scent.type }} scent {{ scent.value }}</Info></div>
    <div v-if="sociality"><Info :tooltip="`${unit?.title} adds ${sociality} unit cards from the deck to your hand, then you need to put the same amount of cards from the hand under the deck`">Sociality{{ sociality > 1 ? " " + sociality : "" }}</Info></div>
    <div v-if="leadership"><Info :tooltip="`${unit?.title} alows to play ${leadership} extra unit cards from the hand (each card food cost must be less than ${unit?.title} food cost, that is, ${unit?.foodCost}`">Leadership{{ leadership > 1 ? " " + leadership : "" }}</Info></div>
    <div v-if="pathfinding"><Info :tooltip="`${unit?.title} moves any resource card (including other players' ones) to your resources`">Pathfinding</Info></div>
    <div v-if="reflection"><Info :tooltip="`${unit?.title} gain 1 culture for each not rotated card with culture level more than zero at your site`">Reflection</Info></div>
    <div v-if="unity"><Info :tooltip="`${unit?.title} alows to play any amount of extra ${unit?.title} cards from the hand`">Unity</Info></div>
    <div v-if="resourceBonus"><Info :tooltip="`${unit?.title} gains ${resourceBonus.value} additional food for every ${resourceBonus.type} card hunted with them`">{{ resourceBonus.type }} +{{ resourceBonus.value }}</Info></div>
    <div v-if="sneak"><Info :tooltip="`${unit?.title} gains 1 additional food for each unit defeated in raid`">Sneak</Info></div>
    <div v-if="mentoring"><Info :tooltip="`${unit?.title} opens ${mentoring} card(s) from the deck on the draft, all Inhabitant ones are put to the cultural layer, other ones added to the cards in play`">Mentoring{{ mentoring > 1 ? " " + mentoring : "" }}</Info></div>
    <div v-if="cultureLevelIncrease"><Info :tooltip="`${unit?.title} increases your culture level on draft by ${cultureLevelIncrease} (not counted towards victory points)`">Culture Level +{{ cultureLevelIncrease }}</Info></div>
    <div v-if="hideaway"><Info :tooltip="`${unit?.title} hides up to {{ hideaway }} food on site from raiders`">Hideaway {{ hideaway }}</Info></div>
    <div v-if="valor"><Info :tooltip="`${unit?.title} gains ${valor} culture exchange for each defender when raids`">Valor{{ valor > 1 ? " " + valor : "" }}</Info></div>
    <div v-if="cultureResistance"><Info :tooltip="`${unit?.title} decreases total culture exchange of raiders by 1 for each raider`">Resistance</Info></div>
    <div v-if="cultureRaid"><Info :tooltip="`${unit?.title} instantly transforms all the food gained in raid to culture`">Domination</Info></div>
    <template v-if="unit?.villageAction">
      <div class="village-action">
        <div class="village-action-icon">
          <Info :tooltip="`${unit?.title} performs Site Action if stays at site in the end of the living phase and has not been defeated in a raid`">
            <Icon name="mdi:campfire"/>:&nbsp;
          </Info>
        </div>
        <Info v-if="unit?.villageAction?.food" :tooltip="`${unit?.title} provides ${unit?.villageAction?.food} additional food if stays at site in the end of the living phase and has not been defeated in a raid`">{{unit?.villageAction?.food}}<span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></Info>
        <Info v-if="unit?.villageAction?.culture" :tooltip="`${unit?.title} provides ${unit?.villageAction?.culture} additional culture if stays at site in the end of the living phase and has not been defeated in a raid`">{{unit?.villageAction?.culture}}<span class="icon-fix"><Icon name="bi:fire"/></span></Info>
        <Info v-if="unit?.villageAction?.sacrifice" :tooltip="`${unit?.title} converts all site food to culture if stays at site in the end of the living phase and has not been defeated in a raid`">Sacrifice</Info>
      </div>
    </template>
    <Info v-if="unit?.cultureValue" class="unit-culture-value" :tooltip="`${unit?.title} can provide up to ${unit?.cultureValue} culture when defeated in raid`">
      <span class="icon-fix"><Icon name="ic:outline-local-fire-department"/></span><span>{{unit?.cultureValue}}</span>
    </Info>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: -15%;
  margin-top: 0%;
  width: 100%;
}

.food-cost {
  font-weight: 500;
  padding-left: 25%;
  padding-right: 25%;
}

.icon-fix {
  font-size: smaller;
  vertical-align: top;
}

.unit-cost {
  position: absolute;
  left: 5%;
  top: 2.5%;
}

.unit-title {
  margin-left: auto;
  margin-right: auto;
}

.unit-culture-level {
  position: absolute;
  right: 5%;
  top: 2.5%;
}

.unit-culture-value {
  position: absolute;
  right: 5%;
  bottom: 2.5%;
}

.village-action {
  position: absolute;
  bottom: 2.5%;
  left: 7.5%;
  margin-left: auto;
  margin-right: auto;
}

.village-action-icon {
  display: inline-block;
  position: relative;
  left: 0;
  top: -1%;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Card } from "../types/game";
import { UnitProperties } from "../types/unit";
import { unitCard } from "../composables/content";
import { selection } from "../composables/state";
import { capitalize } from "../utils/capitalize";
import CardBody from "./card-body.vue";
import Info from "./info.vue";
import Icon from "./icon.vue";

const props = defineProps<{ card: Card, location?: "village" | "hand" | "draft", suggested?: boolean, rotated?: boolean }>();

const unit = ref(await unitCard(props.card.type));

const uprops = computed((): UnitProperties => {
  return unit.value?.properties || {};
});
const migration = computed((): number | undefined => {
  return uprops.value.migration;
});
const scent = computed((): { type: string, value: number } | undefined => {
  if(uprops.value.scent) {
    for(const [key, value] of Object.entries(uprops.value.scent)) {
      if(value) {
        return { type: capitalize(key), value };
      }
    }
  }
});
const leadership = computed((): number | undefined => {
  return uprops.value.leadership;
});
const sociality = computed((): number | undefined => {
  return uprops.value.sociality;
});
const extraCards = computed((): number | undefined => {
  return uprops.value.extraCards;
});
const community = computed((): number | undefined => {
  return uprops.value.community;
});
const unity = computed((): boolean | undefined => {
  return uprops.value.unity;
});
const sneak = computed((): number | undefined => {
  return uprops.value.sneak;
});
const mentoring = computed((): number | undefined => {
  return uprops.value.mentoring;
});
const cultureLevelIncrease = computed((): number | undefined => {
  return uprops.value.cultureLevelIncrease;
});
const hideaway = computed((): number | undefined => {
  return uprops.value.hideaway;
});
const reflection = computed((): boolean | undefined => {
  return uprops.value.reflection;
});
const pathfinding = computed((): boolean | undefined => {
  return uprops.value.pathfinding;
});
const valor = computed((): number | undefined => {
  return uprops.value.valor;
});
const cultureResistance = computed((): boolean | undefined => {
  return uprops.value.cultureResistance;
});
const cultureRaid = computed((): boolean | undefined => {
  return uprops.value.cultureRaid;
});
const resourceBonus = computed((): { type: string, value: number } | undefined => {
  if(uprops.value.resourceBonus) {
    for(const [key, value] of Object.entries(uprops.value.resourceBonus)) {
      if(value) {
        return { type: capitalize(key), value };
      }
    }
  }
});

const selected = computed(() => {
  if(props.location === "village") {
    console.log("village selection", props.card.id, selection.value.village.some(value => value.card.id === props.card.id))
    return selection.value.village.some(value => value.card.id === props.card.id);
  }
  else if(props.location === "hand") {
    console.log("hand selection", props.card.id, selection.value.hand.some(value => value.id === props.card.id))
    return selection.value.hand.some(value => value.id === props.card.id);
  }
  else if(props.location === "draft") {
    console.log("draft selection", selection.value.draft?.id === props.card.id)
    return selection.value.draft?.id === props.card.id;
  }
  console.log("no selection");
  return false;
});

</script>