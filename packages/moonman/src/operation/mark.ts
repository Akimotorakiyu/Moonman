import { IRelationAdress } from './adress'
import { IIdentifiable, IIdentity } from './identity'
import { IPieceAdress } from './adress'
import { TPieceDataIdentity } from './pieceData'
import { TPieceViewIdentity } from './pieceView'
export type TInsertMarkIdentity = IIdentity

/**
 * 表示插入数据
 * 在一个节点位置插入数据即暗含意思是
 * 在容器中的某一个节点位置插入数据
 */
export interface IInsertMark extends IIdentifiable {
  readonly type: 'IInsertMark'
  readonly relationAdress: IRelationAdress
  readonly pieceView: TPieceViewIdentity
  readonly container: TPieceDataIdentity
}

export type TRangeMarkIdentity = IIdentity

/**
 * 区间标记
 * 比如说 字体、色彩的选区区间实现
 * 比如说，视图的实现，像表格的合并
 * 对此进行move 操作结果具有不确定性
 * 所以不建议在此操作上应用 move 操作
 * 比如说删除、颜色、等附加数据操作
 */
export interface IRangeMark extends IIdentifiable {
  readonly type: 'IRangeMark'
  readonly from: IRelationAdress
  readonly to: IRelationAdress
  readonly data: Record<string, any>
  readonly container: TPieceDataIdentity
}

export type TPieceMarkIdentity = IIdentity

/**
 * piece 标记
 * 比如说删除、颜色、等附加数据操作
 */
export interface IPieceMark extends IIdentifiable {
  readonly type: 'IPieceMark'
  readonly piece: IPieceAdress
  readonly data: Record<string, any>
  readonly container: TPieceDataIdentity
}

export type TMoveMarkIdentity = IIdentity

/**
 * piece 操作移动映射
 * 隐含意味着在同父容器内进行的移动
 */
export interface IMoveMark extends IIdentifiable {
  readonly type: 'IMoveMark'
  readonly srcPiece: IPieceAdress
  readonly aimPiece: IPieceAdress
  readonly container: TPieceDataIdentity
}

/**
 * 对数据 或者节点 本身的Mark
 */
export interface IPropsMark extends IIdentifiable {
  readonly type: 'IPropsMark'
  readonly data: Record<string, any>
}

export type TMark =
  | IInsertMark
  | IRangeMark
  | IPieceMark
  | IMoveMark
  | IPropsMark
