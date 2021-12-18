import { IPieceView } from './pieceView'
import { IPieceData } from './pieceData'
import { TMark } from './mark'

export type TOperation<T extends ArrayLike<unknown> = string> =
  | IPieceView
  | IPieceData<T>
  | TMark
