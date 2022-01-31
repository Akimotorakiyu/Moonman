import { ISpaceShip, IPlanet } from './blueprint'
const planetRegistrationCenter = new Map<string, IPlanet>()
const spaceshipRegistrationCenter = new Map<string, ISpaceShip>()

export function queryPlanet(id: string) {
  return planetRegistrationCenter.get(id)
}

export function querySpaceship(id: string) {
  return spaceshipRegistrationCenter.get(id)
}

export function registPlanet(planet: IPlanet) {
  planetRegistrationCenter.set(planet.blueprint.id, planet)
}

export function registSpaceship(spaceship: ISpaceShip) {
  spaceshipRegistrationCenter.set(spaceship.blueprint.id, spaceship)
}
