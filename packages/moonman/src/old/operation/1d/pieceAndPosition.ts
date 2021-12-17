import { IIdentity, isTheSameIdentity } from '../basic/identity'

export type T1DRelation = 'after' | 'before' | 'inner-after' | 'inner-before'

export interface I1DPosition {
  identity: IIdentity
  index: number
}

export interface I1DRelativePosition {
  anchor: I1DPosition
  relation: T1DRelation
}

export interface IPiece {
  identity: IIdentity
  start: number
  end: number
}

export interface MoonmanData {
  deleted: boolean
}

export const computed1DPositionFromPiece = (piece: IPiece) => {
  const startPosition: I1DRelativePosition = {
    anchor: {
      identity: piece.identity,
      index: piece.start,
    },
    relation: 'before',
  }
  const endPosition: I1DRelativePosition = {
    anchor: {
      identity: piece.identity,
      index: piece.end,
    },
    relation: 'before',
  }

  return [startPosition, endPosition] as const
}

export const is1DPositionInPiece = (position: I1DPosition, piece: IPiece) => {
  if (isTheSameIdentity(position.identity, piece.identity)) {
    const isAfterStart = piece.start <= position.index
    const isBeforeEnd = position.index < piece.end

    return isAfterStart && isBeforeEnd
  } else {
    return false
  }
}
