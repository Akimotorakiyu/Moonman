import { ITransaction } from '@moonman/blueprint'
import { getIdentity } from '@moonman/nebula'
import { dispatchTransation } from './deal'

export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}

export function doTransation<T>(fn: (tr: ITransaction) => T) {
  const tr = createTransaction()
  const result = fn(tr)

  dispatchTransation(tr)

  return result
}
