import {
  TPlanetOperationTransform,
  TSpaceShipOperationTransform,
} from './operationTransform'

export interface ISpaceShipBlueprint {
  type: 'spaceShipBlueprint'
  id: number
  operationTransform: TSpaceShipOperationTransform[]
  planetId: string
}

export interface IPlanetBlueprint {
  type: 'planetBlueprint'
  id: number
  operationTransform: TPlanetOperationTransform[]
  content?: unknown
}

export interface ISpaceShip {
  type: 'spaceShip'
  blueprint: ISpaceShipBlueprint
  slots: ISlots
  planet: IPlanet
}

interface ISlots extends Record<string, ISpaceShip[]> {
  forward: ISpaceShip[]
  backward: ISpaceShip[]
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: ISpaceShip[]
}
