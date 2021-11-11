export interface ITextNode {
  content: string
  timestamp: number
  id: number
  beforeId: number
  indexInBefore: number
}

export interface ITextMapping {
  timestamp: number
  id: number
  srcId: number
  srcRange: [number, number]
  aimId: number
  aimIndex: number
}

export interface IRangeMark {
  timestamp: number
  id: number
  range: [
    {
      id: number
      index: number
    },
    {
      id: number
      index: number
    },
  ]
  data: Record<string, any>
}

export interface IPieceMark {
  timestamp: number
  id: number
  aimId: number
  range: [number, number]
  data: Record<string, any>
}

export const createTextNode = (textNode: ITextNode) => {
  return textNode
}
export const createRangeMark = (rangeMark: IRangeMark) => {
  return rangeMark
}
export const createPieceMark = (pieceMark: IPieceMark) => {
  return pieceMark
}
