import {
  ISpaceShipBlueprint,
  IPlanetBlueprint,
  ISpaceShip,
  IPlanet,
  IIdentity,
} from '@moonman/blueprint'
import { getIdentity } from '../util'
import {
  registerPlanet,
  registerSpaceship,
} from '../registrationCenter/registrationCenter'

export function createSpaceShipBlueprint(
  planetId: IIdentity,
  identity: IIdentity = getIdentity(),
): ISpaceShipBlueprint {
  return {
    type: 'spaceShipBlueprint',
    identity,
    operationTransform: [],
    planetId,
  }
}

export function createPlanetBlueprint(
  identity: IIdentity = getIdentity(),
): IPlanetBlueprint {
  return {
    type: 'planetBlueprint',
    identity,
    operationTransform: [],
  }
}

export function createSpaceShip(
  blueprint: ISpaceShipBlueprint,
  planet: IPlanet,
): ISpaceShip {
  const spaceship: ISpaceShip = {
    type: 'spaceShip',
    blueprint,
    slots: {
      forward: [],
      backward: [],
    },
    planet,
    attributes: {},
  }

  registerSpaceship(spaceship)

  return spaceship
}

export function createPlanet(blueprint: IPlanetBlueprint): IPlanet {
  const planet: IPlanet = {
    type: 'planet',
    blueprint,
    children: [],
    attributes: {},
  }

  registerPlanet(planet)

  return planet
}

export function createSpaceShipByPlanet(planet: IPlanet): ISpaceShip {
  const spaceShipBlueprint = createSpaceShipBlueprint(planet.blueprint.identity)
  return createSpaceShip(spaceShipBlueprint, planet)
}
