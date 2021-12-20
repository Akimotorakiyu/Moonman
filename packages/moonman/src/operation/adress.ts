import { TCoordinate } from './coordinate'
import { IPieceRange } from './pieceData'

/**
 * 表示一个 meta 元素的位置
 */
export interface IAdress {
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
 * 用于添加新的数据之后，将新的数据插入到对应的位置
 * 或者 range mark 标记数据
 */
export interface IRelationAdress {
  adress: IAdress
  relation: IAdressRelation
}

/**
 * 表示一个片段，一般指向一个 IPieceView 数据视图 的一部分
 * 用于 move、piece mark 等只表示数据的 场景
 */
export interface IPieceAdress {
  coordinate: TCoordinate
  piece: IPieceRange
}
