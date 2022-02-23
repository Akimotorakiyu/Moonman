import { IPlanet, ISpaceShip } from '@moonman/blueprint'
import { createSpaceShip, createSpaceShipBlueprint } from './nebula'

export function createSpaceShipByPlanet(planet: IPlanet): ISpaceShip {
  const spaceShipBlueprint = createSpaceShipBlueprint(planet.blueprint.identity)
  return createSpaceShip(spaceShipBlueprint, planet)
}
