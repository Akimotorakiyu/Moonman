import {
  ISpaceship,
  IPlanet,
  ITransaction,
  TDirection,
  createSpaceshipByPlanet,
  createAddRelativeSpaceship,
  createPlanet,
  createPlanetBlueprint,
  createStep,
} from '@moonman/nebula'

function addBrotherSpaceshipStep(
  tr: ITransaction,
  main: ISpaceship,
  spaceship: ISpaceship,
  direction: TDirection,
) {
  const op = createAddRelativeSpaceship(
    tr.id,
    spaceship.blueprint.id,
    direction,
  )
  const step = createStep(main.blueprint.id, op)
  tr.steps.push(step)
}

export function createAndConnetBrotherSpaceshipBySpaceship(
  tr: ITransaction,
  main: ISpaceship,
  planet: IPlanet,
  direction: TDirection,
) {
  const spaceship = createSpaceshipByPlanet(planet)
  addBrotherSpaceshipStep(tr, main, spaceship, direction)
  return spaceship
}

export function createAndAddRelativeSpaceship(
  tr: ITransaction,
  main: ISpaceship,
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
