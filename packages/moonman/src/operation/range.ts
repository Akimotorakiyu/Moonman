import { IRelativePosition } from './1d'
import { IIdentity } from './basic/index'

export interface IRangeMark {
  identity: IIdentity
  range: [IRelativePosition, IRelativePosition]
  data: Record<string, any>
}

export const createRangeMark = (rangeMark: IRangeMark) => {
  return rangeMark
}
