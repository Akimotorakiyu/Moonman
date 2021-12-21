import { IIdentity, TOperation } from '../../operation'
import { PieceData } from './pieceData'
import { genIdentity } from './helper/genIdentity'
import { IDocumentModel, IParagraphModel, ITitleModel } from './model'
import { DataRepo } from './dataRepo'

export class PieceTextData extends PieceData<string> {
  constructor(
    data = '',
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
    dataRepo = new DataRepo(),
  ) {
    super(data, defaultProps, identity, operationList, dataRepo)
  }

  createCopy(operationList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new PieceTextData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
      dataRepo,
    )
  }
}
export class PieceTitleData extends PieceData<ITitleModel> {
  constructor(
    data: ITitleModel = { type: 'ITitle' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
    dataRepo = new DataRepo(),
  ) {
    super(data, defaultProps, identity, operationList, dataRepo)
  }

  createCopy(operationList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new PieceTitleData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
      dataRepo,
    )
  }
}
export class PieceParagraphData extends PieceData<IParagraphModel> {
  constructor(
    data: IParagraphModel = { type: 'IParagraph' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
    dataRepo = new DataRepo(),
  ) {
    super(data, defaultProps, identity, operationList, dataRepo)
  }

  createCopy(operationList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new PieceParagraphData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
      dataRepo,
    )
  }
}
export class PieceDocumentData extends PieceData<IDocumentModel> {
  constructor(
    data: IDocumentModel = { type: 'IDocument' },
    defaultProps: Record<string, unknown> = {},
    identity: IIdentity = genIdentity(),
    operationList: TOperation[] = [],
    dataRepo = new DataRepo(),
  ) {
    super(data, defaultProps, identity, operationList, dataRepo)
  }

  /**
   * super 中 copy 会调用此方法
   * 会导致新的
   */
  createCopy(operationList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new PieceDocumentData(
      this.data,
      this.defaultProps,
      this.identity,
      operationList,
      dataRepo,
    )
  }

  addPropsMark(props: Record<string, unknown>): PieceDocumentData {
    return super.addPropsMark(props) as PieceDocumentData
  }
}
