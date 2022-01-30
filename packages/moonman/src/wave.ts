import { createMessageCenter } from './event/event'
import { ITransaction } from './blueprint'
interface IWave {
  [key: string]: [ITransaction]
}

export const messageCenter = createMessageCenter<IWave>()
