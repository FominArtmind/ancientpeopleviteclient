import { ref } from "vue";

import { GeneralEvent } from "../types/events";
import { Card, VillageCard, Game, Action } from "../types/game";

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
export const game = ref<Game>({
  id: "id",
  version: "192",
  maxPlayers: 2,
  options: [
    {
      name: "version",
      value: "192"
    },
    {
      name: "victoryCulture",
      value: "50"
    }
  ],
  creator: "Arseniy",
  players: ["Arseniy", "Kuzma"],
  started: true,
  finished: false,
  state: {
    turn: 5,
    phase: "development",
    actor: 0,
    players: [
      {
        nick: "Arseniy",
        culture: 10,
        food: 1,
        village: [
          {
            card: { id: 0, type: "patrol" },
            rotated: false
          },
          {
            card: { id: 1, type: "hunter" },
            rotated: false
          },
          {
            card: { id: 2, type: "cannibal" },
            rotated: false
          }
        ],
        deckSize: 2,
        handSize: 1,
        awayCardsCount: 0,
        awayFood: 0,
        awayCulture: 0,
        awayResources: [
          {
            "id": 206,
            "type": "deer"
          }
        ],
        state: {
          playingCard: false,
          passed: true,
          leadership: [],
          unity: "",
          migrationChoose: [],
          pathfindingChoose: false,
          sociality: 0
        },
        timeTakenMs: 572023
      },
      {
        nick: "Kuzma",
        culture: 6,
        food: 3,
        village: [
          {
            card: { id: 10, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 11, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 12, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 13, type: "caveman" },
            rotated: false
          },
          {
            card: { id: 14, type: "chiropractor" },
            rotated: false
          }
        ],
        deckSize: 0,
        handSize: 3,
        awayCardsCount: 0,
        awayFood: 0,
        awayCulture: 0,
        awayResources: [
        ],
        state: {
          playingCard: false,
          passed: true,
          leadership: [],
          unity: "",
          migrationChoose: [],
          pathfindingChoose: false,
          sociality: 0
        },
        timeTakenMs: 424068
      }
    ],
    resourcesDeckSize: 12,
    openedResources: [
      {
        id: 200,
        type: "fish"
      },
      {
        id: 201,
        type: "fish"
      },
      {
        id: 202,
        type: "deer"
      },
      {
        id: 203,
        type: "deer"
      },
      {
        id: 204,
        type: "aurochs"
      },
      {
        id: 205,
        type: "mammoth"
      }
    ],
    developmentCards: [
      { id: 1000, type: "tools" },
      { id: 1001, type: "new-lands" },
      { id: 1002, type: "rock-painting" }     
    ],
    draftDeckSize: 75,
    draftCards: [
      { id: 100, type: 'mentor'},
      { id: 101, type: 'cannibal'},
      { id: 102, type: 'patrol'},
      { id: 103, type: 'chiropractor'},
      { id: 104, type: 'handyman'},
      { id: 105, type: 'bear-son'},
      { id: 106, type: 'chieftain'},
      { id: 107, type: 'watchdog'},
      { id: 108, type: 'engraver'},
      { id: 109, type: 'pathfinder'},
      { id: 110, type: 'warrior'},
      { id: 111, type: 'amazon'},
      { id: 112, type: 'ancient'},
      { id: 113, type: 'settler'},
      { id: 114, type: 'wet-nurse'},
      { id: 115, type: 'beater'},
      { id: 116, type: 'shaman'},
      { id: 117, type: 'hunter'}
    ],
    extraFood: 0
    // raidAwaiting?: Action
  },
  inventions: [
    "bolas", "paints", "foodPit", "flint", "fishingHook",
    "microlits", "dwelling", "bow", "handle", "basket",
    "needle", "javelin", "atlatl", "dog", "totem"
  ],
  startTime: 1694757349000,
  lastPlayerActionTime: 1694763459000
});

export const handLoaded = ref(false);
export const hand = ref<Card[]>([
  { id: 118, type: 'fire-keeper'},
  { id: 119, type: 'inhabitant'}
]);

export const events = ref<GeneralEvent[]>([]);
//[
//   {
//     type: "turn",
//     turn: 4,
//     phase: "living"
//   },
//   {
//     type: "card",
//     actor: "Arseniy",
//     unit: "leader"
//   },
//   {
//     type: "card",
//     actor: "Arseniy",
//     unit: "fisher"
//   },
//   {
//     type: "scent",
//     actor: "Arseniy",
//     resources: ["fish"],
//     resourceType: "fish"
//   },
//   {
//     type: "hunt",
//     actor: "Arseniy",
//     hunters: ["leader", "fisher"],
//     resource: "fish",
//     number: 1,
//     food: 6,
//     culture: 0 
//   },
//   {
//     type: "pass",
//     actor: "Arseniy"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "watchdog"
//   },
//   {
//     type: "extraCards",
//     actor: "Kuzma",
//     number: 1
//   },
//   {
//     type: "pass",
//     actor: "Kuzma"
//   },
//   {
//     type: "card",
//     actor: "Arseniy",
//     unit: "hunter"
//   },
//   {
//     type: "pass",
//     actor: "Arseniy"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "amazon"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "patrol"
//   },
//   {
//     type: "migration",
//     actor: "Kuzma",
//     resources: ["deer"]
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "caveman"
//   },
//   {
//     type: "community",
//     actor: "Kuzma",
//     unit: "caveman",
//     number: 2
//   },
//   {
//     type: "chat",
//     actor: "Kuzma",
//     text: "K-k-k-kaveman"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "caveman"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "caveman"
//   },
//   {
//     type: "hunt",
//     actor: "Kuzma",
//     hunters: ["amazon", "patrol", "caveman", "caveman", "caveman"],
//     resource: "mammoth",
//     number: 1,
//     food: 15,
//     culture: 0 
//   },
//   {
//     type: "chat",
//     actor: "Arseniy",
//     text: "Nice, gg wp"
//   },
//   {
//     type: "pass",
//     actor: "Kuzma"
//   },
//   {
//     type: "card",
//     actor: "Arseniy",
//     unit: "pathfinder"
//   },
//   {
//     type: "pathfindingChoice",
//     actor: "Arseniy",
//     resource: "deer",
//     from: "Kuzma"
//   },
//   {
//     type: "pass",
//     actor: "Arseniy"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "collector"
//   },
//   {
//     type: "pass",
//     actor: "Kuzma"
//   },
//   {
//     type: "card",
//     actor: "Arseniy",
//     unit: "warrior"
//   },
//   {
//     type: "hunt",
//     actor: "Arseniy",
//     hunters: ["hunter"],
//     resource: "deer",
//     number: 1,
//     food: 6,
//     culture: 0 
//   },
//   {
//     type: "raid",
//     actor: "Arseniy",
//     aim: "Kuzma",
//     chances: {
//       winRate: 38.7,
//       loseRate: 61.3,
//       testWins: 3879,
//       testLosses: 6121
//     },
//     raiders: [
//       { type: "pathfinder", impact: 1 },
//       { type: "warrior", impact: 3 }
//     ],
//     victims: [
//       { type: "watchdog", impact: 2 },
//       { type: "ancient", impact: 1 }
//     ],
//     success: true,
//     foodGain: 8,
//     foodLost: 8,
//     cultureGain: 3,
//     cultureLost: 0 
//   },
//   {
//     type: "pass",
//     actor: "Arseniy"
//   },
//   {
//     type: "card",
//     actor: "Kuzma",
//     unit: "ancient"
//   },
//   {
//     type: "pass",
//     actor: "Kuzma"
//   },
//   {
//     type: "turn",
//     turn: 4,
//     phase: "development"
//   },
//   {
//     type: "develop",
//     actor: "Arseniy",
//     card: "rock-painting",
//     unknownForPlayer: true
//   },
//   {
//     type: "upgrade",
//     actor: "Kuzma",
//     unit: "settler",
//     from: "caveman" 
//   },
//   {
//     type: "buy",
//     actor: "Arseniy",
//     unit: "chiropractor"
//   },
//   {
//     type: "upgrade",
//     actor: "Kuzma",
//     unit: "engraver",
//     from: "caveman" 
//   },
//   {
//     type: "pass",
//     actor: "Arseniy"
//   },
//   {
//     type: "pass",
//     actor: "Kuzma"
//   }
// ]);

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
socket.on("stat", (stat: any) => {
  console.log("Socket stat", stat);
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
      case 4:
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

// const opponent1 = ref<Player>({
//   nick: "Kuzma",
//   culture: 10,
//   food: 3,
//   village: [
//     { card: { id: 0, type: 'chiropractor' }, rotated: true },
//     { card: { id: 0, type: 'fire-keeper' } },
//     { card: { id: 0, type: 'leader' } },
//     { card: { id: 0, type: 'inhabitant' } },
//     { card: { id: 0, type: 'inhabitant' } },
//     { card: { id: 0, type: 'inhabitant' } }
//   ],
//   deckSize: 1,
//   handSize: 2,
//   awayCardsCount: 0,
//   awayResources: [],
//   state: {
//     playingCard: true,
//     passed: false,
//     leadership: [],
//     unity: "",
//     migrationChoose: [],
//     pathfindingChoose: false,
//     sociality: 0
//   },
//   timeTakenMs: 1000 * 425
// });
// const opponent2 = ref<Player>({
//   nick: "Sergey",
//   culture: 10,
//   food: 3,
//   village: [
//     { card: { id: 0, type: 'chiropractor' }, rotated: true },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'caveman' } },
//     { card: { id: 0, type: 'leader' } },
//     { card: { id: 0, type: 'inhabitant' } }
//   ],
//   deckSize: 0,
//   handSize: 0,
//   awayCardsCount: 0,
//   awayResources: [],
//   state: {
//     playingCard: true,
//     passed: false,
//     leadership: [],
//     unity: "",
//     migrationChoose: [],
//     pathfindingChoose: false,
//     sociality: 0
//   },
//   timeTakenMs: 1000 * 425
// });
// const opponent3 = ref<Player>({
//   nick: "Alex",
//   culture: 10,
//   food: 3,
//   village: [
//     { card: { id: 0, type: 'chiropractor' }, rotated: true },
//     { card: { id: 0, type: 'fire-keeper' } },
//     { card: { id: 0, type: 'leader' } },
//     { card: { id: 0, type: 'inhabitant' } }
//   ],
//   deckSize: 1,
//   handSize: 2,
//   awayCardsCount: 0,
//   awayResources: [],
//   state: {
//     playingCard: true,
//     passed: false,
//     leadership: [],
//     unity: "",
//     migrationChoose: [],
//     pathfindingChoose: false,
//     sociality: 0
//   },
//   timeTakenMs: 1000 * 425
// });
// const opponent4 = ref<Player>({
//   nick: "Alcho",
//   culture: 10,
//   food: 3,
//   village: [
//     { card: { id: 0, type: 'chiropractor' }, rotated: true },
//     { card: { id: 0, type: 'fire-keeper' } },
//     { card: { id: 0, type: 'leader' } },
//     { card: { id: 0, type: 'inhabitant' } }
//   ],
//   deckSize: 1,
//   handSize: 2,
//   awayCardsCount: 0,
//   awayResources: [],
//   state: {
//     playingCard: true,
//     passed: false,
//     leadership: [],
//     unity: "",
//     migrationChoose: [],
//     pathfindingChoose: false,
//     sociality: 0
//   },
//   timeTakenMs: 1000 * 425
// });

// const developmentCards = ref<Card[]>([
//   { id: 0, type: 'tools'},
//   { id: 0, type: 'new-lands'},
//   { id: 0, type: 'rock-painting'}
// ]);
// const draft = ref<Card[]>([
//   { id: 0, type: 'mentor'},
//   { id: 0, type: 'cannibal'},
//   { id: 0, type: 'patrol'},
//   { id: 0, type: 'chiropractor'},
//   { id: 0, type: 'handyman'},
//   { id: 0, type: 'bear-son'},
//   { id: 0, type: 'chieftain'},
//   { id: 0, type: 'watchdog'},
//   { id: 0, type: 'engraver'},
//   { id: 0, type: 'pathfinder'},
//   { id: 0, type: 'warrior'},
//   { id: 0, type: 'amazon'},
//   { id: 0, type: 'ancient'},
//   { id: 0, type: 'settler'},
//   { id: 0, type: 'wet-nurse'},
//   { id: 0, type: 'beater'},
//   { id: 0, type: 'shaman'},
//   { id: 0, type: 'hunter'}
// ]);
// const resources = ref<Card[]>([
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'deer'},
//   { id: 0, type: 'aurochs'},
//   { id: 0, type: 'mammoth'}
// ]);
// const resourcesDeckSize = ref(12);
// const playerResources = ref<PlayerResources[]>([
//   {
//     nick: "Kuzma",
//     resources: [
//       { id: 0, type: 'deer'},
//       { id: 0, type: 'deer'}
//     ]
//   },
//   {
//     nick: "Arseniy",
//     resources: [
//       { id: 0, type: 'aurochs'}
//     ]
//   },
// ]);

// const deckSize = ref(2);

// const village = ref<VillageCard[]>([
//   { card: { id: 0, type: 'chiropractor' }, rotated: true },
//   { card: { id: 0, type: 'fire-keeper' } },
//   { card: { id: 0, type: 'leader' } },
//   { card: { id: 0, type: 'inhabitant' } }
// ]);
// const food = ref(12);
// const culture = ref(7);
// const awayCardsCount = ref(0);
// const timeTakenMs = ref(1000 * 445);

// const resourceCards = ref<Card[]>([
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'deer'},
//   { id: 0, type: 'aurochs'},
//   { id: 0, type: 'mammoth'}
// ]);
// const resourceCards2 = ref<Card[]>([
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'deer'},
//   { id: 0, type: 'aurochs'},
//   { id: 0, type: 'mammoth'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'fish'},
//   { id: 0, type: 'deer'},
//   { id: 0, type: 'aurochs'},
//   { id: 0, type: 'mammoth'}
// ]);
// const unitCards = ref<Card[]>([
//   { id: 0, type: 'inhabitant'},
//   { id: 0, type: 'fire-keeper'},
//   { id: 0, type: 'leader'},
//   { id: 0, type: 'collector'},
//   { id: 0, type: 'fisher'},
//   { id: 0, type: 'agile'},
//   { id: 0, type: 'caveman'}
// ]);
// const unitCards2 = ref<Card[]>([
//   { id: 0, type: 'mentor'},
//   { id: 0, type: 'cannibal'},
//   { id: 0, type: 'patrol'},
//   { id: 0, type: 'chiropractor'},
//   { id: 0, type: 'handyman'},
//   { id: 0, type: 'bear-son'},
//   { id: 0, type: 'chieftain'}
// ]);
// const unitCards3 = ref<Card[]>([
//   { id: 0, type: 'watchdog'},
//   { id: 0, type: 'engraver'},
//   { id: 0, type: 'pathfinder'},
//   { id: 0, type: 'warrior'},
//   { id: 0, type: 'amazon'},
//   { id: 0, type: 'ancient'},
//   { id: 0, type: 'settler'},
//   { id: 0, type: 'wet-nurse'},
//   { id: 0, type: 'beater'},
//   { id: 0, type: 'shaman'},
//   { id: 0, type: 'hunter'}
// ]);
