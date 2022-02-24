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
) {
  const planetBlueprint = createPlanetBlueprint()
  const planet = createPlanet(planetBlueprint)
  const spaceship = createAndConnetBrotherSpaceshipBySpaceship(
    tr,
    main,
    planet,
    direction,
  )
  return spaceship
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

export function createPlanetAndConnectPlant(tr: ITransaction, main: IPlanet) {
  const planetBlueprint = createPlanetBlueprint()
  const planet = createPlanet(planetBlueprint)
  const spaceship = createAndConnetSpaceshipByPlanet(tr, main, planet)

  return spaceship
}
