import { TData } from './../../operation/pieceData'
import { IPieceView } from '../..'
import {
  IPieceRange,
  IIdentity,
  IAdress,
  IRelationAdress,
  TOperation,
} from '../../operation'
import { PieceData } from './pieceData'
import { DataRepo } from './dataRepo'
import { isTheSameIdentity } from '../../old/operation'
import { OperationTransform } from './operationTransform'

export class PieceView<T extends TData> implements IPieceView {
  type: 'IPieceView' = 'IPieceView'
  readonly operationTransform: OperationTransform

  constructor(
    public piece: IPieceRange,
    public data: IIdentity,
    public identity: IIdentity,
    public dataRepo: DataRepo,
    public defaultProps: Record<string, unknown> = {},
    public operationList: TOperation[] = [],
  ) {
    this.operationTransform = new OperationTransform(operationList, dataRepo)
  }

  get realData() {
    const piece = this.srcData.getPiece(this.piece)
    return piece
  }

  get srcData() {
    const pieceData = this.dataRepo.getPieceData(this.data) as PieceData<T>
    return pieceData
  }

  /**
   * 判断一个地址是否在当前 piece 中
   * @param adress
   * @returns
   */
  isInRange(adress: IAdress) {
    if (adress.coordinate.length === 1) {
      const id = adress.coordinate[0]

      return (
        isTheSameIdentity(id, this.identity) &&
        adress.index >= this.piece.start &&
        adress.index < this.piece.end
      )
    } else {
      console.warn('尚未处理 表格实现')
    }
  }

  mappingIndexToRelativeIndex(adress: IRelationAdress) {
    if (!adress.relation.isInner) {
      if (adress.relation.isForward) {
        return adress.adress.index + 1
      } else {
        return adress.adress.index
      }
    } else {
      throw new Error('置入内部元素不应在此处 mapping')
    }
  }

  splitByRelationAdress(relationAdress: IRelationAdress) {
    const index = this.mappingIndexToRelativeIndex(relationAdress)
    return this.splitByIndex(index)
  }

  splitByTwoRelationAdress(
    relationAdressA: IRelationAdress,
    relationAdressB: IRelationAdress,
  ) {
    const [before, __] = this.splitByRelationAdress(relationAdressA)
    const [middle, after] = __.splitByRelationAdress(relationAdressB)
    return [before, middle, after] as const
  }

  splitByIndex(index: number) {
    const before = new PieceView<T>(
      {
        ...this.piece,
        end: index,
      },
      this.data,
      this.identity,
      this.dataRepo,
    )

    const after = new PieceView<T>(
      {
        ...this.piece,
        start: index,
      },
      this.data,
      this.identity,
      this.dataRepo,
    )

    return [before, after] as const
  }

  get length() {
    return this.piece.end - this.piece.start
  }

  get getComputedProps() {
    const computedProps = this.operationTransform.propsMark.reduce(
      (acc, mark) => {
        mark.data

        return {
          ...acc,
          ...mark.data,
        }
      },
      {
        ...this.defaultProps,
      } as Record<string, unknown>,
    )

    return computedProps
  }

  get getMergedProps() {
    return {}
  }
}
