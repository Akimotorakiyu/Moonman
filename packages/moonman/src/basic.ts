export type TRelation = 'after' | 'before' | 'inner-after' | 'inner-before'

export interface IIdentity {
  timestamp: number
  id: number
}

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

export interface IIdentifiable {
  identity: IIdentity
}

export const identitySortMethod = (a: IIdentifiable, b: IIdentifiable) => {
  const delta =
    a.identity.timestamp - b.identity.timestamp || a.identity.id - b.identity.id
  return delta
}
console.log('hello world')

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

export const isTheSameIdentity = (
  identityA: IIdentity,
  identityB: IIdentity,
) => {
  const isTheSame =
    identityA.timestamp == identityB.timestamp && identityA.id === identityB.id

  return isTheSame
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
