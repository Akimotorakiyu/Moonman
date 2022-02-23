import {
  createTransaction,
  dispatchTransation,
  ITransaction,
} from '@moonman/nebula'

export function doTransation<T>(fn: (tr: ITransaction) => T) {
  const tr = createTransaction()
  const result = fn(tr)

  dispatchTransation(tr)

  return result
}
