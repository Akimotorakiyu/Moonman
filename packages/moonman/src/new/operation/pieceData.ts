import { TCoordinate } from './coordinate'
import { IIdentifiable, IIdentity } from './identity'

/**
 * 数据真正存储的地方
 */
export interface IPieceData<T extends ArrayLike<unknown> = string>
  extends IIdentifiable {
  data: T
}

/**
 * Range 即区间
 * 左开右闭
 */
export interface IPieceRange {
  start: number
  end: number
}

/**
 * IPieceView is one or more meta info ziped in a piece
 * withe the same identity
 */
export interface IPieceView extends IIdentifiable {
  piece: IPieceRange // 在 IPieceData 中的区间
  data: IIdentity //指向 IPieceData
}
