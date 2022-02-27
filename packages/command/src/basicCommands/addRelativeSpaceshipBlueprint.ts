import { ISpaceshipBlueprint, TDirection } from '@moonman/blueprint'
import { addRelativeSpaceshipBlueprintStep } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addRelativeSpaceshipBlueprint(
  mainSpaceshipBlueprint: ISpaceshipBlueprint,
  relativeSpaceshipBlueprint: ISpaceshipBlueprint,
  direction: TDirection,
) {
  return defineCommand((next, tr) => {
    addRelativeSpaceshipBlueprintStep(
      tr,
      mainSpaceshipBlueprint,
      relativeSpaceshipBlueprint,
      direction,
    )

    next()
    return true
  })
}
