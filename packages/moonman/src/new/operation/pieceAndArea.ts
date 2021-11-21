import { IIdentity } from './identity'
import { I2DPosition, I1DRelativePosition } from './pointAndLine'

/**
 * 1D
 */
export interface IPieceView {
  identity: IIdentity
  start: number
  end: number
}

export interface IRangeView {
  identity: IIdentity
  range: [I1DRelativePosition, I1DRelativePosition]
}

/**
 * 2D
 */
// area view
export interface IAreaView {
  identity: IIdentity
  range: [I2DPosition, I2DPosition]
}
