import { IIdentifiable, IIdentity } from './identity'
import { IPieceRange } from './pieceData'
import { TPieceDataIdentity } from './pieceData'
export type TPieceViewIdentity = IIdentity

/**
 * IPieceView
 * 数据视图,对此的操作记录在父 piece data 上
 */
export interface IPieceView extends IIdentifiable {
  readonly type: 'IPieceView'
  readonly piece: IPieceRange // 在 IPieceData 中的区间
  readonly data: TPieceDataIdentity //指向 IPieceData
}
