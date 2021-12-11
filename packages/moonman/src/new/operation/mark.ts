import { IRelationAdress } from './adress'
import { IIdentifiable } from './identity'
import { IPiece } from './pieceData'

/**
 * 区间标记
 * 比如说 字体、色彩的选区区间实现
 * 比如说，视图的实现，像表格的合并
 * 对此进行move 操作结果具有不确定性
 * 所以不建议在此操作上应用 move 操作
 */
export interface IRangeMark extends IIdentifiable {
  from: IRelationAdress
  to: IRelationAdress
  data: Record<string, any>
}

/**
 * piece 标记
 * 比如说删除、移动、替换等操作
 */
export interface IPieceMark extends IIdentifiable {
  piece: IPiece
  data: Record<string, any>
}

/**
 * piece 操作移动映射
 * 移动
 */
export interface IMoveMark extends IIdentifiable {
  srcPiece: IPiece
  aimPiece: IPiece
}
