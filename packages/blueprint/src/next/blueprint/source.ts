import { TSourceBPID, TPlaceholderBPID } from '../identity'
import { TSourceOperation } from '../operation'

type TSourceBP = 'SourceBlueprint'
export interface IISourceBP {
  type: TSourceBP
  identity: TSourceBPID
  operations: TSourceOperation[]
}

type TSource = 'Source'
export interface ISource {
  type: TSource
  blueprint: IISourceBP
  children: TPlaceholderBPID[]
  attributes: Record<string, unknown>
}
