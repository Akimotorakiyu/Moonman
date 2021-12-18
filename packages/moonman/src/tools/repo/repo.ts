import { IIdentity, IPieceData, isTheSameIdentity } from '../../operation'

export class DataRepo {
  readonly pieceData: IPieceData<ArrayLike<unknown> | string>[] = []

  getPieceData<T extends ArrayLike<unknown> = string>(
    identity: IIdentity,
  ): IPieceData<T> {
    const pieceData = this.pieceData.find((pieceData) => {
      isTheSameIdentity(identity, pieceData.identity)
    })

    if (!pieceData) {
      throw new Error('Not found pieceData, check your identity')
    }

    return pieceData as IPieceData<T>
  }
}

export const dataRepo = new DataRepo()
