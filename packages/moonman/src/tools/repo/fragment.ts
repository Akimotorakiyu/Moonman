import {
  IInsertMark,
  IMoveMark,
  IPieceMark,
  IPieceView,
  IPropsMark,
  IRangeMark,
  TOperation,
} from '../..'
import { PieceView } from './pieceView'
export class MoonmanFragment {
  listing: PieceView<any>[] = []
  constructor(public readonly operationList: TOperation[] = []) {}

  dealMoveMark(move: IMoveMark) {}

  dealPieceView(piece: IPieceView) {}

  dealInsertMark(piece: IInsertMark) {}

  dealPieceMark(mark: IPieceMark) {}

  dealRangeMark(mark: IRangeMark) {}

  dealPropsMark(mark: IPropsMark) {}

  deal() {
    this.operationList.forEach((operation) => {
      switch (operation.type) {
        case 'IInsertMark':
          this.dealInsertMark(operation)
          break
        case 'IMoveMark':
          this.dealMoveMark(operation)
          break
        case 'IPieceMark':
          this.dealPieceMark(operation)
          break
        case 'IPropsMark':
          this.dealPropsMark(operation)
          break
        case 'IPieceView':
          this.dealPieceView(operation)
          break
        case 'IRangeMark':
          this.dealRangeMark(operation)
          break

        default:
          break
      }
    })
  }
}
