import { IPiece, IPosition, IIdentity } from './basic'

export interface ITextNode {
  identity: IIdentity
  content: string
  position: IPosition
}

export interface ITextMapping {
  identity: IIdentity
  srcPiece: IPiece
  aimPiece: IPiece
}

export interface IRangeMark {
  identity: IIdentity
  range: [IPosition, IPosition]
  data: Record<string, any>
}

export interface IPieceMark {
  identity: IIdentity
  piece: IPiece
  data: Record<string, any>
}

export const createTextNode = (
  textNode: ITextNode,
  preTextNode?: ITextNode,
) => {
  return textNode
}
export const createRangeMark = (
  rangeMark: IRangeMark,
  preTextNode: ITextNode,
  nextTextNode: ITextNode,
) => {
  return rangeMark
}
export const createPieceMark = (pieceMark: IPieceMark) => {
  return pieceMark
}
