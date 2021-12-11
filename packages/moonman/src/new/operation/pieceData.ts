import { TCoordinate } from './coordinate'
import { IIdentifiable } from './identity'

interface IPieceRange {
  start: number
  end: number
}

/**
 * IPieceView is one or more meta info ziped in a piece
 * withe the same identity
 */
export interface IPieceView<T extends ArrayLike<unknown> = string>
  extends IIdentifiable {
  meta: T // T may char array or Some Array
  piece: IPieceRange
}

/**
 * 表示一个片段
 */
export interface IPiece {
  coordinate: TCoordinate
  piece: IPieceRange
}
