export type TRelativePos = 'after' | 'before' | 'inner-after' | 'inner-before'
export interface IPosition {
  timestamp: number
  id: number
  index: number
  relativePos: TRelativePos
}

export interface MoonmanData {
  deleted: boolean
}
