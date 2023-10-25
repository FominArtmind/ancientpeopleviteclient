import { Game, Card } from "../types/game";
import { GeneralEvent } from "../types/events";
import { Statistics } from "../types/statistics";

export const GAME_STUB: Game = {
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
};

export const HAND_STUB: Card[] = [
  { id: 118, type: 'fire-keeper'},
  { id: 119, type: 'inhabitant'}
];

export const EVENTS_STUB: GeneralEvent[] = [
  {
    type: "turn",
    turn: 4,
    phase: "living"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "leader"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "fisher"
  },
  {
    type: "scent",
    actor: "Arseniy",
    resources: ["fish"],
    resourceType: "fish"
  },
  {
    type: "hunt",
    actor: "Arseniy",
    hunters: ["leader", "fisher"],
    resource: "fish",
    number: 1,
    food: 6,
    culture: 0 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "watchdog"
  },
  {
    type: "extraCards",
    actor: "Kuzma",
    number: 1
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "hunter"
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "amazon"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "patrol"
  },
  {
    type: "migration",
    actor: "Kuzma",
    resources: ["deer"]
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "community",
    actor: "Kuzma",
    unit: "caveman",
    number: 2
  },
  {
    type: "chat",
    actor: "Kuzma",
    text: "K-k-k-kaveman"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "caveman"
  },
  {
    type: "hunt",
    actor: "Kuzma",
    hunters: ["amazon", "patrol", "caveman", "caveman", "caveman"],
    resource: "mammoth",
    number: 1,
    food: 15,
    culture: 0 
  },
  {
    type: "chat",
    actor: "Arseniy",
    text: "Nice, gg wp"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "pathfinder"
  },
  {
    type: "pathfindingChoice",
    actor: "Arseniy",
    resource: "deer",
    from: "Kuzma"
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "collector"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "card",
    actor: "Arseniy",
    unit: "warrior"
  },
  {
    type: "hunt",
    actor: "Arseniy",
    hunters: ["hunter"],
    resource: "deer",
    number: 1,
    food: 6,
    culture: 0 
  },
  {
    type: "raid",
    actor: "Arseniy",
    aim: "Kuzma",
    chances: {
      winRate: 38.7,
      loseRate: 61.3,
      testWins: 3879,
      testLosses: 6121
    },
    raiders: [
      { type: "pathfinder", impact: 1 },
      { type: "warrior", impact: 3 }
    ],
    victims: [
      { type: "watchdog", impact: 2 },
      { type: "ancient", impact: 1 }
    ],
    success: true,
    foodGain: 8,
    foodLost: 8,
    cultureGain: 3,
    cultureLost: 0 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "card",
    actor: "Kuzma",
    unit: "ancient"
  },
  {
    type: "pass",
    actor: "Kuzma"
  },
  {
    type: "turn",
    turn: 4,
    phase: "development"
  },
  {
    type: "develop",
    actor: "Arseniy",
    card: "rock-painting",
    unknownForPlayer: true
  },
  {
    type: "upgrade",
    actor: "Kuzma",
    unit: "settler",
    from: "caveman" 
  },
  {
    type: "buy",
    actor: "Arseniy",
    unit: "chiropractor"
  },
  {
    type: "upgrade",
    actor: "Kuzma",
    unit: "engraver",
    from: "caveman" 
  },
  {
    type: "pass",
    actor: "Arseniy"
  },
  {
    type: "pass",
    actor: "Kuzma"
  }
];

export const STATISTICS_STUB: Statistics = {} as Statistics;
