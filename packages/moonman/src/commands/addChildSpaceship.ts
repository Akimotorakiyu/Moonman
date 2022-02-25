import { ISpaceship, IPlanet, TDirection } from '@moonman/blueprint'
import { createSpaceshipByPlanet } from '@moonman/nebula'
import { addChildSpaceshipStep, addMarkForPlant } from '@moonman/transform'

import { defineCommand } from '../command'

export const addChild = defineCommand(
  (main: ISpaceship, planet: IPlanet, direction: TDirection) => (next, tr) => {
    const spaceship = createSpaceshipByPlanet(planet)

    addChildSpaceshipStep(
      tr,
      main.blueprint.identity,
      spaceship.blueprint.identity,
      direction,
    )

    addMarkForPlant(tr, planet, 'type', 'pargraph')

    next()
    return true
  },
)
