import { IIdentity } from './identity'
import { TSourceOperation, TSpaceshipOperation } from './operation'

export interface IPlanetStep {
  type: 'planetStep'
  aimId: IIdentity
  operation: TSourceOperation
}
export interface ISpaceshipStep {
  type: 'spaceshipStep'
  aimId: IIdentity
  operation: TSpaceshipOperation
}

export type TStep = IPlanetStep | ISpaceshipStep
