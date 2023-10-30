import { ref } from "vue";

import { GeneralEvent } from "../types/events";
import { Card, VillageCard, Game, Action } from "../types/game";
import { InventionChanges } from "../types/invention-changes";
import { Statistics } from "../types/statistics";
import { unitCards, developmentCard } from "../composables/content";
import { GAME_STUB, HAND_STUB } from "./stubs";

// @ts-ignore
import io from "socket.io-client";
// @ts-ignore
export const socket = io.connect(import.meta.env.VITE_API_ADDRESS, { query: "token=" + localStorage.getItem("token") });

export interface GameState {
  game: Game
  hand: Card[]
  events: GeneralEvent[]
}

export interface SelectionState {
  resources: Card[]
  hand: Card[]
  village: VillageCard[]
  draft?: Card
  development?: Card
}

export const gameId = ref<string>(localStorage.getItem("gameId") as string);
export const nickname = ref<string>(localStorage.getItem("nickname") || "Arseniy" as string);

export const actionPerformed = ref(false);

export const gameLoaded = ref(false);
export const gameFinished = ref(false);
export const game = ref<Game>(GAME_STUB);

export const handLoaded = ref(false);
export const hand = ref<Card[]>(HAND_STUB);

export const events = ref<GeneralEvent[]>([]);

export const inventionChanges = ref<InventionChanges>({});

export const stat = ref<Statistics>();

const emtySelection = () => {
  return {
    resources: [],
    hand: [],
    village: []
  }
};

export const selection = ref<SelectionState>(emtySelection());

export const performAction = (action: Action) => {
  console.log("Action", action);

  socket.emit("gameAction", { nickname: nickname.value, gameId: gameId.value, gameAction: action });
}

export const sendMessage = (text: string) => {
  console.log("Chat", text);

  socket.emit("gameChat", { nickname: nickname.value, gameId: gameId.value, message: text });
}

socket.on("connect", () => {
  console.log("Socket authenticated", { nickname: nickname.value, gameId: gameId.value });
  socket.emit("gameInit", { nickname: nickname.value, gameId: gameId.value });
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("game", (game_: Game) => {
  console.log("Socket game", game_);
  game.value = game_;
  if(game.value.events) {
    for(const event of game.value.events) {
      events.value.push(event);
    }
  }

  const disableInventions = game_.options.find(value => value.name === "disableInventions")?.value === "true";
  if(!gameFinished.value && !disableInventions && game_.state.turn <= game_.inventions.length) {
    const changes: InventionChanges = {};

    const units = unitCards();

    const imbueChange = (type: string, fieldPath: string[], field: string, value: number) => {
      if(!changes[type]) {
        changes[type] = {};
      }

      let obj: any = changes[type];

      for(const part of fieldPath) {
        if(!obj[part]) {
          obj[part] = {};
        }
        obj = obj[part];
      }

      obj[field] = value;
    };

    const basketVillageActionExtraFood = () => {
      for(const unit of units) {
        if(unit.villageAction) {
          if(unit.villageAction.food) {
            imbueChange(unit.title, ["villageAction"], "food", unit.villageAction.food + 1);
          }
          else {
            imbueChange(unit.title, ["villageAction"], "food", 1);
          }
        }
      }
    };

    const basketExtraFoodSteal = () => {
      for(const unit of units) {
        if(unit.raidFoodSteal) {
          imbueChange(unit.title, [], "raidFoodSteal", unit.raidFoodSteal + 2);
        }
        else {
          imbueChange(unit.title, [], "raidFoodSteal", 2);
        }
      }
    };
    
    const foodPitVillageActionExtraFood = () => {
      for(const unit of units) {
        if(unit.villageAction) {
          if(unit.villageAction.food) {
            imbueChange(unit.title, ["villageAction"], "food", unit.villageAction.food * 2);
          }
        }
      }
    };

    const needleVillageActionExtraCulture = () => {
      for(const unit of units) {
        if(unit.villageAction) {
          if(unit.villageAction.culture) {
            imbueChange(unit.title, ["villageAction"], "culture", unit.villageAction.culture * 2);
          }
        }
      }
    };

    const paintsVillageActionExtraCulture = () => {
      for(const unit of units) {
        if(unit.villageAction) {
          if(unit.villageAction.culture) {
            imbueChange(unit.title, ["villageAction"], "culture", unit.villageAction.culture + 1);
          }
          else {
            imbueChange(unit.title, ["villageAction"], "culture", 1);
          }
        }
      }
    };

    const paintsExtraCultureExchange = () => {
      for(const unit of units) {
        if(unit.cultureExchange) {
          imbueChange(unit.title, [], "cultureExchange", unit.cultureExchange + 1);
        }
        else {
          imbueChange(unit.title, [], "cultureExchange", 1);
        }
      }
    };

    const totemLeadershipCardOpenExtraCulture = () => {
      for(const unit of units) {
        if(unit.properties && unit.properties.leadership) {
          imbueChange(unit.title, ["openBonus"], "culture", unit.properties.leadership);
        }
      }
    };

    const totemExtraCultureValue = () => {
      for(const unit of units) {
        imbueChange(unit.title, [], "cultureValue", unit.cultureValue + 1);
      }
    };

    const bowExtraHunting = () => {
      for(const unit of units) {
        if(unit.attack && unit.attack > 0) {
          if(unit.hunting && unit.hunting > 0) {
            imbueChange(unit.title, [], "hunting", unit.hunting + unit.attack);
          }
          else {
            imbueChange(unit.title, [], "hunting", unit.attack);
          }
        }
      }
    };

    const bolasDefenseRemoval = () => {
      for(const unit of units) {
        if(unit.defense && unit.defense > 0) {
          imbueChange(unit.title, [], "defense", 0);
        }
      }
    };

    const microlitsDevelopmentsDiscount = () => {
      for(const development of ["tools", "new-lands", "rock-painting"]) {
        imbueChange(development, [], "foodCost", developmentCard(development).foodCost - 1);
      }
    };

    const handleExtraAttackAndHunting = () => {
      for(const unit of units) {
        imbueChange(unit.title, [], "attack", (unit.attack || 0) + 1);
        imbueChange(unit.title, [], "hunting", (unit.hunting || 0) + 1);
      }
    };

    const invent = game_.inventions[game_.state.turn - 1];
    switch(invent) {
      case "microlits":
        microlitsDevelopmentsDiscount();
        break;
      case "flint":
        imbueChange("inhabitant", [], "foodCost", 1);
        break;
      case "fishingHook":
        if(game_.state.phase === "living") {
          imbueChange("fish", [], "food", 2);
        }
        break;
      case "javelin":
        if(game_.state.phase === "living") {
          imbueChange("deer", [], "food", 5);
        }
        break;
      case "atlatl":
        if(game_.state.phase === "living") {
          imbueChange("aurochs", [], "food", 10);
        }
        break;
      case "needle":
        if(game_.state.phase === "living") {
          needleVillageActionExtraCulture();
        }
        break;
      case "paints":
        if(game_.state.phase === "living") {
          paintsVillageActionExtraCulture();
          paintsExtraCultureExchange();
        }
        break;
      case "basket":
        if(game_.state.phase === "living") {
          basketExtraFoodSteal();
          basketVillageActionExtraFood();
        }
        break;
      case "handle":
        if(game_.state.phase === "living") {
          handleExtraAttackAndHunting();
        }
        break;
      case "foodPit":
        if(game_.state.phase === "living") {
          foodPitVillageActionExtraFood();
        }
        break;
      case "totem":
        if(game_.state.phase === "living") {
          totemLeadershipCardOpenExtraCulture();
          totemExtraCultureValue();
        }
        break;
      case "bow":
        if(game_.state.phase === "living") {
          bowExtraHunting();
        }
        break;
      case "bolas":
        if(game_.state.phase === "living") {
          bolasDefenseRemoval();
        }
        break;
    }

    console.log("Invention changes", changes);

    inventionChanges.value = changes;
  }

  selection.value = emtySelection();
  gameLoaded.value = true;
});
socket.on("hand", (hand_: Card[]) => {
  console.log("Socket hand", hand_);
  hand.value = hand_;
  selection.value = emtySelection();
  handLoaded.value = true;
});
socket.on("chat", (data: { nickname: string, message: string }) => {
  console.log("Socket chat", data);
  events.value.push({
    actor: data.nickname,
    type: "chat",
    text: data.message
  });
});
socket.on("stat", (stats: any) => {
  console.log("Socket stat", stats);
  stat.value = stats;

  inventionChanges.value = {};
  gameFinished.value = true;
});
socket.on("done", () => {
  actionPerformed.value = false;
  console.log("Socket done");
});
socket.on("rejected", (err: string | { error: string, code: number }) => {
  actionPerformed.value = false;
  const error = err as { error: string, code: number };
  if(error.code) {
    let message = "";
    switch(error.code) {
      case 1:
        message = "Incorrect action type";
        break;
      case 2:
        message = "It's not your turn";
        break;
      case 3:
        message = "Forbidden";
        break;
      case 4:
        message = "Card not found";
        break;
      case 5:
        message = "Not enough leadership";
        break;
      case 6:
        message = "Hunt is empty";
        break;
      case 7:
        message = "Invalid hunt";
        break;
      case 8:
        message = "Some units can't perform hunt";
        break;
      case 9:
        message = "Not enough hunters";
        break;
      case 10:
        message = "Must play card before passing";
        break;
      case 11:
        message = "Not enough food";
        break;
      case 12:
        message = "Culture level is not enough";
        break;
      case 13:
        message = "Invalid upgrade";
        break;
      case 14:
        message = "Must choose migration card";
        break;
      case 15:
        message = "Raid is empty";
        break;
      case 16:
        message = "Units can't raid";
        break;
      case 17:
        message = "Invalid raid target";
        break;
      case 18:
        message = "Can't upgrade to the same card";
        break;
      case 19:
        message = "Must chose sociality cards";
        break;
      case 20:
        message = "Incorrect sociality cards number";
        break;
      default:
        message = "Unknown error";
    }

    alert(message);
  }
  else {
    alert(err);
  }
  console.log("Socket rejected", err);
});
socket.on("error", (err: string) => {
  actionPerformed.value = false;
  alert(err);
  console.log("Socket error", err);
});
