import { ITransaction } from '@moonman/blueprint'
import { getIdentity } from '../util'

export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}
