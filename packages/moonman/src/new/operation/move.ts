import { IIdentity } from './identity'
import { IPieceView } from './pieceAndArea'
/**
 * 1D
 */
export interface IPieceMove {
  identity: IIdentity
  srcPiece: IPieceView
  aimPiece: IPieceView
}

/**
 * 2D
 */
export interface IRowLineMove {
  identity: IIdentity
  srcLine: IIdentity
  aimLie: IIdentity
}
export interface IColumnLineMove {
  identity: IIdentity
  srcLine: IIdentity
  aimLie: IIdentity
}
