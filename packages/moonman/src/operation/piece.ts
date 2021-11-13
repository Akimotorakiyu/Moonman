import { IIdentity, IPiece, IRelativePosition } from './basic/index'

export interface IPieceText {
  identity: IIdentity
  content: string
  position: IRelativePosition
}

export interface IPieceMove {
  identity: IIdentity
  srcPiece: IPiece
  aimPiece: IPiece
}

export interface IPieceMark {
  identity: IIdentity
  piece: IPiece
  data: Record<string, any>
}

export const createTextNode = (textNode: IPieceText) => {
  return textNode
}

export const createPieceMark = (pieceMark: IPieceMark) => {
  return pieceMark
}
export const createPieceMove = (pieceMove: IPieceMove) => {
  return pieceMove
}
