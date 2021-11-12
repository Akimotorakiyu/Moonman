import { IPiece, IRelativePosition, IIdentity } from './basic'

// 文本OT
export interface IPieceText {
  identity: IIdentity
  content: string
  position: IRelativePosition
}

// 移动OT
export interface IPieceMove {
  identity: IIdentity
  srcPiece: IPiece
  aimPiece: IPiece
}

// 选区OT
export interface IRangeMark {
  identity: IIdentity
  range: [IRelativePosition, IRelativePosition]
  data: Record<string, any>
}

// 小段OT
export interface IPieceMark {
  identity: IIdentity
  piece: IPiece
  data: Record<string, any>
}

export const createTextNode = (textNode: IPieceText) => {
  return textNode
}
export const createRangeMark = (rangeMark: IRangeMark) => {
  return rangeMark
}
export const createPieceMark = (pieceMark: IPieceMark) => {
  return pieceMark
}
