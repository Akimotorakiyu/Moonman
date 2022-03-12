import {
  IPlanet,
  IPlanetBlueprint,
  ISpaceship,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'

import {
  planetBlueprintRegistrationCenter,
  planetRegistrationCenter,
  spaceshipBlueprintRegistrationCenter,
  spaceshipRegistrationCenter,
} from './globalCenter'
import { getTimestampAndIdCombineKey } from './util'

export function registerPlanetBlueprint(planetBlueprint: IPlanetBlueprint) {
  console.log('regiester planetBlueprint', planetBlueprint)
  planetBlueprintRegistrationCenter.set(
    getTimestampAndIdCombineKey(planetBlueprint.identity),
    planetBlueprint,
  )
}

export function registerSpaceshipBlueprint(
  spaceshipBlueprint: ISpaceshipBlueprint,
) {
  console.log('regiester spaceshipBlueprint', spaceshipBlueprint)
  spaceshipBlueprintRegistrationCenter.set(
    getTimestampAndIdCombineKey(spaceshipBlueprint.identity),
    spaceshipBlueprint,
  )
}

export function registerPlanet(planet: IPlanet) {
  console.log('regiester planetBlueprint', planet)
  planetRegistrationCenter.set(
    getTimestampAndIdCombineKey(planet.blueprint.identity),
    planet,
  )
}

export function registerSpaceship(spaceship: ISpaceship) {
  console.log('regiester spaceshipBlueprint', spaceship)
  spaceshipRegistrationCenter.set(
    getTimestampAndIdCombineKey(spaceship.blueprint.identity),
    spaceship,
  )
}
