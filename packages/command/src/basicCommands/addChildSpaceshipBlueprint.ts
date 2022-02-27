import {
  IPlanetBlueprint,
  ISpaceshipBlueprint,
  TDirection,
} from '@moonman/blueprint'
import { addChildSpaceshipBlueprintStep } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addChildSpaceshipBlueprint(
  parentPlanetBlueprint: IPlanetBlueprint,
  childSpaceshipBlueprint: ISpaceshipBlueprint,
  direction: TDirection,
) {
  return defineCommand((next, tr) => {
    addChildSpaceshipBlueprintStep(
      tr,
      parentPlanetBlueprint,
      childSpaceshipBlueprint,
      direction,
    )

    next()
    return true
  })
}
