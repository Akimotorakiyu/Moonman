import { createMessageCenter } from './event/event'
import { ITransaction, TOperationTransform } from './blueprint'
interface IWave {
  [key: string]: [TOperationTransform, ITransaction]
}

export const messageCenter = createMessageCenter<IWave>()
