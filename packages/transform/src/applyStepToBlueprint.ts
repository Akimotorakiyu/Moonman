import {
  IPlanetStep,
  ISpaceshipStep,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'

export function appendPlanetBlueprintOperation(
  planetBlueprint: IPlanetBlueprint,
  step: IPlanetStep,
) {
  const { operation: operationTransform } = step
  planetBlueprint.operations.push(operationTransform)
}

export function appendSpaceshipBlueprintOperation(
  spaceshipBlueprint: ISpaceshipBlueprint,
  step: ISpaceshipStep,
) {
  const { operation: operationTransform } = step
  spaceshipBlueprint.operations.push(operationTransform)
}
