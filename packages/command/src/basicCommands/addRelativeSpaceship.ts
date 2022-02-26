import { IPlanet, ISpaceship, TDirection } from '@moonman/blueprint'
import { createSpaceshipByPlanet } from '@moonman/nebula'
import { addBrotherSpaceshipStep } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addRelativeSpaceship(
  relativeSpaceship: ISpaceship,
  planet: IPlanet,
  direction: TDirection,
) {
  return defineCommand((next, tr) => {
    const spaceship = createSpaceshipByPlanet(planet)

    addBrotherSpaceshipStep(
      tr,
      relativeSpaceship.blueprint.identity,
      spaceship.blueprint.identity,
      direction,
    )

    next()
    return true
  })
}
