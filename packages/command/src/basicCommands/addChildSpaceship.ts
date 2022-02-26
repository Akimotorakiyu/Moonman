import { IPlanet, TDirection } from '@moonman/blueprint'
import { createSpaceshipByPlanet } from '@moonman/nebula'
import { addChildSpaceshipStep } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addChildSpaceship(
  main: IPlanet,
  planet: IPlanet,
  direction: TDirection,
) {
  return defineCommand((next, tr) => {
    const spaceship = createSpaceshipByPlanet(planet)

    addChildSpaceshipStep(
      tr,
      main.blueprint.identity,
      spaceship.blueprint.identity,
      direction,
    )

    next()
    return true
  })
}
