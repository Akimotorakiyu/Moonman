import { ITransaction, ISpaceshipBlueprint } from '@moonman/blueprint'
import { createTransferSpaceship } from '../operation'
import { createSpaceshipStep } from './createStep'

export function transferBrotherSpaceshipStep(
  tr: ITransaction,
  fromSpaceshipBlueprint: ISpaceshipBlueprint,
  toSpaceshipBlueprint: ISpaceshipBlueprint,
  srcSpaceshipBlueprint: ISpaceshipBlueprint,
) {
  const op = createTransferSpaceship(
    tr,
    fromSpaceshipBlueprint,
    toSpaceshipBlueprint,
    srcSpaceshipBlueprint,
  )

  const step = createSpaceshipStep(fromSpaceshipBlueprint, op)
  tr.steps.push(step)
}
