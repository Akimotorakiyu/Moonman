import {
  IIdentity,
  IPlanet,
  IPlanetBlueprint,
  ISpaceship,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'
import {
  planetBlueprintRegistrationCenter,
  spaceshipBlueprintRegistrationCenter,
  spaceshipRegistrationCenter,
  planetRegistrationCenter,
} from './globalCenter'
import { getTimestampAndIdCombineKey } from './util'

export function queryPlanetBlueprint(identity: IIdentity): IPlanetBlueprint {
  const planet = planetBlueprintRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )
  if (!planet) {
    console.log(
      'queryPlanetBlueprint',
      planetBlueprintRegistrationCenter,
      getTimestampAndIdCombineKey(identity),
    )

    throw 'unregistrator planet blueprint'
  }
  return planet
}

export function querySpaceshipBlueprint(
  identity: IIdentity,
): ISpaceshipBlueprint {
  const spaceship = spaceshipBlueprintRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )

  if (!spaceship) {
    console.log(
      'querySpaceshipBlueprint',
      planetBlueprintRegistrationCenter,
      getTimestampAndIdCombineKey(identity),
    )
    throw 'unregistrator spaceship blueprint'
  }
  return spaceship
}

export function tryQueryPlanet(identity: IIdentity) {
  const planet = planetRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )

  return planet
}

export function queryPlanet(identity: IIdentity): IPlanet {
  const planet = planetRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )
  if (!planet) {
    console.log(
      'queryPlanet',
      planetBlueprintRegistrationCenter,
      getTimestampAndIdCombineKey(identity),
    )

    throw 'unregistrator planet'
  }
  return planet
}

export function tryQuerySpaceship(identity: IIdentity) {
  const spaceship = spaceshipRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )

  return spaceship
}

export function querySpaceship(identity: IIdentity): ISpaceship {
  const spaceship = spaceshipRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )

  if (!spaceship) {
    console.log(
      'querySpaceship',
      planetBlueprintRegistrationCenter,
      getTimestampAndIdCombineKey(identity),
    )

    throw `unregistrator spaceship ${getTimestampAndIdCombineKey(identity)}`
  }
  return spaceship
}
