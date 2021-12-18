import { IIdentifiable, IIdentity } from './identity'
import { IPieceRange } from './pieceData'
import { TPieceDataIdentity } from './pieceData'
export type TPieceViewIdentity = IIdentity

/**
 * IPieceView
 * 数据视图
 */
export interface IPieceView extends IIdentifiable {
  type: 'IPieceView'
  piece: IPieceRange // 在 IPieceData 中的区间
  data: TPieceDataIdentity //指向 IPieceData
}
