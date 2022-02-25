import {
  IPlanetStep,
  ISpaceshipStep,
  IIdentity,
  TPlanetOperation,
  TSpaceshipOperation,
} from '@moonman/blueprint'

export function createPlanetStep(
  aimId: IIdentity,
  operation: TPlanetOperation,
): IPlanetStep {
  return {
    type: 'planetStep',
    operation,
    aimId,
  }
}
export function createSpaceshipStep(
  aimId: IIdentity,
  operation: TSpaceshipOperation,
): ISpaceshipStep {
  return {
    type: 'spaceshipStep',
    operation,
    aimId,
  }
}
