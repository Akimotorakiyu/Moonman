import { IIdentifiable, IIdentity } from './identity'

/**
 * 数据真正存储的地方
 * 一条或多条数据存储在一起
 * one or more meta info ziped in a piece
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
 * IPieceView
 * 数据视图
 */
export interface IPieceView extends IIdentifiable {
  piece: IPieceRange // 在 IPieceData 中的区间
  data: IIdentity //指向 IPieceData
}
