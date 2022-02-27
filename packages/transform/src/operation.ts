import {
  IAddChildSpaceship,
  IAddRelativeSpaceship,
  TDirection,
  IAddMark,
  ITransferSpaceship,
  ISpaceshipBlueprint,
  ITransaction,
} from '@moonman/blueprint'
import { getIdentity } from '@moonman/nebula'

export function createAddRelativeSpaceshipBlueprint(
  transaction: ITransaction,
  relativeSpaceshipBlueprint: ISpaceshipBlueprint,
  direction: TDirection,
): IAddRelativeSpaceship {
  return {
    identity: getIdentity(),
    direction,
    transactionId: transaction.identity,
    spaceshipId: relativeSpaceshipBlueprint.identity,
    type: 'addRelativeSpaceship',
  }
}

export function createAddChildSpaceshipBlueprint(
  transaction: ITransaction,
  childSpaceshipBlueprint: ISpaceshipBlueprint,
  direction: TDirection,
): IAddChildSpaceship {
  return {
    identity: getIdentity(),
    direction,
    transactionId: transaction.identity,
    spaceshipId: childSpaceshipBlueprint.identity,
    type: 'addChildSpaceship',
  }
}

export function createAddMark<T>(
  transaction: ITransaction,
  name: string,
  value: T,
): IAddMark {
  return {
    identity: getIdentity(),
    type: 'addMark',
    transactionId: transaction.identity,
    name,
    value,
  }
}

export function createTransferSpaceship<T>(
  transaction: ITransaction,
  fromSpaceship: ISpaceshipBlueprint,
  toSpaceship: ISpaceshipBlueprint,
  srcSpaceship: ISpaceshipBlueprint,
): ITransferSpaceship {
  return {
    identity: getIdentity(),
    type: 'transferSpaceship',
    transactionId: transaction.identity,
    srcSpaceshipId: srcSpaceship.identity,
    fromSpaceshipId: fromSpaceship.identity,
    toSpaceshipId: toSpaceship.identity,
  }
}
