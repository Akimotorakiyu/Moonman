import {
  ISpaceShip,
  IPlanet,
  ITransaction,
  TDirection,
  createSpaceShipByPlanet,
  createAddRelativeSpaceShip,
  createPlanet,
  createPlanetBlueprint,
  createStep,
} from '@moonman/core'

function addBrotherSpaceShipStep(
  tr: ITransaction,
  main: ISpaceShip,
  spaceship: ISpaceShip,
  direction: TDirection,
) {
  const op = createAddRelativeSpaceShip(
    tr.id,
    spaceship.blueprint.id,
    direction,
  )
  const step = createStep(main.blueprint.id, op)
  tr.steps.push(step)
}

export function createAndConnetBrotherSpaceshipBySpaceship(
  tr: ITransaction,
  main: ISpaceShip,
  planet: IPlanet,
  direction: TDirection,
) {
  const spaceship = createSpaceShipByPlanet(planet)
  addBrotherSpaceShipStep(tr, main, spaceship, direction)
  return spaceship
}

export function createAndAddRelativeSpaceShip(
  tr: ITransaction,
  main: ISpaceShip,
  direction: TDirection,
  content?: unknown,
) {
  const planetBlueprint = createPlanetBlueprint(content)
  const planet = createPlanet(planetBlueprint)
  const spaceship = createAndConnetBrotherSpaceshipBySpaceship(
    tr,
    main,
    planet,
    direction,
  )
  return spaceship
}
