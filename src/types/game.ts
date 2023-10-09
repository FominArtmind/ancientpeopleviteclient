export interface Card {
  id: number
  type: string
}

export interface VillageCard {
  card: Card
  rotated?: boolean
}

export interface Deck {
  deck: Card[]
  discard: Card[]
}

export interface PlayerState {
  playingCard: boolean
  passed?: boolean
  leadership: []
  unity: string
  migrationChoose: Card[]
  pathfindingChoose?: boolean
  sociality: number
}

export interface Option {
  name: string
  value: string
}

export interface Action {
  actor: string
  type: "card" | "hunt" | "raid" | "buy" | "upgrade" | "develop" | "pass" | "choosingPathfindingCard" | "returningSocialityCards"
  source: number[]
  aim: number[]
}

export interface Player {
  nick: string
  culture: number
  food: number
  village: VillageCard[]
  deckSize: number
  handSize: number
  awayCardsCount: number
  awayFood?: number
  awayCulture?: number
  awayResources: Card[]
  state: PlayerState
  timeTakenMs: number
}

export interface GameState {
  turn: number
  phase: "living" | "development"
  actor: number
  players: Player[]
  resourcesDeckSize: number
  openedResources: Card[]
  developmentCards: Card[]
  draftDeckSize: number
  draftCards: Card[]
  extraFood: number
  raidAwaiting?: Action
}

export interface Game {
  id: string
  version: string
  maxPlayers: number
  options: Option[]
  creator: string
  players: string[]
  started: boolean
  finished: boolean
  state: GameState
  inventions: string[]
  startTime: number
  lastPlayerActionTime: number
}

export interface PlayerResources {
  nick: string
  resources: Card[]
}

// DB private data
// export interface Player {
//   nick: string
//   culture: number
//   food: number
//   village: VillageCard[]
//   deck: Card[]
//   hand: Card[]
//   awayCards: Card[]
//   awayFood: number
//   awayCulture: number
//   awayResources: Card[]
//   state: PlayerState
//   timeTakenMs: number
// }

// export interface GameState {
//   turn: number
//   phase: string
//   actor: number
//   players: Player[]
//   resourcesDeck: Deck
//   openedResources: Card[]
//   developmentCards: Card[]
//   draftDeck: Deck
//   draftCards: Card[]
//   removedCards: Card[]
//   extraFood: number
//   raidAwaiting?: Action
// }

// export interface Game {
//   id: string
//   version: string
//   maxPlayers: number
//   options: Option[]
//   creator: string
//   players: string[]
//   started: boolean
//   finished: boolean
//   startState: GameState
//   state: GameState
//   actions: Action[]
//   inventions: string[]
//   startTime: number
//   lastPlayerActionTime: number
//   statistics: Statistics
// }
