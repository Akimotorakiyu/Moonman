import { IIdentity } from '@moonman/blueprint'

let idIndicator = 0
export function getIdentity(): IIdentity {
  return {
    id: idIndicator++,
    timestamp: Date.now(),
  }
}
