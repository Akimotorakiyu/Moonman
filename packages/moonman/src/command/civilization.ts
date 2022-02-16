import { addMarkForPlantOrSpaceShip } from './addMarkForPlantOrSpaceShip'
import {
  createPlanet,
  createPlanetBlueprint,
  createSpaceShip,
  createSpaceShipBlueprint,
  createTransaction,
} from '@moonman/nebula'
import { dispatchTransation } from './dispatchTransation'

export function createDocument() {
  const planetBlueprint = createPlanetBlueprint()
  const spaceShipBlueprint = createSpaceShipBlueprint(planetBlueprint.id)
  const planet = createPlanet(planetBlueprint)
  const spaceShip = createSpaceShip(spaceShipBlueprint, planet)

  const tr = createTransaction()

  addMarkForPlantOrSpaceShip(tr, spaceShip.planet, 'type', 'CContainer')

  dispatchTransation(tr)

  return spaceShip
}
