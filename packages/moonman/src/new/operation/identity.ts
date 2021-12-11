export interface IIdentity {
  timestamp: number
  id: number
}

export interface IIdentifiable {
  identity: IIdentity
}

/**
 * TCoordinate is the coordinate on the n dimension
 */
export type TCoordinate = IIdentity[]

interface ILengthAble {
  length: number
}

interface IPieceRange {
  start: number
  end: number
}

/**
 * IPieceView is one or more meta info ziped in a piece
 * withe the same identity
 */
export interface IPieceView<T extends ILengthAble = string>
  extends IIdentifiable {
  meta: T // T may char array or Some Array
  piece: IPieceRange
}

/**
 * 表示一个 meta 元素的位置
 */
interface IAdress<T extends ILengthAble = string> {
  coordinate: TCoordinate
  index: number // index in ziped meta coordinate
}

/**
 * 相对位置只有两处
 * 外部的前后，和内部的前后
 */
export interface IAdressRelation {
  isForward: boolean
  isInner: boolean
}

/**
 * 根据 anchor 对自身进行定位
 */
export interface IRelationAdress {
  anchor: IAdress
  relation: IAdressRelation
}

/**
 * 表示一个片段
 */
interface IPiece {
  coordinate: TCoordinate
  piece: IPieceRange
}

/**
 * 区间标记
 * 比如说 字体、色彩的选区区间实现
 * 比如说，视图的实现，像表格的合并
 * 对此进行move 操作结果具有不确定性
 * 所以不建议在此操作上应用 move 操作
 */
export interface IRangeMark extends IIdentifiable {
  from: IRelationAdress
  to: IRelationAdress
  data: Record<string, any>
}

/**
 * piece 标记
 * 比如说删除、移动、替换等操作
 */
export interface IPieceMark extends IIdentifiable {
  piece: IPiece
  data: Record<string, any>
}

/**
 * piece 操作移动映射
 * 移动
 */
export interface IMoveMark extends IIdentifiable {
  srcPiece: IPiece
  aimPiece: IPiece
}

//
export const identitySortMethod = (a: IIdentifiable, b: IIdentifiable) => {
  const delta =
    a.identity.timestamp - b.identity.timestamp || a.identity.id - b.identity.id
  return delta
}

export const isTheSameIdentity = (
  identityA: IIdentity,
  identityB: IIdentity,
) => {
  const isTheSame =
    identityA.timestamp == identityB.timestamp && identityA.id === identityB.id

  return isTheSame
}

/**
 * isTheSameCoordinate
 * @param coordinateA
 * @param coordinateB
 * @returns
 */
export const isTheSameCoordinate = (
  coordinateA: TCoordinate,
  coordinateB: TCoordinate,
) => {
  const isTheSameDimension = coordinateA.length === coordinateB.length
  if (isTheSameDimension) {
    const isTheSameInEveryDimension = coordinateA.every(
      (identityIndexA, index) => {
        const identityIndexB = coordinateB[index]
        return isTheSameIdentity(identityIndexA, identityIndexB)
      },
    )
    return isTheSameInEveryDimension
  } else {
    return false
  }
}
