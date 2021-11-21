import { IPiece, I1DRelativePosition } from './1d'
import { I2DPosition } from './2d'
import { IIdentity } from './basic/index'

export interface IMetaInfo {
  type: string
  piece: IPiece
  position: I1DRelativePosition
  data: Record<string, any>
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

export const createMetaInfo = (metaInfo: IMetaInfo) => {
  return metaInfo
}

export const createPieceMark = (pieceMark: IPieceMark) => {
  return pieceMark
}

export const createPieceMove = (pieceMove: IPieceMove) => {
  return pieceMove
}
