<template>
  <v-dialog width="750">
    <template v-slot:activator="{ props }">
      <div v-bind="props" class="flex flex-wrap items-center m-2 cursor-pointer" @click="dialog = true">
        <template v-if="event.type === 'hunt'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ArtIcon v-for="unit in event.hunters" :type="unit" />
          <ChatValue :value="event.resource === 'fish' ? 'fishes' : 'hunts'" />
          <ArtIcon v-for="_n in event.number" :type="event.resource" :kind="'resource'" />
          <Icon name="mdi:arrow-right-thin"/>
          <template v-if="event.food && event.food !== 0">
            <ChatValue :value="event.food" />
            <Icon name="mdi:food-drumstick"/>
          </template>
          <template v-if="event.culture && event.culture !== 0">
            <ChatValue :value="event.culture" />
            <Icon name="mdi:fire"/>
          </template>
        </template>
        <template v-else-if="event.type === 'raid'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ArtIcon v-for="unit in event.raiders" :type="unit.type" />
          <ChatValue :value="'raids'" />
          <ChatValue :value="event.aim" />
          <ArtIcon v-for="unit in event.victims" :type="unit.type" />
          <ChatValue :value="`(${event.chances?.winRate}%)`"/>
          <Icon name="mdi:arrow-right-thin"/>
          <ChatValue :value="event.success ? 'SUCCESS' : 'FAILURE'" />
          <template v-if="event.foodGain && event.foodGain !== 0">
            <ChatValue :value="event.foodGain" />
            <Icon name="mdi:food-drumstick"/>
          </template>
          <template v-if="event.cultureGain && event.cultureGain !== 0">
            <ChatValue :value="event.cultureGain" />
            <Icon name="mdi:fire"/>
          </template>
        </template>
        <template v-else-if="event.type === 'card'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'plays'" />
          <ArtIcon :type="event.unit" />
        </template>
        <template v-else-if="event.type === 'pass'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'passes'" />
        </template>
        <template v-else-if="event.type === 'timePenalty'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'lost'" />
          <ChatValue :value="event.culture" />
          <Icon name="mdi:fire"/>
          <ChatValue :value="'due to time penalty'" />
        </template>
        <template v-else-if="event.type === 'putAsideResources'">
          <ArtIcon v-for="resource in event.resources" :type="resource" :kind="'resource'" />
          <ChatValue :value="'discarded'" />
        </template>
        <template v-else-if="event.type === 'turn'">
          <div class="font-semibold my-6">
            <ChatValue :value="'Turn'" />
            <ChatValue :value="event.turn" />
            <ChatValue :value="event.phase" />
            <ChatValue :value="'phase'" />
          </div>
        </template>
        <template v-else-if="event.type === 'extraFood'">
          <ChatValue :value="'Draft culture level'" />
          <ChatValue :value="event.maxCulture" />
          <template v-if="event.discard?.length">
            <ArtIcon v-for="unit in event?.discard" :type="unit" />
            <ChatValue :value="'discarded as not meeting the requirements'" />
          </template>
        </template>
        <template v-else-if="event.type === 'develop'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'develops'" />
          <ArtIcon :type="event.card" :kind="'development'" />
        </template>
        <template v-else-if="event.type === 'end'">
          <div class="font-semibold">
            <ChatValue :value="'Winner is'" />
            <ChatValue :value="event.winner" />
            <ChatValue :value="'! Results:'" />
            <template v-for="(value, key) in event.result">
              <ChatValue :value="key" />
              <ChatValue :value="value" />
              <Icon name="mdi:fire"/>
            </template>
          </div>
        </template>
        <template v-else-if="event.type === 'buy'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'buys'" />
          <ArtIcon :type="event.unit" />
        </template>
        <template v-else-if="event.type === 'upgrade'">
          <ChatValue :value="event.actor" />
          <ChatValue :value="'upgrades'" />
          <ArtIcon :type="event.from" />
          <Icon name="mdi:arrow-right-thin"/>
          <ArtIcon :type="event.unit" />
        </template>
        <template v-else-if="event.type === 'pathfindingChoice'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'adds'" />
          <ArtIcon :type="event.resource" :kind="'resource'" />
          <template v-if="event.from">
            <ChatValue :value="'from'" />
            <ChatValue :value="event.from" />
          </template>
          <ChatValue :value="'to own resources'" />
        </template>
        <template v-else-if="event.type === 'migrationChoice'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'choses'" />
          <ChatValue :value="event.resource" />
          <ChatValue :value="'and adds to own resources'" />
        </template>
        <template v-else-if="event.type === 'extraCards'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'adds'" />
          <ChatValue :value="event.number" />
          <ChatValue :value="'extra cards to their hand'" />
        </template>
        <template v-else-if="event.type === 'scent'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'opens'" />
          <ArtIcon v-for="resource in event.resources" :type="resource" :kind="'resource'" />
          <template v-if="event.resources?.includes(event.resourceType as string)">
            <ChatValue :value="'and adds all'" />
            <ArtIcon :type="event.resourceType" :kind="'resource'" />
            <ChatValue :value="'to own resources'" />
          </template>
        </template>
        <template v-else-if="event.type === 'migration'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'adds'" />
          <ArtIcon v-for="resource in event.resources" :type="resource" :kind="'resource'" />
          <ChatValue :value="'to own resources'" />
        </template>
        <template v-else-if="event.type === 'community'">
          <!-- <ChatValue :value="event.actor" /> -->
          <div class="mx-2"></div>
          <ChatValue :value="'adds'" />
          <ArtIcon v-for="_n in event.number" :type="event.unit" />
          <ChatValue :value="'to their hand'" />
        </template>
        <template v-else-if="event.type === 'mentoring'">
          <ChatValue :value="event.actor" />
          <div class="mx-2"></div>
          <template v-if="event.added?.length">
            <ChatValue :value="'added'" />
            <ArtIcon v-for="unit in event.added" :type="unit" />
            <ChatValue :value="'to village'" />
          </template>
          <template v-if="event.removed?.length">
            <ChatValue :value="'moved'" />
            <ArtIcon v-for="unit in event.removed" :type="unit" />
            <ChatValue :value="'to cultural layer'" />
          </template>
          <ChatValue :value="'due to mentoring'" />
        </template>
        <template v-else-if="event.type === 'village'">
          <ChatValue :value="event.actor" />
          <div class="mx-2"></div>
          <ChatValue :value="'gains'" />
          <template v-if="event.food && event.food !== 0">
            <ChatValue :value="event.food" />
            <Icon name="mdi:food-drumstick"/>
          </template>
          <template v-if="event.culture && event.culture !== 0">
            <ChatValue :value="event.culture" />
            <Icon name="mdi:fire"/>
          </template>
          <template v-if="event.sacrificeCulture">
            <ChatValue :value="'and sacrifices'" />
            <ChatValue :value="event.sacrificedFood" />
            <Icon name="mdi:food-drumstick"/>
            <ChatValue :value="'to get'" />
            <ChatValue :value="event.sacrificeCulture" />
            <Icon name="mdi:fire"/>
          </template>
          <ChatValue :value="'due to village actions'" />
        </template>
        <template v-else-if="event.type === 'chat'">
          <div class="chat-player-message">
            <ChatValue :value="event.actor" />
            <ChatValue :value="':'" />
            <ChatValue class="italic" :value="event.text" />
          </div>
        </template>
        <template v-else>
          <ChatValue :value="'UNKNOWN CHAT EVENT'" />
        </template>
      </div>
      <hr class="opacity-25" />
    </template>

    <template v-slot:default>
      <v-card>
        <v-card-item>
          <v-card-title class="text-3xl">{{ title }}</v-card-title>
        </v-card-item>
        <v-card-text class="text-center">
          <template v-if="event.type === 'hunt'">
            <div class="my-2"></div>
            <div class="details-text"><ChatValue :value="event.actor" /></div>
            <div class="flex justify-evenly"><CardUnit v-for="unit in event.hunters" :card="{ id: 0, type: unit }" /></div>
            <div class="details-text"><ChatValue :value="event.resource === 'fish' ? 'fishes' : 'hunts'" /></div>
            <div class="flex justify-evenly"><CardResource v-for="_n in event.number" :card="{ id: 0, type: event.resource as string }" /></div>
            <div class="details-text">resulting in</div>
            <div class="details-outcome m-auto">
              <template v-if="event.food && event.food !== 0">
                <ChatValue :value="event.food" />
                <Icon name="mdi:food-drumstick"/>
              </template>
              <template v-if="event.culture && event.culture !== 0">
                <ChatValue :value="event.culture" />
                <Icon name="mdi:fire"/>
              </template>
            </div>
          </template>
          <template v-else-if="event.type === 'raid'">
            <div class="my-2"></div>
            <div class="details-text"><ChatValue :value="event.actor" /></div>
            <div class="card-grid grid-cols-5">
              <div class="adaptive-text-container" v-for="unit in event.raiders">
                <CardUnit :card="{ id: 0, type: unit.type }" />
                <div class="m-auto"><Icon v-for="_n in unit.impact" name="mdi:axe"/></div>
              </div>
            </div>
            <div class="details-text"><ChatValue :value="'raids'" /><ChatValue :value="event.aim" /><ChatValue :value="`(${event.chances?.winRate}%)`"/></div>
            <div class="card-grid grid-cols-5">
              <div class="adaptive-text-container" v-for="unit in event.victims">
                <CardUnit :card="{ id: 0, type: unit.type }" />
                <div class="m-auto"><Icon v-for="_n in unit.impact" name="mdi:shield"/></div>
              </div>
            </div>
            <div class="details-text">resulting in {{ event.success ? "SUCCESS" : "FAILURE" }}</div>
            <div class="details-outcome m-auto">
              <template v-if="event.foodGain && event.foodGain !== 0">
                <ChatValue :value="event.foodGain" />
                <Icon name="mdi:food-drumstick"/>
              </template>
              <template v-if="event.cultureGain && event.cultureGain !== 0">
                <ChatValue :value="event.cultureGain" />
                <Icon name="mdi:fire"/>
              </template>
              <ChatValue :value="'(' + ((event.foodLost || event.cultureLost) ? '' : 'nothing')" />
              <template v-if="event.foodLost && event.foodLost !== 0">
                <ChatValue :value="event.foodLost" />
                <Icon name="mdi:food-drumstick"/>
              </template>
              <template v-if="event.cultureLost && event.cultureLost !== 0">
                <ChatValue :value="event.cultureLost" />
                <Icon name="mdi:fire"/>
              </template>
              <ChatValue :value="'lost by ' + event.aim + ')'" />
            </div>
          </template>
          <template v-else-if="event.type === 'card'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'plays'" />
            <div class="flex justify-evenly">
              <CardUnit :card="{ id: 0, type: event.unit as string }" />
            </div>
          </template>
          <template v-else-if="event.type === 'pass'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'passes'" />
          </template>
          <template v-else-if="event.type === 'timePenalty'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'lost'" />
            <ChatValue :value="event.culture" />
            <Icon name="mdi:fire"/>
            <ChatValue :value="'due to time penalty'" />
          </template>
          <template v-else-if="event.type === 'putAsideResources'">
            <div class="flex justify-evenly">
              <CardResource v-for="resource in event.resources" :card="{ id: 0, type: resource }" />
            </div>
            <ChatValue :value="'discarded'" />
          </template>
          <template v-else-if="event.type === 'turn'">
            <div class="font-semibold my-6">
              <ChatValue :value="'Turn'" />
              <ChatValue :value="event.turn" />
              <ChatValue :value="event.phase" />
              <ChatValue :value="'phase'" />
            </div>
          </template>
          <template v-else-if="event.type === 'extraFood'">
            <ChatValue :value="'Draft culture level'" />
            <ChatValue :value="event.maxCulture" />
            <template v-if="event.discard?.length">
              <div class="flex justify-evenly">
                <CardUnit v-for="unit in event?.discard" :card="{ id: 0, type: unit }" />
              </div>
              <ChatValue :value="'discarded as not meeting the requirements'" />
            </template>
          </template>
          <template v-else-if="event.type === 'develop'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'develops'" />
            <div class="flex justify-evenly">
              <CardDevelopment :card="{ id: 0, type: event.card as string }" />
            </div>
          </template>
          <template v-else-if="event.type === 'end'">
            <div class="font-semibold">
              <ChatValue :value="'Winner is'" />
              <ChatValue :value="event.winner" />
              <ChatValue :value="'! Results:'" />
              <template v-for="(value, key) in event.result">
                <ChatValue :value="key" />
                <ChatValue :value="value" />
                <Icon name="mdi:fire"/>
              </template>
            </div>
          </template>
          <template v-else-if="event.type === 'buy'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'buys'" />
            <div class="flex justify-evenly">
              <CardUnit :card="{ id: 0, type: event.unit as string }" />
            </div>
          </template>
          <template v-else-if="event.type === 'upgrade'">
            <ChatValue :value="event.actor" />
            <ChatValue :value="'upgrades'" />
            <div class="flex justify-evenly">
              <CardUnit :card="{ id: 0, type: event.from as string }" />
            </div>
            <div class="details-text"><ChatValue :value="'to'" /></div>
            <div class="flex justify-evenly">
              <CardUnit :card="{ id: 0, type: event.unit as string }" />
            </div>
          </template>
          <template v-else-if="event.type === 'pathfindingChoice'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'adds'" />
            <div class="flex justify-evenly">
              <CardResource :card="{ id: 0, type: event.resource as string }" />
            </div>
            <div class="details-text">
              <template v-if="event.from">
                <ChatValue :value="'from'" />
                <ChatValue :value="event.from" />
              </template>
              <ChatValue :value="'to own resources'" />
            </div>
          </template>
          <template v-else-if="event.type === 'migrationChoice'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'choses'" />
            <div class="flex justify-evenly">
              <CardResource :card="{ id: 0, type: event.resource as string }" />
            </div>
            <div class="details-text"><ChatValue :value="'and adds to own resources'" /></div>
          </template>
          <template v-else-if="event.type === 'extraCards'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'adds'" />
            <ChatValue :value="event.number" />
            <ChatValue :value="'extra cards to their hand'" />
          </template>
          <template v-else-if="event.type === 'scent'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'opens'" />
            <div class="flex justify-evenly">
              <CardResource v-for="resource in event.resources" :card="{ id: 0, type: resource }" />
            </div>
            <div class="details-text">
              <template v-if="event.resources?.includes(event.resourceType as string)">
                <ChatValue :value="'and adds all'" />
                <ArtIcon :type="event.resourceType" :kind="'resource'" />
                <ChatValue :value="'to own resources'" />
              </template>
            </div>
          </template>
          <template v-else-if="event.type === 'migration'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'adds'" />
            <div class="flex justify-evenly">
              <CardResource v-for="resource in event.resources" :card="{ id: 0, type: resource }" />
            </div>
            <div class="details-text">
              <ChatValue :value="'to own resources'" />
            </div>
          </template>
          <template v-else-if="event.type === 'community'">
            <!-- <ChatValue :value="event.actor" /> -->
            <div class="mx-2"></div>
            <ChatValue :value="'adds'" />
            <div class="flex justify-evenly"><CardUnit v-for="_n in event.number" :card="{ id: 0, type: event.unit as string }" /></div>
            <div class="details-text"><ChatValue :value="'to their hand'" /></div>
          </template>
          <template v-else-if="event.type === 'mentoring'">
            <ChatValue :value="event.actor" />
            <div class="mx-2"></div>
            <template v-if="event.added?.length">
              <ChatValue :value="'added'" />
              <div class="flex justify-evenly"><CardUnit v-for="unit in event.added" :card="{ id: 0, type: unit }" /></div>
              <div class="details-text"><ChatValue :value="'to village'" /></div>
            </template>
            <template v-if="event.removed?.length">
              <ChatValue :value="'moved'" />
              <div class="flex justify-evenly"><CardUnit v-for="unit in event.removed" :card="{ id: 0, type: unit }" /></div>
              <div class="details-text"><ChatValue :value="'to cultural layer'" /></div>
            </template>
            <div class="details-text"><ChatValue :value="'due to mentoring'" /></div>
          </template>
          <template v-else-if="event.type === 'village'">
            <ChatValue :value="event.actor" />
            <div class="mx-2"></div>
            <ChatValue :value="'gains'" />
            <template v-if="event.food && event.food !== 0">
              <ChatValue :value="event.food" />
              <Icon name="mdi:food-drumstick"/>
            </template>
            <template v-if="event.culture && event.culture !== 0">
              <ChatValue :value="event.culture" />
              <Icon name="mdi:fire"/>
            </template>
            <template v-if="event.sacrificeCulture">
              <ChatValue :value="'and sacrifices'" />
              <ChatValue :value="event.sacrificedFood" />
              <Icon name="mdi:food-drumstick"/>
              <ChatValue :value="'to get'" />
              <ChatValue :value="event.sacrificeCulture" />
              <Icon name="mdi:fire"/>
            </template>
            <ChatValue :value="'due to village actions'" />
          </template>
          <template v-else-if="event.type === 'chat'">
            <div class="chat-player-message">
              <ChatValue :value="event.actor" />
              <ChatValue :value="':'" />
              <ChatValue class="italic" :value="event.text" />
            </div>
          </template>
          <template v-else>
            <ChatValue :value="'UNKNOWN CHAT EVENT'" />
          </template>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.chat-player-message {
  color: #f3f598
}

.details-text {
  font-size: larger;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.details-outcome {
  font-size: 1.5rem;
  padding-top: 1rem;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { GeneralEvent } from "../types/events";
import ArtIcon from "./art-icon.vue";
import ChatValue from "./chat-value.vue";
import Icon from "./icon.vue";
import CardUnit from "./card-unit.vue";
import CardResource from "./card-resource.vue";
import CardDevelopment from "./card-development.vue";

const props = defineProps<{ event: GeneralEvent}>();

const dialog = ref(false);

const title = computed(() => {
  switch(props.event.type) {
    case "timePenalty":
      return "Time Penalty";
    case "putAsideResources":
      return "Resources discarded";
    case "turn":
      return "Round";
    case "extraFood":
      return "Environment Extra Food";
    case "end":
      return "Game finished";
    case "hunt":
      return "Hunt";
    case "raid":
      return "Raid";
    case "buy":
      return "Unit added";
    case "upgrade":
      return "Unit upgraded";
    case "develop":
      return "Development";
    case "pathfindingChoice":
      return "Pathfinding Choice";
    case "migrationChoice":
      return "Migration Choice";
    case "card":
      return "Card played";
    case "pass":
      return "Pass";
    case "extraCards":
      return "Extra Cards Received"
    case "scent":
      return "Scent resources";
    case "migration":
      return "Migration resources";
    case "community":
      return "Community Units";
    case "mentoring":
      return "Mentoring";
    case "village":
      return "Site Actions";
    case "chat":
      return "Message";
    default:
      return "Unknown";
  }
});
</script>
