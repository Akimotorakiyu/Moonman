import { ITransaction, messageCenter } from '@moonman/core'
export function dispatchTransation(tr: ITransaction) {
  tr.steps.forEach((s) => {
    messageCenter.dispatch(s.aimId, s.operationTransform, tr)
  })
}
