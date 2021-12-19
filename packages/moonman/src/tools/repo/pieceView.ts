import { TData } from './../../operation/pieceData'
import { IPieceView } from '../..'
import { IPieceRange, IIdentity } from '../../operation'
import { PieceData } from './blockSpace'
import { DataRepo } from './repo'

export class PieceView<T extends TData> implements IPieceView {
  type: 'IPieceView' = 'IPieceView'
  constructor(
    public piece: IPieceRange,
    public data: IIdentity,
    public identity: IIdentity,
    public dataRepo: DataRepo,
  ) {}

  get realData() {
    const piece = this.srcData.getPiece(this.piece)
    return piece
  }

  get srcData() {
    const pieceData = this.dataRepo.getPieceData(this.data) as PieceData<T>
    return pieceData
  }
}
