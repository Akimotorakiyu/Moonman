import {
  ISpaceshipBlueprint,
  IPlanetBlueprint,
  ISpaceship,
  IPlanet,
} from '@moonman/blueprint'
import {
  queryPlanet,
  registerPlanet,
  registerSpaceship,
} from '@moonman/registration'

export function createSpaceship(blueprint: ISpaceshipBlueprint): ISpaceship {
  const planet: IPlanet = queryPlanet(blueprint.identity)

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

export function createPlanetByBlueprint(blueprint: IPlanetBlueprint): IPlanet {
  const planet: IPlanet = {
    type: 'planet',
    blueprint,
    children: [],
    attributes: {},
  }

  registerPlanet(planet)

  return planet
}
