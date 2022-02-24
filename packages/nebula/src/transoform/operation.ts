import {
  IAddChildSpaceship,
  IAddRelativeSpaceship,
  TDirection,
  IAddMark,
  IIdentity,
  ITransferSpaceship,
} from '@moonman/blueprint'
import { getIdentity } from '../util'

export function createAddRelativeSpaceship(
  transactionId: IIdentity,
  spaceshipId: IIdentity,
  direction: TDirection,
): IAddRelativeSpaceship {
  return {
    identity: getIdentity(),
    direction,
    transactionId,
    spaceshipId,
    type: 'addRelativeSpaceship',
  }
}

export function createAddChildSpaceship(
  transactionId: IIdentity,
  spaceshipId: IIdentity,
  direction: TDirection,
): IAddChildSpaceship {
  return {
    identity: getIdentity(),
    direction,
    transactionId,
    spaceshipId,
    type: 'addChildSpaceship',
  }
}

export function createAddMark<T>(
  transactionId: IIdentity,
  name: string,
  value: T,
): IAddMark {
  return {
    identity: getIdentity(),
    type: 'addMark',
    transactionId,
    name,
    value,
  }
}

export function createTransferSpaceship<T>(
  transactionId: IIdentity,
  nextSpaceshipId: IIdentity,
): ITransferSpaceship {
  return {
    identity: getIdentity(),
    type: 'transferSpaceship',
    transactionId,
    nextSpaceshipId,
  }
}
