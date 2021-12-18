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
import { IPieceView, TPieceViewIdentity } from '../../operation/pieceView'
import { genIdentity } from './bussiness/define'

export class BlockSpace<T extends ArrayLike<any> = ArrayLike<any>>
  implements IPieceData<T>
{
  public readonly type = 'IPieceData'
  constructor(
    public defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
    public data: T,
  ) {}

  readonly operationList: TOperation<ArrayLike<unknown> | string>[] = []

  // store the op for the child
  get viewSpace(): IPieceView[] {
    return this.operationList.reduce((acc, op) => {
      if (op.type === 'IPieceView') {
        acc.push(op)
      }
      return acc
    }, [] as IPieceView[])
  }

  get propsMark(): IPropsMark[] {
    return this.operationList.reduce((acc, op) => {
      if (op.type === 'IPropsMark') {
        acc.push(op)
      }
      return acc
    }, [] as IPropsMark[])
  }

  get copy() {
    const copy = new BlockSpace(this.defaultProps, this.identity, this.data)
    this.copySpaceData(copy)

    return copy
  }

  protected copySpaceData(copy: BlockSpace) {
    copy.operationList.push(...this.operationList)
  }

  appendChild<T extends ArrayLike<any> = ArrayLike<any>>(
    spaceData: BlockSpace<T>,
    relationAdress: IRelationAdress,
  ) {
    const copy = this.copy

    copy.operationList.push(spaceData)

    const childPieceView: IPieceView = {
      identity: genIdentity(),
      data: spaceData.identity,
      type: 'IPieceView',
      piece: {
        start: 0,
        end: spaceData.data.length,
      },
    }
    const insertMark: IInsertMark = {
      type: 'IInsertMark',
      identity: genIdentity(),
      relationAdress: relationAdress,
      pieceView: childPieceView.identity,
      container: this.identity,
    }

    copy.operationList.push(insertMark)

    return copy
  }

  // 添加 range mark 给 children
  addRangeMarkForChildren(
    from: IRelationAdress,
    to: IRelationAdress,
    data: Record<string, unknown>,
  ) {
    const rangeMark: IRangeMark = {
      identity: genIdentity(),
      type: 'IRangeMark',
      from,
      to,
      data,
      container: this.identity,
    }

    const copy = this.copy

    copy.operationList.push(rangeMark)

    return copy
  }

  // 添加 piece mark 给 children
  addPieceMarkForChildren(piece: IPieceAdress, data: Record<string, unknown>) {
    const pieceMark: IPieceMark = {
      identity: genIdentity(),
      type: 'IPieceMark',
      piece,
      data,
      container: this.identity,
    }

    const copy = this.copy
    copy.operationList.push(pieceMark)

    return copy
  }
  // 添加 PropsMark
  addPropsMark(props: Record<string, unknown>) {
    const propsMark: IPropsMark = {
      type: 'IPropsMark',
      identity: genIdentity(),
      data: props,
    }

    const copy = this.copy

    copy.operationList.push(propsMark)

    return copy
  }

  get coordinate(): TCoordinate {
    return [this.identity]
  }

  // 计算当前节点的 props
  get getComputedProps() {
    const computedProps = this.propsMark.reduce(
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
