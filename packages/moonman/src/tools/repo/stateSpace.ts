import { IPieceRange, IIdentity, IPieceData } from '../../operation'
import { BlockSpace } from './blockSpace'
import { genIdentity } from './bussiness/define'
import {
  IDocumentModel,
  IParagraphModel,
  ITextModel,
  ITitleModel,
} from './model'

export class TextSpace extends BlockSpace implements ITextModel {
  readonly type = 'IText'

  constructor(
    defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
    public readonly text: string = '',
  ) {
    super(defaultProps)
  }

  get copy() {
    const copy = new TextSpace(this.defaultProps, this.identity, this.text)
    this.copySpaceData(copy)
    return copy
  }
}
export class TitleSpace extends BlockSpace implements ITitleModel {
  readonly type = 'ITitle'
  constructor(
    defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(defaultProps)
  }
  get copy() {
    const copy = new TitleSpace(this.defaultProps, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class ParagraphSpace extends BlockSpace implements IParagraphModel {
  readonly type = 'IParagraph'
  constructor(
    defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(defaultProps)
  }

  get copy() {
    const copy = new ParagraphSpace(this.defaultProps, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class DocumentSpace extends BlockSpace implements IDocumentModel {
  readonly type = 'IDocument'

  constructor(
    defaultProps: Record<string, unknown> = {},
    public identity: IIdentity = genIdentity(),
  ) {
    super(defaultProps)
  }

  /**
   * super 中 copy 会调用此方法
   * 会导致新的
   */
  get copy() {
    const copy = new DocumentSpace(this.defaultProps, this.identity)
    this.copySpaceData(copy)
    return copy
  }

  addPropsMark(props: Record<string, unknown>): DocumentSpace {
    return super.addPropsMark(props) as DocumentSpace
  }
}

export function createDocument() {
  const stateSpace = new DocumentSpace()
  return stateSpace
}
