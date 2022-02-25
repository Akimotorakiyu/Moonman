import { IPlanet, ISpaceship } from '@moonman/blueprint'
import { getIdentity } from '../util'
import { createPlanetBlueprint, createSpaceshipBlueprint } from './blueprint'
import { createSpaceship, createPlanetByBlueprint } from './nebula'

export function createSpaceshipByPlanet(planet: IPlanet): ISpaceship {
  const spaceshipBlueprint = createSpaceshipBlueprint(
    planet.blueprint.identity,
    getIdentity(),
  )
  return createSpaceship(spaceshipBlueprint)
}

export function createPlanet(): IPlanet {
  const planetBlueprint = createPlanetBlueprint(getIdentity())
  const planet = createPlanetByBlueprint(planetBlueprint)

  return planet
}
