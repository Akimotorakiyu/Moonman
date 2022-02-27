import {
  IPlanetStep,
  ISpaceshipStep,
  TPlanetOperation,
  TSpaceshipOperation,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'

export function createPlanetStep(
  aimPlanetBlueprint: IPlanetBlueprint,
  operation: TPlanetOperation,
): IPlanetStep {
  return {
    type: 'planetStep',
    operation,
    aimId: aimPlanetBlueprint.identity,
  }
}
export function createSpaceshipStep(
  aimSpaceshipBlueprint: ISpaceshipBlueprint,
  operation: TSpaceshipOperation,
): ISpaceshipStep {
  return {
    type: 'spaceshipStep',
    operation,
    aimId: aimSpaceshipBlueprint.identity,
  }
}
