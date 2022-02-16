import { createMessageCenter } from './event'
import { ITransaction, TOperationTransform } from '@moonman/blueprint'
interface IWave {
  [key: string]: [TOperationTransform, ITransaction]
}

export const messageCenter = createMessageCenter<IWave>()
