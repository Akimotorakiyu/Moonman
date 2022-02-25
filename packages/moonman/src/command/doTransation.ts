import { ITransaction } from '@moonman/blueprint'
import { createTransaction, dispatchTransation } from '@moonman/transform'

export function doTransation<T>(fn: (tr: ITransaction) => T) {
  const tr = createTransaction()
  const result = fn(tr)

  dispatchTransation(tr)

  return result
}
