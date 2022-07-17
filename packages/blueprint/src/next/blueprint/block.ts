import { ISlots } from './slots'
import { ISource } from './source'
import { IVision } from './vision'

export namespace Moonman {
  export interface IBlock {
    vision: IVision
    source: ISource
    outter: ISlots<IBlock>
    inner: ISlots<IBlock>
  }
}
