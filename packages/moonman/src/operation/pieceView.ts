import { IIdentifiable, IIdentity } from './identity'
import { TPieceDataIdentity } from './pieceData'
export type TPieceViewIdentity = IIdentity

/**
 * Range 即区间
 * 左开右闭
 */
export interface IPieceRange {
  readonly start: number
  readonly end: number
}

/**
 * IPieceView
 * 数据视图,对此的操作记录在父 piece data 上
 */
export interface IPieceView extends IIdentifiable {
  readonly type: 'IPieceView'
  readonly piece: IPieceRange // 在 IPieceData 中的区间
  readonly data: TPieceDataIdentity //指向 IPieceData
}
