<template>
  <CardBody :selected="selected">
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(./gamedata/actions/views/' + card.type + '-white.png)' }">
      <v-tooltip activator="parent" location="bottom" max-width="200px" open-delay="750">{{ development?.title }}</v-tooltip>
    </div>
    <div class="font-larger line-height-fix">
      <Info :tooltip="`Requires ${foodCostIC.value} food to gain`" :changed="foodCostIC.changed">
        <span>{{ foodCostIC.value }}</span>
        <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>
      </Info>
      <span class="icon-fix transform-icon"><Icon name="mdi:arrow-right-bold-outline"/></span>
      <Info class="info-padding" :tooltip="development?.title + ' provides you with ' + development?.culture + ' culture when gained'">
        <span>{{ development?.culture }}</span>
        <span class="icon-fix"><Icon name="mdi:fire"/></span>
      </Info>
    </div>
  </CardBody>
</template>

<style scoped>
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: 10%;
  margin-top: 20%;
  width: 100%;
}

.line-height-fix {
  line-height: 140%;
}

.info-padding {
  margin-top: 5%;
}

.transform-icon {
  display: inline-block;
  padding-left: 2.5%;
  padding-right: 2.5%;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../types/game";
import { Development } from "../types/development";
import { developmentCard } from "../composables/content";
import { selection, inventionChanges } from "../composables/state";
import CardBody from "./card-body.vue";
import Info from "./info.vue";
import Icon from "./icon.vue";

const props = defineProps<{ card: Card }>();

const development = computed(() => {
  return developmentCard(props.card.type);
});

const foodCostIC = computed(() => {
  const foodCost = (inventionChanges.value[props.card.type] as Development)?.foodCost;
  if(foodCost !== undefined) {
    return { changed: true, value: foodCost };
  }
  return { changed: false, value: development.value.foodCost };
});

const selected = computed(() => {
  return selection.value.development?.id === props.card.id;
});

</script>