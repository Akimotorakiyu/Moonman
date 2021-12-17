import { IIdentifiable, IIdentity } from './identity'

export type TPieceDataIdentity = IIdentity

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
