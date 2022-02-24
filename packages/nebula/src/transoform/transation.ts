import {
  ITransaction,
  IPlanetStep,
  ISpaceshipStep,
  IIdentity,
  TPlanetOperation,
  TSpaceshipOperation,
} from '@moonman/blueprint'
import { getIdentity } from '../util'

export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}

export function createPlanetStep(
  aimId: IIdentity,
  operation: TPlanetOperation,
): IPlanetStep {
  return {
    type: 'planetStep',
    operation,
    aimId,
  }
}
export function createSpaceshipStep(
  aimId: IIdentity,
  operation: TSpaceshipOperation,
): ISpaceshipStep {
  return {
    type: 'spaceshipStep',
    operation,
    aimId,
  }
}
