import { IPieceView, IAreaView } from './pieceAndArea'
import { I1DRelativePosition } from './pointAndLine'

/**
 * 1D
 */
export interface IPieceInfo {
  type: string
  piece: IPieceView
  position: I1DRelativePosition
}

/**
 * 2D
 */
export interface IAreaInfo {
  area: IAreaView
  position: I1DRelativePosition
}
