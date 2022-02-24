import {
  ISpaceshipBlueprint,
  IPlanetBlueprint,
  ISpaceship,
  IPlanet,
  IIdentity,
} from '@moonman/blueprint'
import { getIdentity } from '../util'
import {
  registerPlanet,
  registerSpaceship,
} from '../registrationCenter/registrationCenter'

export function createSpaceshipBlueprint(
  planetId: IIdentity,
  identity: IIdentity = getIdentity(),
): ISpaceshipBlueprint {
  return {
    type: 'spaceshipBlueprint',
    identity,
    operations: [],
    planetId,
  }
}

export function createPlanetBlueprint(
  identity: IIdentity = getIdentity(),
): IPlanetBlueprint {
  return {
    type: 'planetBlueprint',
    identity,
    operations: [],
  }
}

export function createSpaceship(
  blueprint: ISpaceshipBlueprint,
  planet: IPlanet,
): ISpaceship {
  const spaceship: ISpaceship = {
    type: 'spaceship',
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

export function createSpaceshipByPlanet(planet: IPlanet): ISpaceship {
  const spaceshipBlueprint = createSpaceshipBlueprint(planet.blueprint.identity)
  return createSpaceship(spaceshipBlueprint, planet)
}
