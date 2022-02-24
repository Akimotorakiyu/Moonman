import {
  ISpaceship,
  IPlanet,
  ITransaction,
  createSpaceshipByPlanet,
  createPlanet,
  createPlanetBlueprint,
  createStep,
  createAddChildSpaceship,
} from '@moonman/nebula'

function addChildSpaceshipStep(
  tr: ITransaction,
  main: IPlanet,
  spaceship: ISpaceship,
) {
  const op = createAddChildSpaceship(tr.id, spaceship.blueprint.id, 'forward')
  const step = createStep(main.blueprint.id, op)
  tr.steps.push(step)
}

export function createAndConnetSpaceshipByPlanet(
  tr: ITransaction,
  main: IPlanet,
  planet: IPlanet,
) {
  const spaceship = createSpaceshipByPlanet(planet)
  addChildSpaceshipStep(tr, main, spaceship)

  return spaceship
}

export function createPlanetAndConnectPlant(
  tr: ITransaction,
  main: IPlanet,
  content?: unknown,
) {
  const planetBlueprint = createPlanetBlueprint(content)
  const planet = createPlanet(planetBlueprint)
  const spaceship = createAndConnetSpaceshipByPlanet(tr, main, planet)

  return spaceship
}
