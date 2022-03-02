import { IIdentity } from './identity'

type THistoryType =
  //
  | 'create'
  //
  | 'undo'
  //
  | 'redo'
  //
  | 'remove'

export interface IHistory {
  identity: IIdentity
  type: THistoryType
}
