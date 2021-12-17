import { IPieceData, TMark } from '../../operation'
import { IPieceView } from '../../operation/pieceView'
import { genDocument } from './bussiness'

export class StateSpace<T extends ArrayLike<any> = ArrayLike<any>> {
  dataSpace: IPieceData<T>[] = []
  markSpace: TMark[] = []
  viewSpace: IPieceView[] = []
}

export function createDocument() {
  const stateSpace = new StateSpace()
  genDocument({}, stateSpace)
  return stateSpace
}
