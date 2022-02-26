import { IPlanet, ISpaceship, TDirection } from '@moonman/blueprint'
import { createSpaceshipByPlanet } from '@moonman/nebula'
import { addBrotherSpaceshipStep, addMarkForPlant } from '@moonman/transform'
import { defineCommand } from '@moonman/transform'

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

    addMarkForPlant(tr, planet, 'type', 'pargraph')

    next()
    return true
  })
}
