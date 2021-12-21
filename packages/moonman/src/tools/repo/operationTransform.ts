import { IPieceView, IPropsMark, TOperation } from '../../operation'
import { PieceView } from './pieceView'
import { DataRepo } from './dataRepo'

export class OperationTransform {
  constructor(
    public readonly operationList: TOperation[] = [],
    public dataRepo: DataRepo,
  ) {}

  /**
   * 从 operationList 中提取 PieceView
   */
  get rawPieceViewList(): IPieceView[] {
    return this.operationList.reduce((acc, op) => {
      if (op.type === 'IPieceView') {
        acc.push(op)
      }
      return acc
    }, [] as IPieceView[])
  }

  /**
   * 将 IPieceView 转换为 PieceView
   */
  get pieceViewList() {
    const view = this.rawPieceViewList.map((vs) => {
      const pieceView = new PieceView(
        vs.piece,
        vs.data,
        vs.identity,
        this.dataRepo,
      )
      return pieceView
    })
    return view
  }

  get propsMark(): IPropsMark[] {
    return this.operationList.reduce((acc, op) => {
      if (op.type === 'IPropsMark') {
        acc.push(op)
      }
      return acc
    }, [] as IPropsMark[])
  }

  addOperation(opList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new OperationTransform(this.operationList.concat(opList), dataRepo)
  }
}
