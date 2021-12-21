import {
  IIdentity,
  IPieceData,
  isTheSameIdentity,
  TData,
} from '../../operation'
import { PieceData } from './pieceData'
export class DataRepo {
  constructor(
    public rawPieceDataList: IPieceData<TData>[] = [],
    public pieceDataList: PieceData<TData>[] = [],
  ) {}

  getPieceData<T extends TData = string>(identity: IIdentity): PieceData<T> {
    const pieceData = this.pieceDataList.find((pieceData) => {
      return isTheSameIdentity(identity, pieceData.identity)
    })

    if (!pieceData) {
      throw new Error('Not found pieceData, check your identity')
    }

    return pieceData as PieceData<T>
  }

  addPieceData<T extends TData>(rawPieceData: IPieceData<T>) {
    const pieceData = new PieceData<T>(
      rawPieceData.data,
      {},
      rawPieceData.identity,
    )
    return new DataRepo(
      [...this.rawPieceDataList, rawPieceData],
      [...this.pieceDataList, pieceData],
    )
  }
}
