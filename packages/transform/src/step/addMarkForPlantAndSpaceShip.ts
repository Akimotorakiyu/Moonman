import { ISpaceship, IPlanet, ITransaction } from '@moonman/blueprint'
import { createAddMark } from '../operation'
import { createPlanetStep, createSpaceshipStep } from './createStep'

export function addMarkForSpaceship<T>(
  tr: ITransaction,
  planetOrSpaceship: IPlanet | ISpaceship,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr.identity, name, value)
  const step = createSpaceshipStep(
    planetOrSpaceship.blueprint.identity,
    addMarkOp,
  )
  tr.steps.push(step)
}

export function addMarkForPlant<T>(
  tr: ITransaction,
  planetOrSpaceship: IPlanet | ISpaceship,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr.identity, name, value)
  const step = createPlanetStep(planetOrSpaceship.blueprint.identity, addMarkOp)
  tr.steps.push(step)
}
