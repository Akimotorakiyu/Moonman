import { IIdentity } from './identity'

export type TDirection = 'forward' | 'backward'
/**
 * for planet
 */
export interface IAddRelativeSpaceShip {
  identity: IIdentity

  type: 'addRelativeSpaceShip'
  transactionId: IIdentity
  spaceShipId: IIdentity
  direction: TDirection
}

export interface ITransferSpaceShip {
  identity: IIdentity

  type: 'moveSpaceShip'
  nextSpaceShipId: IIdentity
}

/**
 * for spaceship
 */
export interface IAddChildSpaceShip {
  identity: IIdentity

  type: 'addChildSpaceShip'
  transactionId: IIdentity
  spaceShipId: IIdentity
  direction: TDirection
}

/**
 * for planet and spaceship
 */
export interface IAddMark {
  identity: IIdentity

  type: 'addMark'
  transactionId: string
  name: string
  value: unknown
}

export type TOperationTransform =
  | IAddRelativeSpaceShip
  | IAddChildSpaceShip
  | IAddMark
  | ITransferSpaceShip

export type TSpaceShipOperationTransform =
  | IAddRelativeSpaceShip
  | ITransferSpaceShip
  | IAddMark

export type TPlanetOperationTransform = IAddChildSpaceShip | IAddMark

export interface IStep {
  type: 'step'
  aimId: IIdentity
  operationTransform: TOperationTransform
}

export interface ITransaction {
  identity: IIdentity

  type: 'transaction'
  steps: IStep[]
}
