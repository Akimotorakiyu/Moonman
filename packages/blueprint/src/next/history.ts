import { IIdentity } from './identity'
import { IVerify } from './verify'

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

  verify?: IVerify
}
