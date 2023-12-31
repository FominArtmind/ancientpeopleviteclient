<template>
  <CardBody :selected="selected">
    <h3 v-if="player" class="player-nick">{{ player }}</h3>
    <div class="w-full image-container bg-contain bg-no-repeat" :style="{ 'background-image': 'url(./gamedata/resources/views/' + card.type + '-white.png)' }">
      <v-tooltip activator="parent" location="bottom" max-width="200px" open-delay="750">{{ resource?.title }}</v-tooltip>
    </div>
    <div class="font-larger line-height-fix">
      <div class="font-size-fix">
        <Info v-if="resource?.hunting" :tooltip="'Requires ' + resource?.peopleCost + ' hunting in total to get'">
          <Icon v-for="_n in resource?.peopleCost" name="mdi:arrow-up-thin"/>
        </Info>
        <Info v-if="!resource?.hunting" :tooltip="'Requires 1 person to get'">
          <Icon name="ph:person-simple-fill"/>
        </Info>
      </div>
      <Info class="info-padding" :tooltip="resource?.title + ' provides you with ' + foodIC.value + ' food when ' + (resource?.hunting ? 'hunted' : 'fished')" :changed="foodIC.changed">
        <span>{{ foodIC.value }}</span>
        <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>
      </Info>
    </div>
  </CardBody>
</template>

<style scoped>
.player-nick {
  margin-bottom: -10%;
  margin-top: 5%;
}
.image-container {
  aspect-ratio: 5/4;
  margin-bottom: 0%;
  margin-top: 10%;
  width: 100%;
}

.line-height-fix {
  line-height: 140%;
}

.info-padding {
  margin-top: 5%;
}

.font-size-fix {
  font-size: smaller;
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { Card } from "../types/game";
import { Resource } from "../types/resource";
import { resourceCard } from "../composables/content";
import { selection, inventionChanges } from "../composables/state";
import CardBody from "./card-body.vue";
import Info from "./info.vue";
import Icon from "./icon.vue";

const props = defineProps<{ card: Card, player?: string }>();

const resource = computed(() => {
  return resourceCard(props.card.type);
});

const foodIC = computed(() => {
  const food = (inventionChanges.value[props.card.type] as Resource)?.food;
  if(food !== undefined) {
    return { changed: true, value: food };
  }
  return { changed: false, value: resource.value.food };
});

const selected = computed(() => {
  return selection.value.resources.some(value => value.id === props.card.id);
});

</script>