import { TCoordinate } from './coordinate'
import { IPieceRange } from './pieceView'

/**
 * 表示一个 meta 元素的位置
 */
export interface IAdress {
  readonly coordinate: TCoordinate
  readonly index: number // index in ziped meta coordinate
}

/**
 * 相对位置只有两处
 * 外部的前后，和内部的前后
 */
export interface IAdressRelation {
  readonly isForward: boolean
  readonly isInner: boolean
}

/**
 * 根据 anchor 对自身进行定位
 * 用于添加新的数据之后，将新的数据插入到对应的位置
 * 或者 range mark 标记数据
 */
export interface IRelationAdress {
  readonly adress: IAdress
  readonly relation: IAdressRelation
}

/**
 * 表示一个片段，一般指向一个 IPieceView 数据视图 的一部分
 * 用于 move、piece mark 等只表示数据的 场景
 */
export interface IPieceAdress {
  readonly coordinate: TCoordinate
  readonly piece: IPieceRange
}
