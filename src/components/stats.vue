<template>
  <div class="text-center h-screen overflow-y-scroll">
    <h1>Game results</h1>
    <hr />
    <h2>General</h2>
    <h3>Turns taken: {{stat?.turns}}</h3>
    <h3>Time taken: {{gameTimeTaken}}</h3>
    <h3><span class="icon-fix"><Icon name="mdi:fire"/></span> gained: {{stat?.cultureGained}} lost: {{stat?.cultureLost}}</h3>
    <h3><span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> gained: {{stat?.foodGained}} lost: {{stat?.foodLost}}</h3>
    <hr />
    <h2>Activities</h2>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Count</th>
          <th><span class="icon-fix"><Icon name="mdi:fire"/></span></th>
          <th><span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cards played</td>
          <td>{{stat?.play.count}}</td>
          <td>{{stat?.play.culture}}</td>
          <td>{{stat?.play.food}}</td>
        </tr>
        <tr>
          <td>Hunts carried out</td>
          <td>{{stat?.hunt.count}}</td>
          <td>{{stat?.hunt.culture}}</td>
          <td>{{stat?.hunt.food}}</td>
        </tr>
        <tr>
          <td>Raids performed</td>
          <td>{{stat?.raid.count}}</td>
          <td>{{stat?.raid.culture}}</td>
          <td>{{stat?.raid.food}}</td>
        </tr>
        <tr>
          <td>Raids standed</td>
          <td>{{stat?.raided.count}}</td>
          <td>{{stat?.raided.culture}}</td>
          <td>{{stat?.raided.food}}</td>
        </tr>
        <tr>
          <td>Vastness events</td>
          <td>{{stat?.extraGain.count}}</td>
          <td>{{stat?.extraGain.culture}}</td>
          <td>{{stat?.extraGain.food}}</td>
        </tr>
        <tr>
          <td>Buys</td>
          <td>{{stat?.buys}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Upgrades</td>
          <td>{{stat?.upgrades}}</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Developments</td>
          <td>{{stat?.developments}}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h2>Players</h2>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="player in stat?.players"><b>{{player.nick}}</b></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Result</td>
          <td v-for="player in stat?.players"><b>{{player.result}}</b> <span class="icon-fix"><Icon name="mdi:fire"/></span></td>
        </tr>
        <tr>
          <td>Time taken</td>
          <td v-for="player in stat?.players"><b>{{times[player.nick]}}</b></td>
        </tr>
        <tr>
          <td>Deck cost</td>
          <td v-for="player in stat?.players"><b>{{player.deckCost}}</b> <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Gained</td>
          <td v-for="player in stat?.players">{{player.cultureGained}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.foodGained}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Lost</td>
          <td v-for="player in stat?.players">{{player.cultureLost}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.foodLost}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Cards played</td>
          <td v-for="player in stat?.players">{{player.play.count}}</td>
        </tr>
        <tr>
          <td>resulted in</td>
          <td v-for="player in stat?.players">{{player.play.culture}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.play.food}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Hunts carried out</td>
          <td v-for="player in stat?.players">{{player.hunt.count}}</td>
        </tr>
        <tr>
          <td>resulted in</td>
          <td v-for="player in stat?.players">{{player.hunt.culture}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.hunt.food}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Raids performed</td>
          <td v-for="player in stat?.players">{{player.raid.count}}</td>
        </tr>
        <tr>
          <td>resulted in</td>
          <td v-for="player in stat?.players">{{player.raid.culture}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.raid.food}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Raids standed</td>
          <td v-for="player in stat?.players">{{player.raided.count}}</td>
        </tr>
        <tr>
          <td>losses</td>
          <td v-for="player in stat?.players">{{player.raided.culture}} <span class="icon-fix"><Icon name="mdi:fire"/></span> {{player.raided.food}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></td>
        </tr>
        <tr>
          <td>Developments</td>
          <td v-for="player in stat?.players">{{player.development.count}}</td>
        </tr>
        <tr>
          <td>resulted in</td>
          <td v-for="player in stat?.players">{{player.development.food}} <span class="icon-fix"><Icon name="mdi:food-drumstick"/></span> <span class="icon-fix"><Icon name="mdi:arrow-right-thin"/></span> {{player.development.culture}} <span class="icon-fix"><Icon name="mdi:fire"/></span></td>
        </tr>
        <tr>
          <td>Deck</td>
          <td v-for="player in stat?.players">
            <h4 v-for="unit in player.deck">{{unit.type}}: <b>x {{unit.count}}</b></h4>
          </td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h2>Resources</h2>
    <div class="grid grid-cols-8 gap-1 ml-1 mr-1">
      <div v-for="resource in stat?.resources">
        <div class="not-selected">
          <CardResource :card="{ type: resource.type, id: 0 }" />
        </div>
        <div class="text-center">
          <h4>Opened: {{resource.opened}}</h4>
          <h4>Hunted: {{resource.hunted}}</h4>
          <h4><span class="icon-fix"><Icon name="mdi:food-drumstick"/></span>: {{resource.food}}</h4>
          <h4><span class="icon-fix"><Icon name="mdi:fire"/></span>: {{resource.culture}}</h4>
        </div>
      </div>				
    </div>
    <hr />
    <h2>Draft</h2>
    <h3 class="mb-2 mt-2">Put aside cards</h3>
    <div class="grid grid-cols-8 gap-1 ml-1 mr-1">
      <div v-for="card in stat?.putAsideCards">
        <div class="not-selected">
          <CardUnit :card="{ type: card.type, id: 0 }" />
        </div>
        <div class="text-center">
          <h4 class="font-semibold">x {{card.count}}</h4>
        </div>
      </div>				
    </div>
    <h3 class="mb-2 mt-2">Draft cards</h3>
    <div class="grid grid-cols-8 gap-1 ml-1 mr-1">
      <div v-for="card in stat?.draftCards">
        <div class="not-selected">
          <CardUnit :card="{ type: card.type, id: 0 }" />
        </div>
        <div class="text-center">
          <h4 class="font-semibold">x {{card.count}}</h4>
        </div>
      </div>				
    </div>
    <h3 class="mb-2 mt-2">Development cards</h3>
    <div class="grid grid-cols-8 gap-1 ml-1 mr-1">
      <div v-for="card in stat?.developmentCards">
        <div class="not-selected">
          <CardDevelopment :card="{ type: card.type, id: 0 }" />
        </div>
        <div class="text-center">
          <h4 class="font-semibold">Done: {{card.count}}</h4>
        </div>
      </div>				
    </div>
    <hr />
    <h2>Units</h2>
    <table class="table">
      <tbody v-for="card in stat?.units">
        <tr>
          <th></th>
          <th>Drafted</th>
          <th>Taken</th>
          <th>Released</th>
          <th>Played</th>
          <th>Hunted</th>
          <th>Raided</th>
          <th>Rotated</th>
          <th><span class="icon-fix"><Icon name="mdi:food-drumstick"/></span></th>
          <th><span class="icon-fix"><Icon name="mdi:fire"/></span></th>
        </tr>
        <tr>
          <td class="unit-cell"><CardUnit :card="{ type: card.type, id: 0 }" /></td>
          <td>{{card.drafted}}</td>
          <td>{{card.taken}}</td>
          <td>{{card.removed}}</td>
          <td>{{card.played}}</td>
          <td>{{card.hunted}}</td>
          <td>{{card.raided}}</td>
          <td>{{card.rotated}}</td>
          <td>{{card.food}}</td>
          <td>{{card.culture}}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <button class="bg-ancient-600 hover:bg-ancient-500 rounded-none text-white py-1 px-4 focus:outline-none focus:shadow-outline return-button" type="button" @click="returnToLobby">Return to lobby</button>
    <hr class="last-hr" />
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
h3 {
  font-size: 1.25rem;
}
th {
  padding: 0.25rem;
  border: 1px white solid;
}
td {
  padding: 0.25rem;
  border: 1px white solid;
}
hr {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
.last-hr {
  margin-bottom: 0rem;
}
.table {
  margin-left: auto;
  margin-right: auto;
}

.unit-cell {
  min-width: 150px;
}

.return-button {
  width: calc(80vw - 48px);
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { game, stat } from "../composables/state";
import { Statistics } from "../types/statistics";
import Icon from "./icon.vue";
import CardResource from "./card-resource.vue";
import CardUnit from "./card-unit.vue";
import CardDevelopment from "./card-development.vue";

const timeString = (ms: number) => {
  let sec = Math.round(ms / 1000);
  const h = Math.floor(sec / 3600);
  const min = Math.floor((sec - h * 3600) / 60);
  sec -= h * 3600 + min * 60;
  return h ? (h.toString(10) + ":" + (min < 10 ? "0" : "") + min.toString(10) + ":" + (sec < 10 ? "0" : "") + sec.toString(10)) : (min < 10 ? "0" : "") + min.toString(10) + ":" + (sec < 10 ? "0" : "") + sec.toString(10);
};

const gameTimeTaken = computed(() => {
  return timeString((stat.value as Statistics).timeTakenMs);
});

const times = computed(() => {
  let times: { [nick: string]: string } = {};

  for(const player of game.value.state.players) {
    times[player.nick] = timeString(player.timeTakenMs);
  }

  return times;
});

const returnToLobby = () => {
  window.location.href = "/#/lobby";
};

</script>
