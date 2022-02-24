import { ITransaction, IIdentity } from '@moonman/blueprint'
import { createAddChildSpaceship } from '../operation'
import { createPlanetStep } from './createStep'

export function addChildSpaceshipStep(
  tr: ITransaction,
  main: IIdentity,
  childSpaceship: IIdentity,
) {
  const op = createAddChildSpaceship(tr.identity, childSpaceship, 'forward')
  const step = createPlanetStep(main, op)
  tr.steps.push(step)
}
