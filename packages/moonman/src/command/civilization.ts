import {
  createPlanet,
  createPlanetBlueprint,
  createSpaceship,
  createSpaceshipBlueprint,
  createTransaction,
  dispatchTransation,
} from '@moonman/nebula'

export function createDocument() {
  const planetBlueprint = createPlanetBlueprint()
  const spaceshipBlueprint = createSpaceshipBlueprint(planetBlueprint.id)
  const planet = createPlanet(planetBlueprint)
  const spaceship = createSpaceship(spaceshipBlueprint, planet)

  const tr = createTransaction()

  addMarkForPlantOrSpaceship(tr, spaceship.planet, 'type', 'CContainer')

  dispatchTransation(tr)

  return spaceship
}
