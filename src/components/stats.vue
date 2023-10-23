<template>
  <div class="text-center overflow-y-scroll">
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
        <tr>
          <td :colspan="(stat?.players?.length || 1) + 1"></td>
        </tr>
      </tbody>
    </table>		
    <h2>Resources</h2>
    <div class="row">
      <div v-for="resource in stat?.resources" class="col-xs-6 col-sm-4 col-md-3">
        <div class="not-selected">
          <resource-card type="resource.type" data="dataResources[resource.type]"></resource-card>
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
    <h3>Put aside cards</h3>
    <div class="row">
      <div v-for="card in stat?.putAsideCards" class="col-xs-4 col-sm-3 col-md-2 col-lg-1">
        <div class="not-selected">
          <unit-card type="card.type" data="dataUnits[card.type]"></unit-card>
        </div>
        <div class="text-center">
          <h4 class="bold">x {{card.count}}</h4>
        </div>
      </div>				
    </div>
    <h3>Draft cards</h3>
    <div class="row">
      <div v-for="card in stat?.draftCards" class="col-xs-4 col-sm-3 col-md-2 col-lg-1">
        <div class="not-selected">
          <unit-card type="card.type" data="dataUnits[card.type]"></unit-card>
        </div>
        <div class="text-center">
          <h4 class="bold">x {{card.count}}</h4>
        </div>
      </div>				
    </div>
    <h3>Development cards</h3>
    <div class="row">
      <div v-for="card in stat?.developmentCards" class="col-xs-4 col-sm-3 col-md-2 col-lg-1">
        <div class="not-selected">
          <development-card type="card.type" data="dataDevelopments[card.type]"></development-card>
        </div>
        <div class="text-center">
          <h4 class="bold">Done: {{card.count}}</h4>
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
          <td>
          <unit-card type="card.type" data="dataUnits[card.type]"></unit-card>
          </td>migrationChoice
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
    <button class="btn btn-lg btn-primary inline" ng-click="returnToLobby()">Return to lobby</button>
    <hr />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { computed } from "vue";
import { game, stat } from "../composables/state";
import { Statistics } from "../types/statistics";

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

</script>
