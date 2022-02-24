import { createMessageCenter } from './event'
import { ITransaction, TOperation } from '@moonman/blueprint'
interface IWave {
  [key: string]: [TOperation, ITransaction]
}

export const messageCenter = createMessageCenter<IWave>()
