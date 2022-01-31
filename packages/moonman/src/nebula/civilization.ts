import {
  createPlanet,
  createPlanetBlueprint,
  createSpaceShip,
  createSpaceShipBlueprint,
} from './nebula'

export function createDocument() {
  const planetBlueprint = createPlanetBlueprint()
  const spaceShipBlueprint = createSpaceShipBlueprint(planetBlueprint.id)
  const planet = createPlanet(planetBlueprint)
  const spaceShip = createSpaceShip(spaceShipBlueprint, planet)

  return spaceShip
}
