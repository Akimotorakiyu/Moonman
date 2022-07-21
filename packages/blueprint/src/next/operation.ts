import { TDirection } from './direction'
import { IHistory } from './history'
import { IIdentity, TTransactionID } from './identity'
import { IVerify } from './verify'

/**
 * base
 */
export interface IOperation {
  identity: IIdentity
  transactionId: TTransactionID
  verify?: IVerify
  history?: IHistory[]
}

/**
 * common
 */
export interface IAddMark extends IOperation {
  type: 'IAddMark'
  name: string
  value: unknown
}

/**
 * for placeholder
 */
export interface IAddRelativePlaceholder extends IOperation {
  type: 'IAddRelativePlaceholder'
  spaceshipId: IIdentity
  direction: TDirection
}

/**
 * for vision
 */
export interface ITransfer extends IOperation {
  type: 'ITransfer'
  srcSpaceshipId: IIdentity
  fromSpaceshipId: IIdentity
  toSpaceshipId: IIdentity
}

/**
 * for Source
 */
export interface IAddChildPlaceholder extends IOperation {
  type: 'IAddChildPlaceholder'
  spaceshipId: IIdentity
  direction: TDirection
}

export type TVisionOperation = IAddMark | ITransfer

export type TPlaceholderOperation = IAddMark | IAddRelativePlaceholder

export type TSourceOperation = IAddMark | IAddChildPlaceholder

export type TOperation =
  | TVisionOperation
  | TSourceOperation
  | TPlaceholderOperation
