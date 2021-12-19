import { IIdentity, TOperation } from '../../operation'
import { BlockSpace } from './blockSpace'
import { genIdentity } from './bussiness/define'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class TextSpace extends BlockSpace<string> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data = '',
    operationList: TOperation[] = [],
  ) {
    super(defaultProps, identity, data, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new TextSpace(
      this.defaultProps,
      this.identity,
      this.data,
      operationList,
    )
  }
}
export class TitleSpace extends BlockSpace<ITitleModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data: ITitleModel[] = [],
    operationList: TOperation[] = [],
  ) {
    super(defaultProps, identity, data, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new TitleSpace(
      this.defaultProps,
      this.identity,
      this.data,
      operationList,
    )
  }
}
export class ParagraphSpace extends BlockSpace<IParagraphModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data: IParagraphModel[] = [],
    operationList: TOperation[] = [],
  ) {
    super(defaultProps, identity, data, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new ParagraphSpace(
      this.defaultProps,
      this.identity,
      this.data,
      operationList,
    )
  }
}
export class DocumentSpace extends BlockSpace<IDocumentModel[]> {
  constructor(
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    data: IDocumentModel[] = [],
    operationList: TOperation[] = [],
  ) {
    super(defaultProps, identity, data, operationList)
  }

  /**
   * super 中 copy 会调用此方法
   * 会导致新的
   */
  createCopy(operationList: TOperation[]) {
    return new DocumentSpace(
      this.defaultProps,
      this.identity,
      this.data,
      operationList,
    )
  }

  addPropsMark(props: Record<string, unknown>): DocumentSpace {
    return super.addPropsMark(props) as DocumentSpace
  }
}

export function createDocument() {
  const stateSpace = new DocumentSpace()
  return stateSpace
}
