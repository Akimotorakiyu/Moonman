import { IIdentity, isTheSameIdentity } from '../basic/identity'

export type TRelation = 'after' | 'before' | 'inner-after' | 'inner-before'

export interface IPosition {
  identity: IIdentity
  index: number
}

export interface IRelativePosition {
  anchor: IPosition
  relation: TRelation
}

export interface IPiece {
  identity: IIdentity
  start: number
  end: number
}

export interface MoonmanData {
  deleted: boolean
}

export const computedPositionFromPiece = (piece: IPiece) => {
  const startPosition: IRelativePosition = {
    anchor: {
      identity: piece.identity,
      index: piece.start,
    },
    relation: 'before',
  }
  const endPosition: IRelativePosition = {
    anchor: {
      identity: piece.identity,
      index: piece.end,
    },
    relation: 'before',
  }

  return [startPosition, endPosition] as const
}

export const positionInPiece = (position: IPosition, piece: IPiece) => {
  if (isTheSameIdentity(position.identity, piece.identity)) {
    const isAfterStart = piece.start <= position.index
    const isBeforeEnd = position.index < piece.end

    return isAfterStart && isBeforeEnd
  } else {
    return false
  }
}
