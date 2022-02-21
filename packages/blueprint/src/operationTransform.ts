export type TDirection = 'forward' | 'backward'
/**
 * for planet
 */
export interface IAddRelativeSpaceShip {
  id: number
  timestamp: number
  type: 'addRelativeSpaceShip'
  transactionId: string
  spaceShipId: string
  direction: TDirection
}

export interface ITransferSpaceShip {
  id: number
  timestamp: number
  type: 'moveSpaceShip'
  nextSpaceShipId: string
}

/**
 * for spaceship
 */
export interface IAddChildSpaceShip {
  id: number
  timestamp: number
  type: 'addChildSpaceShip'
  transactionId: string
  spaceShipId: string
  direction: TDirection
}

/**
 * for planet and spaceship
 */
export interface IAddMark {
  id: number
  timestamp: number
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
  aimId: string
  operationTransform: TOperationTransform
}

export interface ITransaction {
  timestamp: number
  type: 'transaction'
  id: number
  steps: IStep[]
}
