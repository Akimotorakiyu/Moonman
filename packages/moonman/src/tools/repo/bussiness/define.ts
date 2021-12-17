import type {
  IIdentity,
  IPieceData,
  IRelationAdress,
  IInsertMark,
  TPieceDataIdentity,
} from '../../../operation/index'
import { IPieceView, TPieceViewIdentity } from '../../../operation/pieceView'
import { BlockSpace } from '../blockSpace'
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
  stateSpace: BlockSpace,
) {
  const pieceView: IPieceView = {
    identity: genIdentity(),
    piece: {
      start: 0,
      end: pieceData.data.length,
    },
    data: pieceData.identity,
  }

  stateSpace.viewSpace.push(pieceView)

  return pieceView
}

/**
 * 创建 pieceView 和 piece 数据
 * @param dataArray
 * @returns
 */
export function createPieceViewAndPieceData<T extends ArrayLike<unknown>>(
  dataArray: T,
  parentStateSpace: BlockSpace,
): {
  pieceView: IPieceView
  pieceData: IPieceData<T>
} {
  const pieceData = createPieceData(dataArray)
  const pieceView = _createPieceView(pieceData, parentStateSpace)

  return {
    pieceView,
    pieceData,
  }
}

export function insertToAdress(
  relationAdress: IRelationAdress,
  pieceViewIdentity: TPieceViewIdentity,
  container: TPieceDataIdentity,
  parentStateSpace: BlockSpace,
) {
  const insertMark: IInsertMark = {
    type: 'IInsertMark',
    identity: genIdentity(),
    relationAdress: relationAdress,
    pieceView: pieceViewIdentity,
    container,
  }

  parentStateSpace.markSpace.push(insertMark)

  return insertMark
}
