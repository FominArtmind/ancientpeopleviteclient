export interface TimePenaltyEvent {
  type: "timePenalty"
  actor: string
  culture: number
}

export interface PutAsideResourcesEvent {
  type: "putAsideResources"
  resources: string[]
}

export interface TurnEvent {
  type: "turn"
  turn: number
  phase: "living" | "development"
}

export interface ExtraFoodEvent {
  type: "extraFood"
  maxCulture: number
  food: number // deprecated
  discard: string[] 
}

export interface DevelopEvent {
  type: "develop"
  actor: string
  card: string
  unknownForPlayer: boolean 
}

export interface EndEvent {
  type: "end"
  winner: string
  result: {[nick: string]: number}
}

export interface HuntEvent {
  type: "hunt"
  actor: string
  hunters: string[]
  resource: string
  number: number
  food: number
  culture: number 
}

export interface RaidEvent {
  type: "raid"
  actor: string
  aim: string
  chances: {
    winRate: number
    loseRate: number
    testWins: number
    testLosses: number
  }
  raiders: {
    type: string
    impact: number
  }[]
  victims: {
    type: string
    impact: number
  }[]
  success: boolean
  foodGain: number
  foodLost: number
  cultureGain: number
  cultureLost: number 
}

export interface BuyEvent {
  type: "buy"
  actor: string
  unit: string
}

export interface UpgradeEvent {
  type: "upgrade"
  actor: string
  unit: string
  from: string 
}

export interface DevelopEvent {
  type: "develop"
  actor: string
  card: string
}

export interface PathfindingChoiceEvent {
  type: "pathfindingChoice"
  actor: string
  resource: string
  from: string
}

// deprecated ?
export interface MigrationChoiceEvent {
  type: "migrationChoice"
  actor: string
  resource: string
  unknownForPlayer: boolean
}

export interface CardEvent {
  type: "card"
  actor: string
  unit: string
}

export interface PassEvent {
  type: "pass"
  actor: string
}

export interface ExtraCardsEvent {
  type: "extraCards"
  actor: string
  number: number
}

export interface ScentEvent {
  type: "scent"
  actor: string
  resources: string[]
  resourceType: string
}

export interface MigrationEvent {
  type: "migration"
  actor: string
  resources: string[]
}

export interface CommunityEvent {
  type: "community"
  actor: string
  unit: string
  number: number
}

// TO DO
export interface ChatEvent {
  type: "chat"
  actor: string
  text: string
}

export interface GeneralEvent {
  type: string
  actor?: string
  aim?: string
  card?: string
  unit?: string
  from?: string 
  food?: number
  culture?: number
  maxCulture?: number
  hunters?: string[]
  resource?: string
  number?: number
  resources?: string[]
  resourceType?: string
  discard?: string[]
  chances?: {
    winRate: number
    loseRate: number
    testWins: number
    testLosses: number
  }
  raiders?: {
    type: string
    impact: number
  }[]
  victims?: {
    type: string
    impact: number
  }[]
  success?: boolean
  foodGain?: number
  foodLost?: number
  cultureGain?: number
  cultureLost?: number 
  text?: string
  turn?: number
  phase?: "living" | "development"
  winner?: string
  result?: {[nick: string]: number}
  unknownForPlayer?: boolean
}

// export interface ConnectEvent {
//   // empty
// }

// export interface DisconnectEvent {
//   // empty
// }

// export interface DoneEvent {
//   // empty
// }

// export interface ErrorEvent {
//   // string
// }

// export interface RejectedEvent {
//   // string
// }

// export interface GameEvent {
//   // Game
// }

// export interface HandEvent {
//   // Hand
// }

// export interface StatEvent {
//   // Statistics
// }

// export interface DoneEvent {
//   // empty
// }
