import { IIdentifiable, IIdentity } from './identity'

export type TPieceDataIdentity = IIdentity

/**
 * 只有两种类型的数据 string 或者 数据
 * string 就直接放在那就好了
 * data 需要放在 数组里面
 */

export type TData = string | Record<string, unknown>

/**
 * 数据真正存储的地方
 * 一条或多条数据存储在一起
 * one or more meta info ziped in a piece
 */
export interface IPieceData<T extends TData = string> extends IIdentifiable {
  readonly type: 'IPieceData'
  readonly data: T
}

/**
 * Range 即区间
 * 左开右闭
 */
export interface IPieceRange {
  readonly start: number
  readonly end: number
}
