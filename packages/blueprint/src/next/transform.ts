import { IIdentity } from './identity'
import { TStep } from './step'

export interface ITransaction {
  identity: IIdentity

  type: 'transaction'
  steps: TStep[]
}
