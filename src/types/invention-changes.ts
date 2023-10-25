import { Unit } from "./unit";
import { Resource } from "./resource";
import { Development } from "./development";

export interface InventionChanges {
  [type: string]: Unit | Resource | Development | {}
}
