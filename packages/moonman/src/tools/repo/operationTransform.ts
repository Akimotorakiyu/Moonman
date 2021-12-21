import {
  IIdentity,
  IInsertMark,
  IPieceView,
  IPropsMark,
  TOperation,
} from '../../operation'
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

  get insertMark() {
    return this.operationList.reduce((acc, op) => {
      if (op.type === 'IInsertMark') {
        acc.push(op)
      }
      return acc
    }, [] as IInsertMark[])
  }

  get rankedViewList() {
    const pieceViewList = this.pieceViewList

    const rankedView: PieceView<any>[] = []
    this.insertMark.forEach((insert, index) => {
      const view = pieceViewList.find((v) => {
        return v.identity === insert.pieceView
      })!

      // 插入父元素
      if (insert.relationAdress.relation.isInner) {
        if (insert.relationAdress.relation.isForward) {
          rankedView.unshift(view!)
        } else {
          rankedView.push(view!)
        }
      } else {
        // 连接
        const preViewIndex = rankedView.findIndex((v) => {
          return v.identity === insert.relationAdress.adress.coordinate[0]
        })

        const preView = rankedView[preViewIndex]

        const [before, after] = preView.splitByRelationAdress(
          insert.relationAdress,
        )

        const newSlice = [before, view, after]

        newSlice.filter((item) => {
          return Boolean(item.length)
        })

        rankedView.splice(preViewIndex, 1, ...newSlice)
      }
    })
    return rankedView
  }

  addOperation(opList: TOperation[], dataRepo: DataRepo = this.dataRepo) {
    return new OperationTransform(this.operationList.concat(opList), dataRepo)
  }
}
