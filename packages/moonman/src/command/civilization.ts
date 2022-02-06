import { addMarkForPlantOrSpaceShip } from './addMarkForPlantOrSpaceShip'
import {
  createPlanet,
  createPlanetBlueprint,
  createSpaceShip,
  createSpaceShipBlueprint,
  createTransaction,
  messageCenter,
} from '@moonman/core'

export function createDocument() {
  const planetBlueprint = createPlanetBlueprint()
  const spaceShipBlueprint = createSpaceShipBlueprint(planetBlueprint.id)
  const planet = createPlanet(planetBlueprint)
  const spaceShip = createSpaceShip(spaceShipBlueprint, planet)

  const tr = createTransaction()

  addMarkForPlantOrSpaceShip(tr, spaceShip.planet, 'type', 'CContainer')

  tr.steps.forEach((s) => {
    messageCenter.dispatch(s.aimId, s.operationTransform, tr)
  })

  return spaceShip
}
