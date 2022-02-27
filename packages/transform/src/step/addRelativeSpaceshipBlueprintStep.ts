import {
  ITransaction,
  TDirection,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'
import { createAddRelativeSpaceshipBlueprint } from '../operation'
import { createSpaceshipStep } from './createStep'

export function addRelativeSpaceshipBlueprintStep(
  tr: ITransaction,
  mainSpaceshipBlueprint: ISpaceshipBlueprint,
  relativeSpaceship: ISpaceshipBlueprint,
  direction: TDirection,
) {
  const op = createAddRelativeSpaceshipBlueprint(
    tr,
    relativeSpaceship,
    direction,
  )
  const step = createSpaceshipStep(mainSpaceshipBlueprint, op)

  tr.steps.push(step)
}
