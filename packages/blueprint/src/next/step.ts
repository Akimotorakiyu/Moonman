import { IIdentity } from './identity'
import {
  TSourceOperation,
  TVisionOperation,
  TPlaceholderOperation,
  IOperation,
} from './operation'

export interface IStep<T extends IOperation> {
  aimId: IIdentity
  operation: T
}

export type TStep =
  | IStep<TSourceOperation>
  | IStep<TVisionOperation>
  | IStep<TPlaceholderOperation>
