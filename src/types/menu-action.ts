import { Card } from "./game";

export interface MenuAction {
  type: "done"| "hunt" | "raid" | "buy" | "upgrade" | "develop" | "pass" | "hint"
  source?: Card[]
  aim?: Card[]
  aimPlayer?: string
  hint?: string
}
