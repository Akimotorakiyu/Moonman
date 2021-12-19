import {
  IIdentity,
  IPieceData,
  isTheSameIdentity,
  TData,
} from '../../operation'

export class DataRepo {
  readonly pieceData: IPieceData<TData>[] = []

  getPieceData<T extends TData = string>(identity: IIdentity): IPieceData<T> {
    const pieceData = this.pieceData.find((pieceData) => {
      return isTheSameIdentity(identity, pieceData.identity)
    })

    if (!pieceData) {
      throw new Error('Not found pieceData, check your identity')
    }

    return pieceData as IPieceData<T>
  }
}

export const dataRepo = new DataRepo()
