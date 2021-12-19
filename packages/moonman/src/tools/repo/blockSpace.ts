import {
  IIdentity,
  IInsertMark,
  IPieceAdress,
  IPieceData,
  IPieceMark,
  IPropsMark,
  IRangeMark,
  IRelationAdress,
  TCoordinate,
  TOperation,
} from '../../operation'
import { IPieceView } from '../../operation/pieceView'
import { genIdentity } from './bussiness/define'
import { dataRepo } from './repo'
import { PieceView } from './pieceView'
import { OperationTransform } from './operationTransform'
export class BlockSpace<T extends ArrayLike<any> = ArrayLike<any>>
  implements IPieceData<T>
{
  static readonly dataRepo = dataRepo
  public readonly type = 'IPieceData'
  readonly operationTransform: OperationTransform

  constructor(
    public defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
    public data: T,
    public operationList: TOperation[] = [],
  ) {
    this.operationTransform = new OperationTransform(operationList)
  }

  /**
   * 需要在子类中被子类覆写
   * @param operationList
   * @returns
   */
  createCopy(operationList: TOperation[]) {
    return new BlockSpace(
      this.defaultProps,
      this.identity,
      this.data,
      operationList,
    )
  }

  get childrenView() {
    return this.operationTransform.pieceViewList.map((pv) => {
      return pv.realData
    })
  }

  appendChild<T extends ArrayLike<any> = ArrayLike<any>>(
    spaceData: BlockSpace<T>,
    relationAdress: IRelationAdress,
  ) {
    const opList: TOperation[] = [...this.operationList]

    BlockSpace.dataRepo.pieceData.push(spaceData)

    const childPieceView: IPieceView = {
      identity: genIdentity(),
      data: spaceData.identity,
      type: 'IPieceView',
      piece: {
        start: 0,
        end: spaceData.data.length,
      },
    }

    opList.push(childPieceView)

    const insertMark: IInsertMark = {
      type: 'IInsertMark',
      identity: genIdentity(),
      relationAdress: relationAdress,
      pieceView: childPieceView.identity,
      container: this.identity,
    }

    opList.push(insertMark)

    const copy = this.createCopy(opList)

    return copy
  }

  // 添加 range mark 给 children
  addRangeMarkForChildren(
    from: IRelationAdress,
    to: IRelationAdress,
    data: Record<string, unknown>,
  ) {
    const opList: TOperation[] = [...this.operationList]
    const rangeMark: IRangeMark = {
      identity: genIdentity(),
      type: 'IRangeMark',
      from,
      to,
      data,
      container: this.identity,
    }

    opList.push(rangeMark)

    const copy = this.createCopy(opList)

    return copy
  }

  // 添加 piece mark 给 children
  addPieceMarkForChildren(piece: IPieceAdress, data: Record<string, unknown>) {
    const opList: TOperation[] = [...this.operationList]

    const pieceMark: IPieceMark = {
      identity: genIdentity(),
      type: 'IPieceMark',
      piece,
      data,
      container: this.identity,
    }

    opList.push(pieceMark)
    const copy = this.createCopy(opList)

    return copy
  }
  // 添加 PropsMark
  addPropsMark(props: Record<string, unknown>) {
    const opList: TOperation[] = [...this.operationList]

    const propsMark: IPropsMark = {
      type: 'IPropsMark',
      identity: genIdentity(),
      data: props,
    }

    opList.push(propsMark)
    const copy = this.createCopy(opList)

    return copy
  }

  get coordinate(): TCoordinate {
    return [this.identity]
  }

  // 计算当前节点的 props
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
}
