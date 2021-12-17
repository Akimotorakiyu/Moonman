import {
  IIdentity,
  IInsertMark,
  IPieceAdress,
  IPieceData,
  IPieceMark,
  IPropsMark,
  IRangeMark,
  IRelationAdress,
  isTheSameCoordinate,
  isTheSameIdentity,
  TCoordinate,
  TMark,
} from '../../operation'
import { IPieceView, TPieceViewIdentity } from '../../operation/pieceView'
import { createPieceData, genIdentity } from './bussiness/define'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class BlockSpace<T extends ArrayLike<any> = ArrayLike<any>> {
  readonly identity: IIdentity = genIdentity()

  // store the op for the child
  readonly dataSpace: IPieceData<T>[] = []
  readonly markSpace: TMark[] = []
  readonly viewSpace: IPieceView[] = []
  readonly propsMark: IPropsMark[] = []

  get copySelf() {
    const copy = new BlockSpace()

    copy.dataSpace.push(...this.dataSpace)
    copy.markSpace.push(...this.markSpace)
    copy.viewSpace.push(...this.viewSpace)
    copy.propsMark.push(...this.propsMark)
    return copy
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

    const copy = this.copySelf
    copy.markSpace.push(insertMark)

    return copy
  }

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

    const copy = this.copySelf

    copy.markSpace.push(rangeMark)

    return copy
  }

  addPieceMarkForChildren(piece: IPieceAdress, data: Record<string, unknown>) {
    const pieceMark: IPieceMark = {
      identity: genIdentity(),
      type: 'IPieceMark',
      piece,
      data,
      container: this.identity,
    }

    const copy = this.copySelf

    copy.markSpace.push(pieceMark)

    return copy
  }

  addPropsMark(props: Record<string, unknown>) {
    const propsMark: IPropsMark = {
      type: 'IPropsMark',
      identity: genIdentity(),
      data: props,
    }

    const copy = this.copySelf

    copy.propsMark.push(propsMark)

    return copy
  }

  get coordinate(): TCoordinate {
    return [this.identity]
  }

  // todo: should check
  // checkRelationAdress(relationAdress: IRelationAdress) {
  //   return relationAdress.anchor.coordinate.some((id) => {
  //     return this.viewSpace.some((view) => {
  //       return isTheSameIdentity(id, view.identity)
  //     })
  //   })
  // }
}

export class TextSpace extends BlockSpace {
  readonly type = 'text'
  data: IPieceData<string>
  constructor(text: string) {
    super()
    this.data = createPieceData(text)
  }
}
export class TitleSpace extends BlockSpace implements ITitleModel {
  readonly type = 'ITitle'

  constructor(public props: Record<string, unknown> = {}) {
    super()
  }
}
export class ParagraphSpace extends BlockSpace implements IParagraphModel {
  readonly type = 'IParagraph'
  constructor(public props: Record<string, unknown> = {}) {
    super()
  }
}
export class DocumentSpace extends BlockSpace implements IDocumentModel {
  readonly type = 'IDocument'

  constructor(public props: Record<string, unknown> = {}) {
    super()
  }

  insert(pieceView: IPieceView) {}
}

export function createDocument() {
  const stateSpace = new DocumentSpace()
  return stateSpace
}
