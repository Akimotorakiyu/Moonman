import { IIdentity } from './identity'

export type TDirection = 'forward' | 'backward'
/**
 * for spaceship
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

  type: 'transferSpaceShip'
  nextSpaceShipId: IIdentity

  transactionId: IIdentity
}

/**
 * for planet
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
  transactionId: IIdentity
  name: string
  value: unknown
}

export type TSpaceShipOperationTransform =
  | IAddRelativeSpaceShip
  | ITransferSpaceShip
  | IAddMark

export type TPlanetOperationTransform = IAddChildSpaceShip | IAddMark

export type TOperationTransform =
  | TSpaceShipOperationTransform
  | TPlanetOperationTransform

export interface IPlanetStep {
  type: 'planetStep'
  aimId: IIdentity
  operationTransform: TPlanetOperationTransform
}
export interface ISpaceShipStep {
  type: 'spaceShipStep'
  aimId: IIdentity
  operationTransform: TSpaceShipOperationTransform
}

export type TStep = IPlanetStep | ISpaceShipStep

export interface ITransaction {
  identity: IIdentity

  type: 'transaction'
  steps: TStep[]
}
