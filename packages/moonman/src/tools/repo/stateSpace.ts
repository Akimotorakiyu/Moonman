import { IPieceData } from '../../operation'
import { BlockSpace } from './blockSpace'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class TextSpace extends BlockSpace {
  readonly type = 'text'

  constructor(public props: Record<string, unknown> = {}) {
    super()
  }

  get copy() {
    const copy = new TextSpace(this.props)
    this.copySpaceData(copy)
    return copy
  }
}
export class TitleSpace extends BlockSpace implements ITitleModel {
  readonly type = 'ITitle'

  constructor(public props: Record<string, unknown> = {}) {
    super()
  }

  get copy() {
    const copy = new TitleSpace(this.props)
    this.copySpaceData(copy)
    return copy
  }
}
export class ParagraphSpace extends BlockSpace implements IParagraphModel {
  readonly type = 'IParagraph'
  constructor(public props: Record<string, unknown> = {}) {
    super()
  }

  get copy() {
    const copy = new ParagraphSpace(this.props)
    this.copySpaceData(copy)
    return copy
  }
}
export class DocumentSpace extends BlockSpace implements IDocumentModel {
  readonly type = 'IDocument'

  constructor(public props: Record<string, unknown> = {}) {
    super()
  }

  get copy() {
    const copy = new DocumentSpace(this.props)
    this.copySpaceData(copy)
    return copy
  }
}

export function createDocument() {
  const stateSpace = new DocumentSpace()
  return stateSpace
}
