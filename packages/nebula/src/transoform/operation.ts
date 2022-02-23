import {
  IAddChildSpaceShip,
  IAddRelativeSpaceShip,
  TDirection,
  IAddMark,
  IIdentity,
  ITransferSpaceShip,
} from '@moonman/blueprint'
import { getIdentity } from '../util'

export function createAddRelativeSpaceShip(
  transactionId: IIdentity,
  spaceShipId: IIdentity,
  direction: TDirection,
): IAddRelativeSpaceShip {
  return {
    identity: getIdentity(),
    direction,
    transactionId,
    spaceShipId,
    type: 'addRelativeSpaceShip',
  }
}

export function createAddChildSpaceShip(
  transactionId: IIdentity,
  spaceShipId: IIdentity,
  direction: TDirection,
): IAddChildSpaceShip {
  return {
    identity: getIdentity(),
    direction,
    transactionId,
    spaceShipId,
    type: 'addChildSpaceShip',
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

export function createTransferSpaceShip<T>(
  transactionId: IIdentity,
  nextSpaceShipId: IIdentity,
): ITransferSpaceShip {
  return {
    identity: getIdentity(),
    type: 'transferSpaceShip',
    transactionId,
    nextSpaceShipId,
  }
}
