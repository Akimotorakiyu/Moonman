import { IPlanet, ISpaceship } from '@moonman/blueprint'
import {
  planetRegistrationCenter,
  spaceshipRegistrationCenter,
} from './globalCenter'
import { getTimestampAndIdCombineKey } from './util'

export function registerPlanet(planet: IPlanet) {
  console.log('regiester planet', planet)
  planetRegistrationCenter.set(
    getTimestampAndIdCombineKey(planet.blueprint.identity),
    planet,
  )
}

export function registerSpaceship(spaceship: ISpaceship) {
  console.log('regiester spaceship', spaceship)
  spaceshipRegistrationCenter.set(
    getTimestampAndIdCombineKey(spaceship.blueprint.identity),
    spaceship,
  )
}
