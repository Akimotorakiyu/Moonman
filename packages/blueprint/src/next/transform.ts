import { TTransactionID } from './identity'
import { TStep } from './step'

export interface ITransaction {
  identity: TTransactionID

  type: 'ITransaction'
  steps: TStep[]
}
