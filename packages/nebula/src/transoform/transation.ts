import {
  ITransaction,
  IPlanetStep,
  IIdentity,
  TPlanetOperationTransform,
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
  operationTransform: TPlanetOperationTransform,
): IPlanetStep {
  return {
    type: 'planetStep',
    operationTransform: operationTransform,
    aimId,
  }
}
