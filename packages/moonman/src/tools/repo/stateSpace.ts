import { IPieceView } from '../..'
import { IPieceRange, IIdentity, IPieceData } from '../../operation'
import { BlockSpace } from './blockSpace'
import { genIdentity } from './bussiness/define'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class TextSpace extends BlockSpace implements IPieceView {
  readonly type = 'text'

  constructor(
    props: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
    public data: IIdentity,
    public dataPiece: IPieceData,
    public piece: IPieceRange = { start: 0, end: dataPiece.data.length },
  ) {
    super(props)
  }

  get copy() {
    const copy = new TextSpace(
      this.props,
      this.identity,
      this.data,
      this.dataPiece,
      {
        ...this.piece,
      },
    )
    this.copySpaceData(copy)
    return copy
  }
}
export class TitleSpace extends BlockSpace implements ITitleModel {
  readonly type = 'ITitle'
  constructor(
    props: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(props)
  }
  get copy() {
    const copy = new TitleSpace(this.props, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class ParagraphSpace extends BlockSpace implements IParagraphModel {
  readonly type = 'IParagraph'
  constructor(
    props: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(props)
  }

  get copy() {
    const copy = new ParagraphSpace(this.props, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class DocumentSpace extends BlockSpace implements IDocumentModel {
  readonly type = 'IDocument'

  constructor(
    props: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(props)
  }

  get copy() {
    const copy = new DocumentSpace(this.props, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}

export function createDocument() {
  const stateSpace = new DocumentSpace()
  return stateSpace
}
