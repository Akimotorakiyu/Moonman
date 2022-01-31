import { IPlanet, ISpaceShip, ITransaction } from '../nebula/blueprint'
import { createSpaceShipByPlanet } from '../nebula/factory'
import {
  createAddChildSpaceShip,
  createPlanet,
  createPlanetBlueprint,
  createStep,
} from '../nebula/nebula'

function addChildSpaceShipStep(
  tr: ITransaction,
  main: IPlanet,
  spaceship: ISpaceShip,
) {
  const op = createAddChildSpaceShip(tr.id, spaceship.blueprint.id, 'forward')
  const step = createStep(main.blueprint.id, op)
  tr.steps.push(step)
}

export function createAndConnetSpaceshipByPlanet(
  tr: ITransaction,
  main: IPlanet,
  planet: IPlanet,
) {
  const spaceship = createSpaceShipByPlanet(planet)
  addChildSpaceShipStep(tr, main, spaceship)
}

export function createPlanetAndConnectPlant(tr: ITransaction, main: IPlanet) {
  const planetBlueprint = createPlanetBlueprint()
  const planet = createPlanet(planetBlueprint)
  createAndConnetSpaceshipByPlanet(tr, main, planet)
}
