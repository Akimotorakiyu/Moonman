import { IIdentity } from './identity'

export type TVerifyStatus = 'Valid' | 'invalid'

export interface IVerify {
  identity: IIdentity

  status: TVerifyStatus
}
