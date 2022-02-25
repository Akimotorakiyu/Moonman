import { IIdentity } from './identity'
import { TPlanetOperation, TSpaceshipOperation } from './operation'

export interface ISpaceshipBlueprint {
  type: 'spaceshipBlueprint'

  identity: IIdentity

  operations: TSpaceshipOperation[]
  planetId: IIdentity
}

export interface IPlanetBlueprint {
  type: 'planetBlueprint'

  identity: IIdentity

  operations: TPlanetOperation[]
}

export interface ISpaceship {
  type: 'spaceship'
  blueprint: ISpaceshipBlueprint
  slots: ISlots
  planet: IPlanet
  attributes: Record<string, unknown>
}

interface ISlots extends Record<string, IIdentity[]> {
  forward: IIdentity[]
  backward: IIdentity[]
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: IIdentity[]
  attributes: Record<string, unknown>
}
