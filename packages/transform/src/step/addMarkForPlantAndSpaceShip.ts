import {
  ISpaceshipBlueprint,
  IPlanetBlueprint,
  ITransaction,
} from '@moonman/blueprint'
import { createAddMark } from '../operation'
import { createPlanetStep, createSpaceshipStep } from './createStep'

export function addMarkForSpaceship<T>(
  tr: ITransaction,
  planetOrSpaceship: ISpaceshipBlueprint,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr, name, value)
  const step = createSpaceshipStep(planetOrSpaceship, addMarkOp)
  tr.steps.push(step)
}

export function addMarkForPlant<T>(
  tr: ITransaction,
  planetOrSpaceship: IPlanetBlueprint,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr, name, value)
  const step = createPlanetStep(planetOrSpaceship, addMarkOp)
  tr.steps.push(step)
}
