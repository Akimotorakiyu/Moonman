import {
  IPlanet,
  ISpaceShip,
  IIdentity,
  TTimestampAndIdCombineKey,
} from '@moonman/blueprint'
const planetRegistrationCenter = new Map<TTimestampAndIdCombineKey, IPlanet>()
const spaceshipRegistrationCenter = new Map<
  TTimestampAndIdCombineKey,
  ISpaceShip
>()

export function getTimestampAndIdCombineKey(
  identity: IIdentity,
): TTimestampAndIdCombineKey {
  return `${identity.timestamp}-${identity.id}`
}

export function queryPlanet(identity: IIdentity) {
  return planetRegistrationCenter.get(getTimestampAndIdCombineKey(identity))
}

export function querySpaceship(identity: IIdentity) {
  return spaceshipRegistrationCenter.get(getTimestampAndIdCombineKey(identity))
}

export function registerPlanet(planet: IPlanet) {
  planetRegistrationCenter.set(
    getTimestampAndIdCombineKey(planet.blueprint.identity),
    planet,
  )
}

export function registerSpaceship(spaceship: ISpaceShip) {
  spaceshipRegistrationCenter.set(
    getTimestampAndIdCombineKey(spaceship.blueprint.identity),
    spaceship,
  )
}
