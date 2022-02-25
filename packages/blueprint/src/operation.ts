import { IIdentity } from './identity'

export type TDirection = 'forward' | 'backward'
/**
 * for spaceship
 */
export interface IAddRelativeSpaceship {
  identity: IIdentity

  type: 'addRelativeSpaceship'
  transactionId: IIdentity
  spaceshipId: IIdentity
  direction: TDirection
}

export interface ITransferSpaceship {
  identity: IIdentity

  type: 'transferSpaceship'

  srcSpaceshipId: IIdentity

  fromSpaceshipId: IIdentity
  toSpaceshipId: IIdentity

  transactionId: IIdentity
}

/**
 * for planet
 */
export interface IAddChildSpaceship {
  identity: IIdentity

  type: 'addChildSpaceship'
  transactionId: IIdentity
  spaceshipId: IIdentity
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

export type TSpaceshipOperation =
  | IAddRelativeSpaceship
  | ITransferSpaceship
  | IAddMark

export type TPlanetOperation = IAddChildSpaceship | IAddMark

export type TOperation = TSpaceshipOperation | TPlanetOperation

export interface IPlanetStep {
  type: 'planetStep'
  aimId: IIdentity
  operation: TPlanetOperation
}
export interface ISpaceshipStep {
  type: 'spaceshipStep'
  aimId: IIdentity
  operation: TSpaceshipOperation
}

export type TStep = IPlanetStep | ISpaceshipStep

export interface ITransaction {
  identity: IIdentity

  type: 'transaction'
  steps: TStep[]
}
