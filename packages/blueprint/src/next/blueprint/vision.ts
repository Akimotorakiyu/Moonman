import { TSourceBPID, TVisionBPID } from '../identity'
import { TSpaceshipOperation } from '../operation'
import { ISlots } from './slots'

export interface IVisionBP {
  type: 'spaceshipBlueprint'

  identity: TVisionBPID

  operations: TSpaceshipOperation[]
  sourceId: TSourceBPID
}

export interface IVision {
  type: 'spaceship'
  blueprint: IVisionBP
  slots: ISlots<TVisionBPID>
  attributes: Record<string, unknown>
}
