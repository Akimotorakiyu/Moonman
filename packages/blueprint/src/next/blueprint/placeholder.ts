import { TPlaceholderBPID } from '../identity'
import { TPlaceholderOperation } from '../operation'
import { ISlots } from './slots'

export interface IPlaceholderBP {
  type: 'spaceshipBlueprint'

  identity: TPlaceholderBPID

  operations: TPlaceholderOperation[]
}

export interface IPlaceholder {
  type: 'placeholder'
  blueprint: IPlaceholderBP
  slots: ISlots<TPlaceholderBPID>
  attributes: Record<string, unknown>
}
