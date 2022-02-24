import { ITransaction, IIdentity } from '@moonman/blueprint'
import { createTransferSpaceship } from '../operation'
import { createSpaceshipStep } from './createStep'

export function transferBrotherSpaceshipStep(
  tr: ITransaction,
  main: IIdentity,
  nextSpaceship: IIdentity,
) {
  const op = createTransferSpaceship(tr.identity, nextSpaceship)

  const step = createSpaceshipStep(main, op)
  tr.steps.push(step)
}
