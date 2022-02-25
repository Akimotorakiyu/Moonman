import { ITransaction, IIdentity } from '@moonman/blueprint'
import { createTransferSpaceship } from '../operation'
import { createSpaceshipStep } from './createStep'

export function transferBrotherSpaceshipStep(
  tr: ITransaction,
  fromSpaceshipId: IIdentity,
  toSpaceshipId: IIdentity,
  srcSpaceshipId: IIdentity,
) {
  const op = createTransferSpaceship(
    tr.identity,
    fromSpaceshipId,
    toSpaceshipId,
    srcSpaceshipId,
  )

  const step = createSpaceshipStep(fromSpaceshipId, op)
  tr.steps.push(step)
}
