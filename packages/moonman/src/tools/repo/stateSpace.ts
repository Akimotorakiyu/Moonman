import { IIdentity } from '../../operation'
import { BlockSpace } from './blockSpace'
import { genIdentity } from './bussiness/define'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class TextSpace extends BlockSpace<string> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data = '',
  ) {
    super(defaultProps, identity, data)
  }

  get copy() {
    const copy = new TextSpace(this.defaultProps, this.identity, this.data)
    this.copySpaceData(copy)
    return copy
  }
}
export class TitleSpace extends BlockSpace<ITitleModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data = [],
  ) {
    super(defaultProps, identity, data)
  }

  get copy() {
    const copy = new TitleSpace(this.defaultProps, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class ParagraphSpace extends BlockSpace<IParagraphModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data = [],
  ) {
    super(defaultProps, identity, data)
  }

  get copy() {
    const copy = new ParagraphSpace(this.defaultProps, this.identity)
    this.copySpaceData(copy)
    return copy
  }
}
export class DocumentSpace extends BlockSpace<IDocumentModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data = [],
  ) {
    super(defaultProps, identity, data)
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
