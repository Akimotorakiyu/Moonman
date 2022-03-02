import { IHistory } from './history'
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
  history?: IHistory[]
}

export interface ITransferSpaceship {
  identity: IIdentity

  type: 'transferSpaceship'

  srcSpaceshipId: IIdentity

  fromSpaceshipId: IIdentity
  toSpaceshipId: IIdentity

  transactionId: IIdentity
  history?: IHistory[]
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
  history?: IHistory[]
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
  history?: IHistory[]
}

export type TSpaceshipOperation =
  | IAddRelativeSpaceship
  | ITransferSpaceship
  | IAddMark

export type TPlanetOperation = IAddChildSpaceship | IAddMark

export type TOperation = TSpaceshipOperation | TPlanetOperation
