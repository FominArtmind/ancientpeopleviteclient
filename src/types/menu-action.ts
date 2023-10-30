import { Card } from "./game";

export interface RaidChances {
  winRate: number
  loseRate: number
  winCultureGainArray: { culture: number, chance: number }[] 
  loseCultureGainArray: { culture: number, chance: number }[]
  color: string
  emotion: string
}

export interface MenuAction {
  type: "done"| "hunt" | "raid" | "buy" | "upgrade" | "develop" | "pass" | "hint"
  source?: Card[]
  aim?: Card[]
  aimPlayer?: string
  raidChances?: RaidChances
  hint?: string
}
