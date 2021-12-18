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
  TMark,
} from '../../operation'
import { IPieceView, TPieceViewIdentity } from '../../operation/pieceView'
import { genIdentity } from './bussiness/define'

export class BlockSpace<T extends ArrayLike<any> = ArrayLike<any>>
  implements IPieceData<T>
{
  constructor(
    public defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
    public data: T,
  ) {}

  // store the op for the child
  readonly dataSpace: IPieceData<T>[] = []
  readonly markSpace: TMark[] = []
  readonly viewSpace: IPieceView[] = []
  readonly propsMark: IPropsMark[] = []

  get copy() {
    const copy = new BlockSpace(this.defaultProps, this.identity, this.data)
    this.copySpaceData(copy)

    return copy
  }

  copySpaceData(copy: BlockSpace) {
    copy.dataSpace.push(...this.dataSpace)
    copy.markSpace.push(...this.markSpace)
    copy.viewSpace.push(...this.viewSpace)
    copy.propsMark.push(...this.propsMark)
  }

  addChild(
    pieceViewIdentity: TPieceViewIdentity,
    relationAdress: IRelationAdress,
  ) {
    const insertMark: IInsertMark = {
      type: 'IInsertMark',
      identity: genIdentity(),
      relationAdress: relationAdress,
      pieceView: pieceViewIdentity,
      container: this.identity,
    }

    const copy = this.copy
    copy.markSpace.push(insertMark)

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

    copy.markSpace.push(rangeMark)

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

    copy.markSpace.push(pieceMark)

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

    copy.propsMark.push(propsMark)

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
