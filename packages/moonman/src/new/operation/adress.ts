import { TCoordinate } from './coordinate'
import { IPieceRange } from './pieceData'

/**
 * 表示一个 meta 元素的位置
 */
interface IAdress {
  coordinate: TCoordinate
  index: number // index in ziped meta coordinate
}

/**
 * 相对位置只有两处
 * 外部的前后，和内部的前后
 */
export interface IAdressRelation {
  isForward: boolean
  isInner: boolean
}

/**
 * 根据 anchor 对自身进行定位
 */
export interface IRelationAdress {
  anchor: IAdress
  relation: IAdressRelation
}

/**
 * 表示一个片段，一般指向一个 IPieceView 的一部分
 * 用于 mark 等只表示数据的
 */
export interface IPieceAdress {
  coordinate: TCoordinate
  piece: IPieceRange
}
