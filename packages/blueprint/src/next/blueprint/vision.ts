import { TSourceBPID, TVisionBPID } from '../identity'
import { TVisionOperation } from '../operation'

export interface IVisionBP {
  type: 'IVisionBP'
  identity: TVisionBPID
  operations: TVisionOperation[]
  sourceId: TSourceBPID
}

export interface IVision {
  type: 'IVision'
  blueprint: IVisionBP
  attributes: Record<string, unknown>
}
