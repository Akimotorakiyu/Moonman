import { I1DRelativePosition } from './1d'
import { IIdentity } from './basic/index'

export interface IRangeMark {
  identity: IIdentity
  range: [I1DRelativePosition, I1DRelativePosition]
  data: Record<string, any>
}

export const createRangeMark = (rangeMark: IRangeMark) => {
  return rangeMark
}
