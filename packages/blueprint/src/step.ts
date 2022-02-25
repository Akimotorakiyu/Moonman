import { IIdentity } from './identity'
import { TPlanetOperation, TSpaceshipOperation } from './operation'

export interface IPlanetStep {
  type: 'planetStep'
  aimId: IIdentity
  operation: TPlanetOperation
}
export interface ISpaceshipStep {
  type: 'spaceshipStep'
  aimId: IIdentity
  operation: TSpaceshipOperation
}

export type TStep = IPlanetStep | ISpaceshipStep
