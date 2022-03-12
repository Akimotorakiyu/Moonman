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
  attributes: Record<string, unknown>
}

interface ISlots {
  forward: IIdentity[]
  backward: IIdentity[]
}

export interface IPlanet {
  type: 'planet'
  blueprint: IPlanetBlueprint
  children: IIdentity[]
  attributes: Record<string, unknown>
}

export interface IGalaxy {
  spaceship: ISpaceship
  planet: IPlanet
  orbit: {
    forward: IGalaxy[]
    backward: IGalaxy[]
  }
  arm: {
    forward: IGalaxy[]
    backward: IGalaxy[]
  }
}
