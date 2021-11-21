import { IIdentity } from './identity'
import { I2DPosition } from './pointAndLine'
import { IPieceView, IRangeView } from './pieceAndArea'

/**
 * 1D
 */
export interface IPieceMark {
  identity: IIdentity
  piece: IPieceView
  data: Record<string, any>
}
export interface IRangeMark {
  identity: IIdentity
  range: IRangeView
  data: Record<string, any>
}

/**
 * 2D
 */
// cell
export interface ICellMark {
  position: I2DPosition
  data: Record<string, any>
}

export interface ILineMark {
  line: IIdentity
  data: Record<string, any>
}
