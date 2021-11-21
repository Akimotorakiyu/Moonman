import { IIdentity, isTheSameIdentity } from '../basic/identity'

// row
export interface IRowLine {
  type: 'row'
  identity: IIdentity
  relation: IRowRelativeLinePosition
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
export interface I2DRelativePosition {
  rowRelation: IRowRelativeLinePosition
  columRelation: IRowRelativeLinePosition
}

// area
export interface IArea {
  position: I2DRelativePosition
  width: number
  height: number
  data: Record<string, any>
}
