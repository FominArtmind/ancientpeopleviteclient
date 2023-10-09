import { Resource } from "../types/resource";
import { Unit } from "../types/unit";
import { Development } from "../types/development";

const _cards = {};
async function loadCards(type: string) {
  if(!(_cards as any)[type]) {
    const { data } = await useAsyncData(type, () => queryContent("gamedata", type, "cards").find());
    (_cards as any)[type] = (data as any)._rawValue;
  }

  return (_cards as any)[type];
}

export async function resourceCards(): Promise<Resource[]> {
  return await loadCards("resources");
}

export async function unitCards(): Promise<Unit[]> {
  return await loadCards("units");
}

export async function developmentCards(): Promise<Development[]> {
  return await loadCards("actions");
}

function cardComparator(contentType: any, type: string) {
  return contentType.title.toLowerCase().replaceAll(" ", "-") === type;
}

export async function resourceCard(type: string) {
  return (await resourceCards()).find(value => cardComparator(value, type)) as Resource;
}

export async function unitCard(type: string) {
  return (await unitCards()).find(value => cardComparator(value, type)) as Unit;
}

export async function developmentCard(type: string) {
  return (await developmentCards()).find(value => cardComparator(value, type)) as Development;
}
