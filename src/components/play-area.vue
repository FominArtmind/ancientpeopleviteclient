<template>
  <div class="min-h-screen border-l-2 border-white flex justify-between flex-col" @contextmenu="openMenu">
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
          Raid {{ action.aimPlayer }}
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
    <div v-if="opponents.length === 0" class="empty-opponents">
    </div>
    <div v-if="opponents.length > 0" class="flex">
      <Opponent v-for="opponent in opponents" :player="opponent" />
    </div>
    <Resources v-if="phase === 'living'" @cardClicked="processResourceCardClicked" />
    <Draft v-if="phase === 'development'" @cardClicked="processDraftCardClicked" @cardRightClicked="processDraftCardRightClicked" />
    <Hero @cardClicked="processHeroCardClicked" @cardRightClicked="processHeroCardRightClicked" />
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
import { ref, computed, nextTick } from "vue";
import { Card, VillageCard, Player, Action } from "../types/game";
import { MenuAction } from "../types/menu-action";
import { nickname, game, selection, actionPerformed, performAction } from "../composables/state";
import { clone } from "../utils/clone";
import ArtIcon from "./art-icon.vue";
import ChatValue from "./chat-value.vue";
import Opponent from "./opponent.vue";
import Resources from "./resources.vue";
import Draft from "./draft.vue";
import Hero from "./hero.vue";

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
      if(hero.value.state.sociality) {
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
          if(hero.value.state.playingCard) {
            console.log("hero plays", hcard.type);
          }
          else {
            // check for leadership, unity hero.value.state.leadership
            console.log("hero plays leadership/unity or wrong card", hcard.type);
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
        // TO DO perform action on the resource
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
        else {
          for(const opp of opponents.value) {
            actions.push({
              type: "raid",
              source: selection.value.village.map(value => value.card),
              aim: opp.village.filter(value => !value.rotated).map(value => value.card),
              aimPlayer: opp.nick
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

function play() {
  performPlayerAction({
    actor: nickname.value,
    type: "card",
    source: [],
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

function selectPathfindingCard() {
  performPlayerAction({
    actor: nickname.value,
    type: "choosingPathfindingCard",
    source: [],
    aim: [...selection.value.resources.map(value => value.id)]
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
    aim: [game.value.players.indexOf(opponent)]
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

</script>