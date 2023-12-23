<template>
  <div class="min-h-screen border-l-2 border-white flex justify-between flex-col" @contextmenu="openMenu">
    <template v-if="!gameFinished">
      <ul id="right-click-menu" tabindex="-1" ref="menu" v-if="viewMenu" class="focus:outline-none" :style="positionStyle" @blur="closeMenu">
        <template v-for="action of menuActions">
          <li v-if="action.type === 'hint'">
            <i>{{ action.hint }}</i>
          </li>
          <li v-else-if="action.type === 'done'" class="menu-action" @click="selectSocialityCardsToReturn">
            Done selection
          </li>
          <li v-else-if="action.type === 'hunt'" class="menu-action" @click="hunt">
            Hunt
          </li>
          <li v-else-if="action.type === 'raid'" class="menu-action" @click="raid(action.aimPlayer as string)">
            Raid {{ action.aimPlayer }} - {{ action.raidChances?.winRate }}% ({{ action.raidChances?.emotion }})
          </li>
          <li v-else-if="action.type === 'buy'" class="menu-action" @click="buy">
            <ChatValue :value="'Buy'" />
            <ArtIcon :type="action.aim ? action.aim[0].type : ''" />
          </li>
          <li v-else-if="action.type === 'upgrade'" class="menu-action" @click="upgrade">
            <ChatValue :value="'Upgrade'" />
            <ArtIcon :type="action.source ? action.source[0].type : ''" />
            <ChatValue :value="'to'" />
            <ArtIcon :type="action.aim ? action.aim[0].type : ''" />
          </li>
          <li v-else-if="action.type === 'develop'" class="menu-action" @click="develop">
            <ChatValue :value="'Develop to'" />
            <ArtIcon :type="action.aim ? action.aim[0].type : ''" :kind="'development'" />
          </li>
          <li v-else-if="action.type === 'pass'" class="menu-action" @click="pass">
            Pass
          </li>
          <li v-else>
            NOT SUPPORTED ACTION
          </li>
        </template>
      </ul>
      <div v-if="gameLoaded && opponents.length === 0" class="empty-opponents">
      </div>
      <div v-if="gameLoaded && opponents.length > 0" class="flex opponents">
        <Opponent v-for="opponent in opponents" :player="opponent" :effectiveCulture="playersEffectiveCulture[opponent.nick]" :activePlayer="game.state.players[game.state.actor].nick === opponent.nick" :raidChances="opponentRaidChances[opponent.nick]?.chances" :raidFoodGain="opponentRaidChances[opponent.nick]?.foodGain" />
      </div>
      <Resources v-if="gameLoaded && phase === 'living'" @cardClicked="processResourceCardClicked" />
      <Draft v-if="gameLoaded && phase === 'development'" :heroEffectiveCulture="heroEffectiveCulture" @cardClicked="processDraftCardClicked" @cardRightClicked="processDraftCardRightClicked" />
      <Hero v-if="gameLoaded" :effectiveCulture="heroEffectiveCulture" @cardClicked="processHeroCardClicked" @cardRightClicked="processHeroCardRightClicked" />
    </template>
    <template v-if="gameFinished">
      <Stats />
    </template>
  </div>
</template>

<style scoped>
#right-click-menu {
  background: #7dafbb;
  border: 1px solid #BDBDBD;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 350px;
  z-index: 999999;
}

#right-click-menu li {
  border-bottom: 1px solid #E0E0E0;
  margin: 0;
  padding: 5px 35px;
  align-items: center;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu .menu-action {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
#right-click-menu .menu-action:hover {
  background: #1E88E5;
  color: #FAFAFA;
}

.empty-opponents {
  min-height: 120px;
}
.opponents {
  border-bottom: 1px solid white;
}
.village {
  display: inline-block;
  min-height: 240px;
}
.hand {
  display: inline-block;
  min-height: 240px;
}
</style>

<script setup lang="ts">
import { ref, ComputedRef, computed, nextTick } from "vue";
import { Card, VillageCard, Player, Action } from "../types/game";
import { RaidChances, MenuAction } from "../types/menu-action";
import { nickname, gameLoaded, gameFinished, game, selection, actionPerformed, performAction, UnitIC, inventionChangedUnitCards } from "../composables/state";
import { unitCards } from "../composables/content";
import { clone } from "../utils/clone";
import ArtIcon from "./art-icon.vue";
import ChatValue from "./chat-value.vue";
import Opponent from "./opponent.vue";
import Resources from "./resources.vue";
import Draft from "./draft.vue";
import Hero from "./hero.vue";
import Stats from "./stats.vue";

const menu = ref<HTMLUListElement>();
const viewMenu = ref(false);
const top = ref("0px");
const left = ref("0px");

const phase = computed(() => {
  return game.value.state.phase;
});

const hero = computed(() => {
  return game.value.state.players.find(value => value.nick === nickname.value) as Player;
});

const opponents = computed(() => {
  const playersN = game.value.players.length;
  if(playersN < 2) {
    return [];
  }
  const heroIndex = game.value.state.players.findIndex(value => value.nick === nickname.value);

  const opps = [];
  for(let n = 0; n < playersN - 1; n++) {
    opps.push(game.value.state.players[(heroIndex + 1 + n) % playersN]);
  }
  return opps;
});

const playersEffectiveCulture = computed(() => {
  const effectiveCulture: {[nick: string]: number } = {};

  if(phase.value !== "development") {
    for(const player of game.value.state.players) {
      effectiveCulture[player.nick] = player.culture;
    }
  }
  else {
    for(const player of game.value.state.players) {
      let additionalCultureLevel = 0;
      for(const unitCard of player.village) {
        const unit = unitCards().find(value => value.title === unitCard.card.type);
        if(unit?.properties?.cultureLevelIncrease) {
          additionalCultureLevel += unit.properties.cultureLevelIncrease;
        }
      }

      effectiveCulture[player.nick] = player.culture + additionalCultureLevel;
    }
  }

  return effectiveCulture;
});

const heroEffectiveCulture = computed(() => {
  return playersEffectiveCulture.value[hero.value.nick];
});

const opponentRaidChances = computed(() => {
  let result: {[name: string]: { chances: RaidChances, foodGain: number }} = {};

  if(opponents.value.length > 0) {
    if(selection.value.village.length > 0 && !selection.value.village.find(value => value.rotated)) {
      const attackers = selection.value.village.length;
      let attack = 0;
      let cultureExchange = 0;
      let valor = 0;
      let raidFoodSteal = 0;
      let sneak = 0;

      for(const villageCard of selection.value.village) {
        const unit = inventionChangedUnitCards.value.find(value => value.title === villageCard.card.type) as UnitIC;
        
        attack += unit.attack?.value || 0;
        cultureExchange += unit.cultureExchange?.value || 0;
        valor += unit?.properties?.valor || 0;
        raidFoodSteal += unit?.raidFoodSteal?.value || 0;
        sneak += unit?.properties?.sneak || 0;
      }

      const invention = game.value.inventions[game.value.state.turn - 1];

      for(const opp of opponents.value) {
        const defendingVillage = opp.village.filter(value => !value.rotated);
        const defenders = defendingVillage.length;

        let defense = 0;
        let cultureValue = 0;
        let cultureResistance = false;
        let hideaway = 0;

        for(const villageCard of defendingVillage) {
          const unit = inventionChangedUnitCards.value.find(value => value.title === villageCard.card.type) as UnitIC;
          
          defense += unit.defense?.value || 0;
          cultureValue += unit.cultureValue?.value || 0;
          if(unit.properties?.cultureResistance) {
            cultureResistance = true;
          }
          hideaway += unit.properties?.hideaway || 0;
        }
        cultureValue = Math.floor(cultureValue);
        let effectiveCultureExchange = cultureExchange += valor * defenders;
        if(cultureResistance) {
          effectiveCultureExchange = Math.min(0, cultureExchange - attackers);
        }

        const availableFood = invention !== "dog" ? Math.max(0, opp.food - hideaway) : 0;
        const foodGain = Math.min(availableFood, raidFoodSteal) + sneak * defenders;

        const chances = raidChances(attackers, attack, defenders, defense, 0, 0, effectiveCultureExchange, cultureValue);
        result[opp.nick] = { chances, foodGain };
      }
    }
  }

  return result;
});

const heroTurn = computed(() => {
  return game.value.state.players[game.value.state.actor].nick === nickname.value;
});

const positionStyle = computed(() => ({
  top: top.value,
  left: left.value
}));

function setMenu(top_: number, left_: number) {
  const largestHeight = window.innerHeight - (menu.value?.offsetHeight || 0) - 25;
  const largestWidth = window.innerWidth - (menu.value?.offsetWidth || 0) - 25;

  if(top_ > largestHeight) {
    top_ = largestHeight;
  }
  if(left_ > largestWidth) {
    left_ = largestWidth;
  }

  top.value = top_ + "px";
  left.value = left_ + "px";
}

function openMenu(e: MouseEvent) {
  viewMenu.value = true;

  nextTick(function() {
    (menu.value as HTMLUListElement).focus();

    setMenu(e.y, e.x)
  });
  e.preventDefault();
}

function closeMenu() {
  viewMenu.value = false;
}

function processHeroCardClicked(card: Card | VillageCard, location: "village" | "hand") {
  if(!actionPerformed.value) {
    if(heroTurn.value && !hero.value.state.pathfindingChoose) {
      if(hero.value.state.playingCard) {
        if(location === "hand") {
          play((card as Card).id);
        }
      }
      else if(hero.value.state.sociality) {
        if(location === "hand") {
          const hcard = card as Card;
          const index = selection.value.hand.findIndex(value => value.id === hcard.id);
          if(index === -1) {
            selection.value.hand.push(clone(hcard));
          }
          else {
            selection.value.hand.splice(index, 1);
          }
        }
      }
      else {
        if(location === "hand") {
          const hcard = card as Card;

          if(hcard.type === hero.value.state.unity) {
            play((card as Card).id);
          }
          else if(hero.value.state.leadership?.length) {
            play((card as Card).id);
          }
        }
        else if(location === "village") {
          const vcard = card as VillageCard;
          const index = selection.value.village.findIndex(value => value.card.id === vcard.card.id);
          if(phase.value === "living") {
            if(index === -1) {
              selection.value.village.push(clone(vcard));
            }
            else {
              selection.value.village.splice(index, 1);
            }
          }
          else {
            if(index === -1) {
              selection.value.village = [clone(vcard)];
            }
            else {
              selection.value.village = [];
            }
          }
        }
      }
    }
  }
}

function processHeroCardRightClicked(card: Card | VillageCard, location: "village" | "hand") {
  if(!actionPerformed.value) {
    if(heroTurn.value && !hero.value.state.pathfindingChoose) {
      if(!hero.value.state.sociality) {
        if(location === "village") {
          const vcard = card as VillageCard;
          if(phase.value === "development") {
            selection.value.village = [clone(vcard)];
          }
        }
      }
    }
  }
}

function processResourceCardClicked(card: Card, player?: string) {
  if(!actionPerformed.value) {
    if(heroTurn.value) {
      if(hero.value.state.pathfindingChoose) {
        selectPathfindingCard(card.id);
      }
      else if(!hero.value.state.sociality) {
        if(!player || player === nickname.value) {
          const index = selection.value.resources.findIndex(value => value.id === card.id);
          if(index === -1) {
            selection.value.resources.push(clone(card));
          }
          else {
            selection.value.resources.splice(index, 1);
          }
        }
      }
    }
  }
}

function processDraftCardClicked(card: Card, development: boolean) {
  if(!actionPerformed.value) {
    if(heroTurn.value) {
      if(development) {
        selection.value.draft = undefined;
        if(selection.value.development?.type === card.type) {
          selection.value.development = undefined;
        }
        else {
          selection.value.development = clone(card);
        }
      }
      else {
        selection.value.development = undefined;
        if(selection.value.draft?.type === card.type) {
          selection.value.draft = undefined;
        }
        else {
          selection.value.draft = clone(card);
        }
      }
    }
  }
}

function processDraftCardRightClicked(card: Card, development: boolean) {
  if(!actionPerformed.value) {
    if(heroTurn.value) {
      if(development) {
        selection.value.draft = undefined;
        selection.value.development = clone(card);
      }
      else {
        selection.value.development = undefined;
        selection.value.draft = clone(card);
      }
    }
  }
}

const menuActions: ComputedRef<MenuAction[]> = computed(() => {
  if(!heroTurn.value) {
    return [{
      type: "hint",
      hint: "Wait for other players"
    }];
  }

  if(actionPerformed.value) {
    return [{
      type: "hint",
      hint: "Wait for action in progress"
    }];
  }

  if(phase.value === "living") {
    if(hero.value.state.sociality) {
      if(selection.value.hand.length === hero.value.state.sociality) {
        return [{
          type: "done",
          source: clone(selection.value.hand) as Card[]
        }]
      }
      return [{
        type: "hint",
        hint: `Select ${hero.value.state.sociality} sociality cards to return to the deck` 
      }];
    }
    if(hero.value.state.pathfindingChoose) {
      return [{
        type: "hint",
        hint: `Press on any resource card to add to your resources (Pathfinding)` 
      }];
    }
    if(hero.value.state.playingCard) {
      return [{
        type: "hint",
        hint: `Press on any hand card to play it (put to your site)` 
      }];
    }
    else {
      if(!selection.value.village) {
        return [
          {
            type: "hint",
            hint: "Select site cards to perform hunt or raid, pass if no action required"
          },
          {
            type: "pass"
          }
        ];
      }

      const actions: MenuAction[] = [];
      if(selection.value.resources) {
        actions.push({
          type: "hunt",
          source: selection.value.village.map(value => value.card),
          aim: selection.value.resources
        });
      }

      if(opponents.value.length > 0) {
        if(selection.value.village.find(value => value.rotated)) {
          actions.push({
            type: "hint",
            hint: "Rotated cards can't raid"
          })
        }
        else if(selection.value.village.length > 0) {
          for(const opp of opponents.value) {
            actions.push({
              type: "raid",
              source: selection.value.village.map(value => value.card),
              aim: opp.village.filter(value => !value.rotated).map(value => value.card),
              aimPlayer: opp.nick,
              raidChances: opponentRaidChances.value[opp.nick]?.chances
            });
          }
        }
      }

      actions.push({
        type: "pass"
      });

      return actions;
    }
  }
  else {
    if(!selection.value.draft && !selection.value.development) {
      return [
        {
          type: "hint",
          hint: "Select development or draft card to buy or upgrade to, pass if no action required"
        },
        {
          type: "pass"
        }
      ];
    }

    if(selection.value.development) {
      return [
        {
          type: "develop",
          aim: [clone(selection.value.development)] as Card[]
        },
        {
          type: "pass"
        }
      ];
    }

    if(!selection.value.village.length) {
      return [
        {
          type: "buy",
          aim: [clone(selection.value.draft)] as Card[]
        },
        {
          type: "hint",
          hint: "Select site card if you want to upgrade instead"
        },
        {
          type: "pass"
        }
      ];
    }

    return [
      {
        type: "hint",
        hint: "Unselect site card if you want to buy instead"
      },
      {
        type: "upgrade",
        source: selection.value.village.map(value => value.card),
        aim: [clone(selection.value.draft)] as Card[]
      },
      {
        type: "pass"
      }
    ];
  }
});

function performPlayerAction(action: Action) {
  if(!actionPerformed.value) {
    actionPerformed.value = true;
    closeMenu();

    performAction(action);
  }
}

function play(id: number) {
  performPlayerAction({
    actor: nickname.value,
    type: "card",
    source: [id],
    aim: []
  });
}

function selectSocialityCardsToReturn() {
  performPlayerAction({
    actor: nickname.value,
    type: "returningSocialityCards",
    source: [],
    aim: [...selection.value.hand.map(value => value.id)]
  });
}

function selectPathfindingCard(id: number) {
  performPlayerAction({
    actor: nickname.value,
    type: "choosingPathfindingCard",
    source: [],
    aim: [id]
  });
}

function hunt() {
  performPlayerAction({
    actor: nickname.value,
    type: "hunt",
    source: [...selection.value.village.map(value => value.card.id)],
    aim: [...selection.value.resources.map(value => value.id)]
  });
}

function raid(opponent: string) {
  performPlayerAction({
    actor: nickname.value,
    type: "raid",
    source: [...selection.value.village.map(value => value.card.id)],
    aim: [game.value.state.players.findIndex(value => value.nick === opponent)]
  });
}

function pass() {
  performPlayerAction({
    actor: nickname.value,
    type: "pass",
    source: [],
    aim: []
  });
}

function buy() {
  performPlayerAction({
    actor: nickname.value,
    type: "buy",
    source: [],
    aim: [selection.value.draft?.id as number]
  });
}

function upgrade() {
  performPlayerAction({
    actor: nickname.value,
    type: "upgrade",
    source: [...selection.value.village.map(value => value.card.id)],
    aim: [selection.value.draft?.id as number]
  });
}

function develop() {
  performPlayerAction({
    actor: nickname.value,
    type: "develop",
    source: [],
    aim: [selection.value.development?.id as number]
  });
}

function raidChances(attackersCount: number, extraAttack: number, defendersCount: number, extraDefense: number, attackersBonus: number, defendersBonus: number, cultureExchange: number, cultureValue: number): RaidChances {
  var NORMALIZED_DICE = [0.33333333, 0.5, 0, 0.16666667];
  
  var distribution = function(normalizedDice: number[], throwsN: number) {
    if(throwsN === 0) {
      return [1.0];
    }
    
    if(throwsN === 1) {
      return normalizedDice;
    }

    const distr = distribution(normalizedDice, throwsN - 1);

    const result = [];
    for(let i = 0; i <= distr.length + normalizedDice.length - 2; i++) {
      result.push(0);
    }

    for(let i = 0; i < distr.length; i++) {
      for(let j = 0; j < normalizedDice.length; j++) {
        result[i + j] += distr[i] * normalizedDice[j];
      }
    }

    return result;
  }

  const randomAttack = attackersCount + attackersBonus;
  const randomDefense = defendersCount + defendersBonus;
  const attackDitribution = distribution(NORMALIZED_DICE, randomAttack);
  const defenseDistribution = distribution(NORMALIZED_DICE, randomDefense);

  let winRate = 0.0;

  if(attackersCount > defendersCount) {
    for(let i = 0; i < attackDitribution.length; i++) {
      for(let j = 0; j <= i + extraAttack - extraDefense && j < defenseDistribution.length; j++) {
        winRate += attackDitribution[i] * defenseDistribution[j];
      }
    }
  }
  else {
    for(let i = 0; i < attackDitribution.length; i++) {
      for(let j = 0; j < i + extraAttack - extraDefense && j < defenseDistribution.length; j++) {
        winRate += attackDitribution[i] * defenseDistribution[j];
      }
    }
  }

  const roundedWinLoseRates = (winRate: number) => {
    let w: number, l: number;

    if(winRate < 0.0001) {
      w = 0;
      l = 100;
    }
    else if(winRate > 0.9999) {
      w = 100;
      l = 0;
    }
    else if(winRate < 0.01) {
      l = Math.round((1 - winRate) * 10000.0) / 100.0;
      w = Math.round(winRate * 10000.0) / 100.0;
    }
    else if(winRate > 0.99) {
      l = Math.round((1 - winRate) * 10000.0) / 100.0;
      w = Math.round(winRate * 10000.0) / 100.0;
    }
    else {
      w = Math.round(winRate * 1000.0) / 10.0;
      l = Math.round((100 - winRate) * 10.0) / 10.0;
    }

    return { winRate: w, loseRate: l };
  }

  interface CultureGainChances {
    win: {[culture: number]: number }
    lose: {[culture: number]: number }
  }
  const cultureGainChancesMap: CultureGainChances = {
    win: {},
    lose: {}
  };

  for(let i = 0; i < attackDitribution.length; i++) {
    for(let j = 0; j < defenseDistribution.length; j++) {
      const diff = (i + extraAttack) - (j + extraDefense);
      const success = (attackersCount > defendersCount) ? diff >= 0 : diff > 0;

      const cultureGain = Math.min(Math.max(0, (i + extraAttack) - (j + extraDefense) + cultureExchange), cultureValue);

      if(success) {
        if(cultureGainChancesMap.win[cultureGain] === undefined) {
          cultureGainChancesMap.win[cultureGain] = attackDitribution[i] * defenseDistribution[j];
        }
        else {
          cultureGainChancesMap.win[cultureGain] += attackDitribution[i] * defenseDistribution[j];
        }
      }
      else {
        if(cultureGainChancesMap.lose[cultureGain] === undefined) {
          cultureGainChancesMap.lose[cultureGain] = attackDitribution[i] * defenseDistribution[j];
        }
        else {
          cultureGainChancesMap.lose[cultureGain] += attackDitribution[i] * defenseDistribution[j];
        }
      }
    }
  }

  console.log("WIN", cultureGainChancesMap.win, "LOSE", cultureGainChancesMap.lose);

  const winCultureGainArray = Object.entries(cultureGainChancesMap.win).map(value => ({ culture: parseInt(value[0], 10), chance: roundedWinLoseRates(value[1]).winRate }));
  winCultureGainArray.sort((a, b) => b.culture - a.culture);
  const loseCultureGainArray = Object.entries(cultureGainChancesMap.lose).map(value => ({ culture: parseInt(value[0], 10), chance: roundedWinLoseRates(value[1]).winRate }));
  loseCultureGainArray.sort((a, b) => b.culture - a.culture);

  const roundedRates = roundedWinLoseRates(winRate);

  const emotionalDescription = (winRate: number) => {
    if(winRate === 100) {
      return { color: "green", emotion: "Pure" };
    }
    else if(winRate >= 85) {
      return { color: "light-green", emotion: "Sure" };
    }
    else if(winRate >= 55) {
      return { color: "yellow", emotion: "Risky" };
    }
    else if(winRate >= 45) {
      return { color: "orange", emotion: "Equal" };
    }
    else if(winRate >= 15) {
      return { color: "orange", emotion: "Fishy" };
    }
    else if(winRate >= 0) {
      return { color: "red", emotion: "Cruel" };
    }
    else {
      return { color: "red", emotion: "WASTED" };
    }
  };

  return { winRate: roundedRates.winRate, loseRate: roundedRates.loseRate, winCultureGainArray, loseCultureGainArray, ...emotionalDescription(roundedRates.winRate) };
}

</script>