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

export interface IMark {
  type: 'mark'
  timestamp: number
  name: string
  value: unknown
}

export type TOperationTransform =
  | IAddRelativeSpaceShip
  | IAddChildSpaceShip
  | IMark

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
  type: 'spaceShipBlueprint'
  id: string
  operationTransform: IAddRelativeSpaceShip[]
  planetId: string
}

export interface IPlanetBlueprint {
  type: 'planetBlueprint'
  id: string
  operationTransform: IAddChildSpaceShip[]
}

export interface ISpaceShip {
  type: 'spaceShip'
  blueprint: ISpaceShipBlueprint
  slots: Record<string, ISpaceShip>
  planet: IPlanet
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: ISpaceShip[]
}