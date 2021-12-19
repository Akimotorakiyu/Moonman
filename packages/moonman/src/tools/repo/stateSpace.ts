import { IIdentity, TOperation } from '../../operation'
import { PieceData } from './blockSpace'
import { genIdentity } from './bussiness/define'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'

export class PieceTextData extends PieceData<string> {
  constructor(
    data = '',
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
  ) {
    super(data, defaultProps, identity, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new PieceTextData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
    )
  }
}
export class PieceTitleData extends PieceData<ITitleModel> {
  constructor(
    data: ITitleModel = { type: 'ITitle' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
  ) {
    super(data, defaultProps, identity, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new PieceTitleData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
    )
  }
}
export class PieceParagraphData extends PieceData<IParagraphModel> {
  constructor(
    data: IParagraphModel = { type: 'IParagraph' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
  ) {
    super(data, defaultProps, identity, operationList)
  }

  createCopy(operationList: TOperation[]) {
    return new PieceParagraphData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
    )
  }
}
export class PieceDocumentData extends PieceData<IDocumentModel> {
  constructor(
    data: IDocumentModel = { type: 'IDocument' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
  ) {
    super(data, defaultProps, identity, operationList)
  }

  /**
   * super 中 copy 会调用此方法
   * 会导致新的
   */
  createCopy(operationList: TOperation[]) {
    return new PieceDocumentData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
    )
  }

  addPropsMark(props: Record<string, unknown>): PieceDocumentData {
    return super.addPropsMark(props) as PieceDocumentData
  }
}
