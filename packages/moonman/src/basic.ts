export type TRelativePos = 'after' | 'before' | 'inner-after' | 'inner-before'

export interface IIdentity {
  timestamp: number
  id: number
}

export interface IPosition {
  identity: IIdentity
  index: number
  relativePos: TRelativePos
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
  const startPosition: IPosition = {
    identity: piece.identity,
    index: piece.start,
    relativePos: 'before',
  }
  const endPosition: IPosition = {
    identity: piece.identity,
    index: piece.end,
    relativePos: 'before',
  }

  return [startPosition, endPosition] as const
}
