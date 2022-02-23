import { IIdentity } from './identity'
import {
  TPlanetOperationTransform,
  TSpaceShipOperationTransform,
} from './operationTransform'

export type TTimestampAndIdCombineKey =
  `${IIdentity['timestamp']}-${IIdentity['id']}`

export interface ISpaceShipBlueprint {
  type: 'spaceShipBlueprint'

  identity: IIdentity

  operationTransform: TSpaceShipOperationTransform[]
  planetId: IIdentity
}

export interface IPlanetBlueprint {
  type: 'planetBlueprint'

  identity: IIdentity

  operationTransform: TPlanetOperationTransform[]
  content?: unknown
}

export interface ISpaceShip {
  type: 'spaceShip'
  blueprint: ISpaceShipBlueprint
  slots: ISlots
  planet: IPlanet
}

interface ISlots extends Record<string, IIdentity[]> {
  forward: IIdentity[]
  backward: IIdentity[]
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: ISpaceShip[]
}
