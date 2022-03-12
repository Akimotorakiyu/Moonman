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
  tryQueryPlanet,
  tryQuerySpaceship,
} from '@moonman/registration'

export function createPlanetByBlueprint(blueprint: IPlanetBlueprint): IPlanet {
  const _ = tryQueryPlanet(blueprint.identity)
  if (_) {
    return _
  }

  const planet: IPlanet = {
    type: 'planet',
    blueprint,
    children: [],
    attributes: {},
  }

  registerPlanet(planet)

  return planet
}

export function createSpaceshipByBlueprint(
  blueprint: ISpaceshipBlueprint,
): ISpaceship {
  const _ = tryQuerySpaceship(blueprint.identity)
  if (_) {
    return _
  }

  const spaceship: ISpaceship = {
    type: 'spaceship',
    blueprint,
    slots: {
      forward: [],
      backward: [],
    },
    attributes: {},
  }

  registerSpaceship(spaceship)

  return spaceship
}
