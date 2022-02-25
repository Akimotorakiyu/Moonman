import { ITransaction, TDirection, IIdentity } from '@moonman/blueprint'
import { createAddRelativeSpaceship } from '../operation'
import { createSpaceshipStep } from './createStep'

export function addBrotherSpaceshipStep(
  tr: ITransaction,
  mainSpaceship: IIdentity,
  spaceship: IIdentity,
  direction: TDirection,
) {
  const op = createAddRelativeSpaceship(tr.identity, spaceship, direction)
  const step = createSpaceshipStep(mainSpaceship, op)

  tr.steps.push(step)
}
