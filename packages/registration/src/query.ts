import { IIdentity } from '@moonman/blueprint'
import {
  planetRegistrationCenter,
  spaceshipRegistrationCenter,
} from './globalCenter'
import { getTimestampAndIdCombineKey } from './util'

export function queryPlanet(identity: IIdentity) {
  const planet = planetRegistrationCenter.get(
    getTimestampAndIdCombineKey(identity),
  )
  if (!planet) {
    console.log(planetRegistrationCenter, getTimestampAndIdCombineKey(identity))

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
