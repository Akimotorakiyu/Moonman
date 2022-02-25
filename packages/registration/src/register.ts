import { IPlanet, ISpaceship } from '@moonman/blueprint'
import {
  planetRegistrationCenter,
  spaceshipRegistrationCenter,
} from './globalCenter'
import { getTimestampAndIdCombineKey } from './util'

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
