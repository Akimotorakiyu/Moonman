import { IIdentity, isTheSameIdentity } from '../basic/identity'

export type TQuadrant = '1' | '2' | '3' | '4'

export type T2DRelation = 'up' | 'down' | 'left' | 'right'

export interface ILine {
  identity: IIdentity
  relation: T2DRelation
}

export interface I2DPosition {
  identity: IIdentity
  xIndex: number
  yIndex: number
}

export interface I2DRelativePosition {
  anchor: I2DPosition
  quadrant: TQuadrant
}

export interface I2DArea {
  identity: IIdentity
  start: number
  end: number
}
