import { ITransaction, TOperation } from '@moonman/blueprint'
import { createMessageCenter } from './event'

interface IWave {
  [key: string]: [TOperation, ITransaction]
}

export const messageCenter = createMessageCenter<IWave>()
