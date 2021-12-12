import type {
  IPieceView,
  IIdentity,
  IPieceData,
  IRelationAdress,
  IInsertMark,
} from '../operation/index'

// 生产环境中应使用随机数
let id = 0

// 生成 id
export function genIdentity(): IIdentity {
  return {
    id: id++,
    timestamp: Date.now(),
  }
}

// 创建 piece 数据
export function createPieceData<T extends ArrayLike<unknown>>(
  dataArray: T,
): IPieceData<T> {
  const pieceData: IPieceData<T> = {
    identity: genIdentity(),
    data: dataArray,
  }
  return pieceData
}

// 创建 pieceView
export function _createPieceView<T extends ArrayLike<unknown>>(
  pieceData: IPieceData<T>,
) {
  const pieceView: IPieceView = {
    identity: genIdentity(),
    piece: {
      start: 0,
      end: pieceData.data.length,
    },
    data: pieceData.identity,
  }

  return pieceView
}

/**
 * 创建 pieceView 和 piece 数据
 * @param dataArray
 * @returns
 */
export function createPieceViewAndPieceData<T extends ArrayLike<unknown>>(
  dataArray: T,
): {
  pieceView: IPieceView
  pieceData: IPieceData<T>
} {
  const pieceData = createPieceData(dataArray)
  const pieceView = _createPieceView(pieceData)

  return {
    pieceView,
    pieceData,
  }
}

export function insertToAdress(
  relationAdress: IRelationAdress,
  pieceViewIdentity: IIdentity,
  container: IIdentity,
) {
  const moveMark: IInsertMark = {
    type: 'IInsertMark',
    identity: genIdentity(),
    relationAdress: relationAdress,
    pieceView: pieceViewIdentity,
    container,
  }

  return moveMark
}
