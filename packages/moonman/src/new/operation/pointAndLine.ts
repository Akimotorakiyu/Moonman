import { IIdentity } from './identity'

/**
 * 1D
 */
// 1D
export interface I1DPosition {
  identity: IIdentity
  index: number
}

export type T1DRelation = 'after' | 'before' | 'inner-after' | 'inner-before'

export interface I1DRelativePosition {
  anchor: I1DPosition
  relation: T1DRelation
}

/**
 * 2D
 */
// row
export interface IRowLine {
  type: 'row'
  identity: IIdentity
  relation: IRowRelativeLinePosition
  data: Record<string, any>
}

type TRowRelation = 'up' | 'down'

export interface IRowRelativeLinePosition {
  anchor: IIdentity
  relation: TRowRelation
}

// column
export interface IColumnLine {
  type: 'row'
  identity: IIdentity
  relation: IRowRelativeLinePosition
}

type TColumnRelation = 'left' | 'right'

export interface IColumnRelativeLinePosition {
  anchor: IIdentity
  relation: TColumnRelation
}

// position
export interface I2DPosition {
  row: IIdentity
  column: IIdentity
}

/**
 * unity 1D & 2D
 */
export type TUnityPosition = I1DRelativePosition | I2DPosition
