export interface UnitProperties {
  leadership?: number
  sociality?: number
  extraCards?: number
  community?: number
  unity?: boolean
  migration?: number
  resourceBonus?: {
    fish?: number
    deer?: number
    aurochs?: number
    mammoth?: number
  },
  scent?: {
    fish?: number
    deer?: number
    aurochs?: number
    mammoth?: number
  },
  sneak?: number
  mentoring?: number
  cultureLevelIncrease?: number
  hideaway?: number
  reflection?: boolean
  pathfinding?: boolean
  valor?: number
  cultureResistance?: boolean
  cultureRaid?: boolean
}

export interface Unit {
  foodCost: number
  cultureLevel?: number
  attack?: number
  defense?: number
  cultureExchange?: number
  hunting?: number
  fishing?: number
  raidFoodSteal?: number
  properties?: UnitProperties
  villageAction?: {
    food?: number
    culture?: number
    sacrifice?: boolean
  }
  cultureValue: number
  unique?: boolean
  title: string
}
