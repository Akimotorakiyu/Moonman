import { TCoordinate } from './coordinate'

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
