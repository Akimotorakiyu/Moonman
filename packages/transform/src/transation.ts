import { ITransaction } from '@moonman/blueprint'
import { getIdentity } from '@moonman/nebula'

export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}
