import { IIdentity } from '@moonman/blueprint'

let idIndicator = 0
export function getIdentity(): IIdentity {
  return {
    id: idIndicator++,
    timestamp: Date.now(),
  }
}

export function isTheSameIdentity(id0: IIdentity, id1: IIdentity) {
  return id0.timestamp === id1.timestamp && id0.id === id1.id
}
