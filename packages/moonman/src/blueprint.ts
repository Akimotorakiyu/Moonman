export type TDirection = 'forward' | 'backward'

export interface IAddRelativeSpaceShip {
  type: 'addRelativeSpaceShip'
  transactionId: string
  timestamp: number
  spaceShipId: string
  direction: TDirection
}

export interface IAddChildSpaceShip {
  type: 'addChildSpaceShip'
  transactionId: string
  timestamp: number
  spaceShipId: string
  direction: TDirection
}

export type TOperationTransform = IAddRelativeSpaceShip | IAddChildSpaceShip

export interface IStep {
  type: 'step'
  aimId: string
  operationTransform: TOperationTransform
}

export interface ITransaction {
  type: 'transaction'
  id: string
  timestamp: number
  steps: IStep[]
}

export interface ISpaceShipBlueprint {
  type: 'spaceShip'
  id: string
  operationTransform: IAddRelativeSpaceShip[]
  planetId: string
}

export interface IPlanetBlueprint {
  type: 'planet'
  id: string
  operationTransform: IAddChildSpaceShip[]
}

export interface ISpaceShip {
  blueprint: ISpaceShipBlueprint
  slots: Record<string, ISpaceShip>
}

export interface IPlanet {
  blueprint: IPlanetBlueprint
  children: []
}

export interface ISlots {
  [name: string]: []
}
