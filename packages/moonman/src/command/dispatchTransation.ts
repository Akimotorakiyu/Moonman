import { createTransaction, ITransaction, messageCenter } from '@moonman/nebula'
export function dispatchTransation(tr: ITransaction) {
  tr.steps.forEach((s) => {
    messageCenter.dispatch(s.aimId, s.operationTransform, tr)
  })
}

export function doTransation<T>(fn: (tr: ITransaction) => T) {
  const tr = createTransaction()
  const result = fn(tr)

  dispatchTransation(tr)

  return result
}
