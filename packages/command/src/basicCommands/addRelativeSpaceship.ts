import { IPlanet, ISpaceship, TDirection } from '@moonman/blueprint'
import { createSpaceshipByPlanet } from '@moonman/nebula'
import { addBrotherSpaceshipStep } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addRelative(
  main: ISpaceship,
  planet: IPlanet,
  direction: TDirection,
) {
  return defineCommand((next, tr) => {
    const spaceship = createSpaceshipByPlanet(planet)

    addBrotherSpaceshipStep(
      tr,
      main.blueprint.identity,
      spaceship.blueprint.identity,
      direction,
    )

    next()
    return true
  })
}
