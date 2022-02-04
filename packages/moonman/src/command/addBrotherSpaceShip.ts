import { ISpaceShip, IPlanet, ITransaction } from '../nebula/blueprint'
import { createSpaceShipByPlanet } from '../nebula/factory'
import {
  createAddRelativeSpaceShip,
  createPlanet,
  createPlanetBlueprint,
  createStep,
} from '../nebula/nebula'

function addBrotherSpaceShipStep(
  tr: ITransaction,
  main: ISpaceShip,
  spaceship: ISpaceShip,
) {
  const op = createAddRelativeSpaceShip(
    tr.id,
    spaceship.blueprint.id,
    'forward',
  )
  const step = createStep(main.blueprint.id, op)
  tr.steps.push(step)
}

export function createAndConnetBrotherSpaceshipBySpaceship(
  tr: ITransaction,
  main: ISpaceShip,
  planet: IPlanet,
) {
  const spaceship = createSpaceShipByPlanet(planet)
  addBrotherSpaceShipStep(tr, main, spaceship)
  return spaceship
}

export function createAndAddRelativeSpaceShip(
  tr: ITransaction,
  main: ISpaceShip,
  content?: unknown,
) {
  const planetBlueprint = createPlanetBlueprint(content)
  const planet = createPlanet(planetBlueprint)
  const spaceship = createAndConnetBrotherSpaceshipBySpaceship(tr, main, planet)
  return spaceship
}
