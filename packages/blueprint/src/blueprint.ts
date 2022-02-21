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

type TTimestampAndIdCombine = `${number}-${number}`
interface ISlots extends Record<string, TTimestampAndIdCombine[]> {
  forward: TTimestampAndIdCombine[]
  backward: TTimestampAndIdCombine[]
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: ISpaceShip[]
}
