import { ITransaction, IIdentity, TDirection } from '@moonman/blueprint'
import { createAddChildSpaceship } from '../operation'
import { createPlanetStep } from './createStep'

export function addChildSpaceshipStep(
  tr: ITransaction,
  main: IIdentity,
  childSpaceship: IIdentity,
  direction: TDirection,
) {
  const op = createAddChildSpaceship(tr.identity, childSpaceship, direction)
  const step = createPlanetStep(main, op)
  tr.steps.push(step)
}
