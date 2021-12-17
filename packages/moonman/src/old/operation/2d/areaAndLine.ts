import { IIdentity, isTheSameIdentity } from '../basic/identity'

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
  anchor: [IIdentity, IIdentity]
}

// area view
export interface IAreaView {
  range: [I2DPosition, I2DPosition]
  width: number
  height: number
  data: Record<string, any>
}

// cell
export interface ICellInfo {
  position: I2DPosition
  data: Record<string, any>
}
