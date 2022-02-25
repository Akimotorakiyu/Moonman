import {
  IPlanet,
  ISpaceship,
  IIdentity,
  TTimestampAndIdCombineKey,
} from '@moonman/blueprint'
const planetRegistrationCenter = new Map<TTimestampAndIdCombineKey, IPlanet>()
const spaceshipRegistrationCenter = new Map<
  TTimestampAndIdCombineKey,
  ISpaceship
>()

export function getTimestampAndIdCombineKey(
  identity: IIdentity,
): TTimestampAndIdCombineKey {
  return `${identity.timestamp}-${identity.id}`
}

export function queryPlanet(identity: IIdentity) {
  const planet = planetRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )
  if (!planet) {
    throw 'unregistrator planet'
  }
  return planet
}

export function querySpaceship(identity: IIdentity) {
  const spaceship = spaceshipRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )

  if (!spaceship) {
    throw 'unregistrator spaceship'
  }
  return spaceship
}

export function registerPlanet(planet: IPlanet) {
  planetRegistrationCenter.set(
    getTimestampAndIdCombineKey(planet.blueprint.identity),
    planet,
  )
}

export function registerSpaceship(spaceship: ISpaceship) {
  spaceshipRegistrationCenter.set(
    getTimestampAndIdCombineKey(spaceship.blueprint.identity),
    spaceship,
  )
}
