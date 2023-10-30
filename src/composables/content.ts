import { Resource } from "../types/resource";
import { Unit } from "../types/unit";
import { Development } from "../types/development";
import { clone } from "../utils/clone";

const _cards: { [type: string]: any } = {};
function loadCards(type: string) {
  if(!(_cards as any)[type]) {
    let data = {};
    switch(type) {
      case "resources":
        data = import.meta.glob("../assets/gamedata/resources/cards/*.json", { eager: true });
        break;
      case "units":
        data = import.meta.glob("../assets/gamedata/units/cards/*.json", { eager: true });
        break;
      case "actions":
        data = import.meta.glob("../assets/gamedata/actions/cards/*.json", { eager: true });
        break;
    } 
    const dataArray = [];
    for(const [key, value] of Object.entries(data)) {
      dataArray.push({ ...clone(value), title: key.split("/").pop()?.split(".")[0] });
    }

    _cards[type] = dataArray;
  }

  return (_cards as any)[type];
}

export function resourceCards(): Resource[] {
  return loadCards("resources");
}

export function unitCards(): Unit[] {
  return loadCards("units");
}

export function developmentCards(): Development[] {
  return loadCards("actions");
}

function cardComparator(contentType: any, type: string) {
  return contentType.title.toLowerCase().replaceAll(" ", "-") === type;
}

export function resourceCard(type: string) {
  return (resourceCards()).find(value => cardComparator(value, type)) as Resource;
}

export function unitCard(type: string) {
  return (unitCards()).find(value => cardComparator(value, type)) as Unit;
}

export function developmentCard(type: string) {
  return (developmentCards()).find(value => cardComparator(value, type)) as Development;
}
