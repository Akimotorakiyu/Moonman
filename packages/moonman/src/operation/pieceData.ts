import { IIdentifiable, IIdentity } from './identity'
import { TOperation } from './operation'

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
 * 子元素为 pieceview，对所有子 pieceview 的操作的记录在 父 PieceData 上
 * 对 PieceData 的操作直接记录在 PieceData 上
 * piece data 和 piece darta 之间 为 pieceview 隔离
 * operationNotes 的数量是唯一会变的
 */
export interface IPieceData<T extends TData = string> extends IIdentifiable {
  readonly type: 'IPieceData'
  readonly data: T
  readonly operationList: TOperation[]
}
