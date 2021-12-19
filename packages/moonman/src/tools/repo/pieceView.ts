import { IPieceData } from './../../operation/pieceData'
import { IPieceView } from '../..'
import { IPieceRange, IIdentity } from '../../operation'
import { dataRepo } from './repo'

export class PieceView<T extends ArrayLike<any> = ArrayLike<any>>
  implements IPieceView
{
  static readonly dataRepo = dataRepo

  type: 'IPieceView' = 'IPieceView'
  constructor(
    public piece: IPieceRange,
    public data: IIdentity,
    public identity: IIdentity,
  ) {}

  get realData() {
    const array = Array.from(this.srcData)
    const piece = array.slice(this.piece.start, this.piece.end)
    return piece
  }

  get srcData() {
    const pieceData = PieceView.dataRepo.getPieceData(
      this.data,
    ) as IPieceData<T>
    return pieceData.data
  }
}
