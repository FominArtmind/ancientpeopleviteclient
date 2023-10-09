export interface StatType {
  type: string
  count: number
}

export interface StatActivity {
  count: number
  food: number
  culture: number
}

export interface StatPlayer {
  nick: string
  result: number
  timeTakenMs: number
  deck: StatType[]
  deckCost: number
  play: StatActivity
  hunt: StatActivity
  raid: StatActivity
  raided: StatActivity
  extraGain: StatActivity
  development: StatActivity
  foodGained: number
  foodLost: number
  cultureGained: number
  cultureLost: number
}

export interface StatResource {
  type: string
  opened: number
  hunted: number
  food: number
  culture: number
}

export interface StatUnit {
  type: string
  drafted: number
  taken: number
  removed: number
  played: number
  hunted: number
  raided: number
  rotated: number
  food: number
  culture: number
}

export interface Statistics {
  turns: number
  timeTakenMs: number
  play: StatActivity
  hunt: StatActivity
  raid: StatActivity
  raided: StatActivity
  extraGain: StatActivity
  foodGained: number
  foodLost: number
  cultureGained: number
  cultureLost: number
  buys: number
  upgrades: number
  developments: number
  putAsideCards: StatType[]
  draftCards: StatType[]
  developmentCards: StatType[]
  players: StatPlayer[]
  resources: StatResource[]
  units: StatUnit[]
}
