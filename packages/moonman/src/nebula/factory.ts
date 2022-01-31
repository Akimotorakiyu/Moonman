import { IPlanet, ISpaceShip } from './blueprint'
import { createSpaceShip, createSpaceShipBlueprint } from './nebula'

export function createSpaceShipByPlanet(planet: IPlanet): ISpaceShip {
  const spaceShipBlueprint = createSpaceShipBlueprint(planet.blueprint.id)
  return createSpaceShip(spaceShipBlueprint, planet)
}
