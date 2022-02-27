import {
  ITransaction,
  TDirection,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'
import { createAddChildSpaceshipBlueprint } from '../operation'
import { createPlanetStep } from './createStep'

export function addChildSpaceshipBlueprintStep(
  tr: ITransaction,
  mainPlanetBlueprint: IPlanetBlueprint,
  childSpaceship: ISpaceshipBlueprint,
  direction: TDirection,
) {
  const op = createAddChildSpaceshipBlueprint(tr, childSpaceship, direction)
  const step = createPlanetStep(mainPlanetBlueprint, op)
  tr.steps.push(step)
}
